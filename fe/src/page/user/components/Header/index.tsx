import { useEffect, useState } from 'react'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

const Header = () => {
  const dispatch = useDispatch()
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const location = useLocation()
  const currentPath = location.pathname
  const [menuOpen, setMenuOpen] = useState(false)
  const courses = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(courseActions.getCourses('active', '', true) as unknown as AnyAction)
  }, [dispatch])

  const menuItems = [
    { label: 'TRANG CHỦ', href: '/' },
    { label: 'MÃ GIẢM GIÁ 100% UDEMY', href: '/khoa-hoc-theo-chu-de/udemy' },
    { label: 'ĐIỀU KHOẢN SỬ DỤNG', href: '/term-of-use' },
    { label: 'CHÍNH SÁCH BẢO MẬT', href: '/privacy-policy' },
    { label: 'BẢN QUYỀN', href: '/copyright' }
  ]

  const getImageUrl = (url: string): string => {
    const domain = import.meta.env.VITE_DOMAIN_URL
    return url.startsWith('/') ? `${domain}${url}` : `${domain}/${url}`
  }

  return (
    <div className={styles.bg}>
      <div className={styles.topbar} role='banner'>
        <span className={styles.date} aria-label='Current date'>
          {dateStr}
        </span>
      </div>

      <div className={styles.bannerWrapper}>
        <header className={styles.banner} role='banner'>
          <svg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='120' height='120' rx='24' fill='#2563eb' />
            <path d='M30 80V40L60 25L90 40V80L60 95L30 80Z' fill='#fff' />
            <path d='M60 25V95' stroke='#2563eb' strokeWidth='4' />
            <text x='60' y='70' textAnchor='middle' fill='#2563eb' fontSize='32' fontFamily='Arial' fontWeight='bold'>
              EDU
            </text>
          </svg>
          <span className={styles.slogan}>HỌC MIỄN PHÍ – CHIA SẺ KIẾN THỨC – NÂNG TẦM BẢN THÂN</span>
        </header>
      </div>

      <div className={styles.menuWrapper}>
        {/* Nút mở menu cho màn hình nhỏ */}
        <button className={styles.menuToggle} aria-label='Mở menu' onClick={() => setMenuOpen(true)}>
          <MenuOutlined style={{ fontSize: 24 }} />
        </button>
        {/* Menu chính, ẩn trên mobile */}
        <nav className={styles.menu} role='navigation' aria-label='Main navigation'>
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={currentPath === item.href ? styles.active : ''}
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Sidebar menu cho mobile */}
        {menuOpen && (
          <div className={styles.sidebarMenu}>
            <button className={styles.closeSidebar} aria-label='Đóng menu' onClick={() => setMenuOpen(false)}>
              <CloseOutlined style={{ fontSize: 24 }} />
            </button>

            {/* 🔍 Search input */}
            <div className={styles.mobileSearch}>
              <input type='text' placeholder='Tìm kiếm khóa học...' className={styles.searchInput} />
              <button className={styles.searchButton}>🔍</button>
            </div>

            <nav>
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={currentPath === item.href ? styles.active : ''}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className={styles.sliderWrapper}>
        <section className={styles.slider} role='region' aria-label='Featured courses'>
          {courses?.dataDiplayHotList?.map((course, i) => (
            <div className={styles.sliderItem} key={i} role='button' tabIndex={0}>
              <img src={getImageUrl(course.imageUrl)} alt={`${course.name} thumbnail`} />
              <span>{course.name}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Header
