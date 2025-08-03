import { Menu, Flex } from 'antd'
import logo from '../../../assets/images/manager/logo.png'
import UseSidenav from '../../../feature/UseSidenav'
import { Typography } from 'antd'
import Tables from './icon/Tables'
import Billing from './icon/Billing'
import Rtl from './icon/Rtl'
import profile from './icon/Profile'
import Dashboard from './icon/Dashboard'
import { useEffect, useState } from 'react'

import type { MenuProps } from 'antd'
import { useSelector } from 'react-redux'

function Sidenav() {
  const { Text } = Typography

  const { bgIcon, darkColor, inActiveColor } = useSelector((state) => state.web)
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([])

  const useSidenav = UseSidenav({
    components: [
      {
        label: (
          <>
            <Flex align='center' gap={10} justify='center' className='children-menu'>
              {<Tables color={darkColor} />}
              <span className='label font-bold text-[#344767]'>Sản phẩm</span>
            </Flex>
          </>
        ),
        link: '/admin/products'
      },
      {
        label: (
          <>
            <Flex align='center' gap={10} justify='center' className='children-menu'>
              {<Tables color={darkColor} />}
              <span className='label font-bold text-[#344767]'>Danh mục</span>
            </Flex>
          </>
        ),
        link: '/admin/categories'
      },

      {
        label: (
          <>
            <Flex align='center' gap={10} justify='center' className='children-menu'>
              {<Tables color={darkColor} />}
              <span className='label font-bold text-[#344767]'>Người dùng</span>
            </Flex>
          </>
        ),
        link: '/admin/users'
      },
         {
        label: (
          <>
            <Flex align='center' gap={10} justify='center' className='children-menu'>
              {<Tables color={darkColor} />}
              <span className='label font-bold text-[#344767]'>Order</span>
            </Flex>
          </>
        ),
        link: '/admin/orders'
      },
      {
        label: (
          <>
            <div>
              <Flex justify='center' align='center'>
                <div className={`icon `}>{<Dashboard color={darkColor} />}</div>
                <span className={`label font-bold text-[#344767]`}>Dashboard</span>
              </Flex>
            </div>
          </>
        ),
        link: '/admin/dashboard'
      }
    ]
  })

  interface LevelKeysProps {
    key?: string
    children?: LevelKeysProps[]
  }

  const items = useSidenav.getMenu()

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {}
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level
        }
        if (item.children) {
          func(item.children, level + 1)
        }
      })
    }
    func(items1)
    return key
  }

  const levelKeys = getLevelKeys(items as LevelKeysProps[])

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1)
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      // close
      setStateOpenKeys(openKeys)
    }
  }

  useEffect(() => {
    const defaultActiveString = useSidenav.getKeyActive().map((num) => num.toString())
    setStateOpenKeys(defaultActiveString)
  }, [])

  return (
    <>
      <Flex gap={10} className='brand' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='' />
        <span className=' text-center'>Bảng điều khiển</span>
      </Flex>
      <hr />
      <Menu
        theme='light'
        mode='inline'
        triggerSubMenuAction='click'
        openKeys={stateOpenKeys}
        defaultSelectedKeys={stateOpenKeys}
        items={items}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export default Sidenav
