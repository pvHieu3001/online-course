import { useState } from 'react'
import Logo from '../../shared/Logo/Logo'
import styles from './styles.module.css'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { AppstoreOutlined, HomeOutlined, MessageTwoTone } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: <a href='/'>Khóa Học Free</a>,
    key: 'home',
    icon: <HomeOutlined />,
    className: `${styles.menuItem}`
  },
  {
    label: 'Nâng Cấp Hội Viên',
    key: 'forum',
    icon: <MessageTwoTone />
  },
  {
    label: <a href='/category'>Combo</a>,
    key: 'hanoi',
    icon: <AppstoreOutlined />,
    children: [
      {
        type: 'group',
        label: 'Hoàn Kiếm',
        children: [
          {
            label: <a href='https://ant.design'>Combo Vip</a>,
            key: 'setting:1'
          },
          {
            label: <a href='https://ant.design'>Combo Premium</a>,
            key: 'setting:2'
          }
        ]
      },
    ]
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='product-detail/slug'>Khóa Học Dưới 100kg</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Khóa Học Dưới 150k</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Khóa Học Dưới 500k</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Hướng Dẫn</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Block</a>
  }
]

const Header = () => {
  const [current, setCurrent] = useState('home')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <div className={styles.modules}>
      <div className={styles.banner}>
        <Logo></Logo>
        <form className='py-2 text-slate-900 dark:text-slate-100 hidden md:block mx-2' action='/page-search'>
          <div className='bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 rounded-[999px]'>
            <button type='submit'>
              <svg width={22} height={22} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 22L20 20'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <input
              name='keyword'
              type='text'
              placeholder='Tìm kiếm'
              className='border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base'
              autoFocus
            />
          </div>
          <input type='submit' hidden value='' />
        </form>
      </div>
      <div className={styles.menuWrapper}>
        <Menu className={styles.menu} theme='light' onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
      </div>
    </div>
  )
}

export default Header
