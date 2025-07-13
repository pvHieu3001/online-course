import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { AppstoreOutlined, HomeOutlined, MessageTwoTone } from '@ant-design/icons'
import clsx from 'clsx'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: <a href='/category'>Danh Mục Sản Phẩm</a>,
    key: 'hanoi',
    icon: <AppstoreOutlined />,
    children: [
      {
        label: <a href='https://ant.design'>Tất Cả Khóa Học</a>,
        key: 'setting:1'
      },
      {
        label: <a href='https://ant.design'>Combo Giá Rẻ</a>,
        key: 'setting:2'
      },
      {
        label: <a href='https://ant.design'>Khóa Học Lập Trình</a>,
        key: 'setting:3'
      },
      {
        label: <a href='https://ant.design'>Thiết Kế Đồ Họa</a>,
        key: 'setting:4'
      },
      {
        label: <a href='https://ant.design'>Ngoại Ngữ</a>,
        key: 'setting:5'
      },
      {
        label: <a href='https://ant.design'>Tin Học Văn Phòng</a>,
        key: 'setting:6'
      },
      {
        label: <a href='https://ant.design'>Kỹ Năng Mềm</a>,
        key: 'setting:7'
      },
      {
        label: <a href='https://ant.design'>TickTock - FaceBook - YouTube</a>,
        key: 'setting:8'
      },
      {
        label: <a href='https://ant.design'>Đầu Tư Kinh Doanh</a>,
        key: 'setting:9'
      },
      {
        label: <a href='https://ant.design'>Âm Nhạc</a>,
        key: 'setting:10'
      },
      {
        label: <a href='https://ant.design'>Kiếm Tiền</a>,
        key: 'setting:11'
      },
      {
        label: <a href='https://ant.design'>Khóa Học Khác</a>,
        key: 'setting:12'
      },
    ]
  },
  {
    label: <a href='/'>Trang Chủ</a>,
    key: 'home',
    icon: <HomeOutlined />,
    className: `${styles.menuItem}`
  },
  {
    label: 'Giới Thiệu',
    key: 'forum',
    icon: <MessageTwoTone />
  },
  
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='product-detail/slug'>Combo Tiết Kiệm</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Hướng Dẫn</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Tài Khoản</a>
  },
  {
    key: 'alipay',
    icon: <AppstoreOutlined />,
    label: <a href='https://ant.design'>Blog</a>
  }
]

const Header = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const [isLockMenu, setIsLockMenu] = useState(false)
  const handleScroll = () => {
    if (window.pageYOffset > 80) {
      setIsLockMenu(true)
    }else{
      setIsLockMenu(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={clsx(styles.modules, isLockMenu? styles.lockMenu : "")}>
      
    </div>
  )
}

export default Header
