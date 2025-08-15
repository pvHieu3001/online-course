import { useEffect, useState } from 'react'
import { MenuOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './styles.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'

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
  const navigate = useNavigate()
  const router = useNavigate()

  useEffect(() => {
    dispatch(courseActions.getRecommendCourses() as unknown as AnyAction)
  }, [dispatch])

  const menuItems = [
    { label: 'TRANG CHỦ', href: '/' },
    { label: 'MÃ GIẢM GIÁ 100% UDEMY', href: '/khoa-hoc-theo-chu-de/udemy' },
    { label: 'ĐIỀU KHOẢN SỬ DỤNG', href: '/term-of-use' },
    { label: 'CHÍNH SÁCH BẢO MẬT', href: '/privacy-policy' },
    { label: 'BẢN QUYỀN', href: '/copyright' }
  ]

  const handleDetail = (course: IProduct) => {
    navigate(`/chi-tiet-khoa-hoc/${course.slug}`)
  }

  const handleSearch = (keyword: string) => {
    router(`?search=${encodeURIComponent(keyword)}`)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch((e.target as HTMLInputElement).value)
      setMenuOpen(false) // Đóng menu sau khi tìm kiếm
    }
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

            <div className='relative w-full max-w-md mt-10'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                <SearchOutlined />
              </span>
              <input
                onKeyDown={handleSearchKeyDown}
                type='text'
                placeholder='Tìm kiếm khóa học...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
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
          {courses.recommends?.map((course, i) => (
            <div onClick={() => handleDetail(course)} className={styles.sliderItem} key={i} role='button' tabIndex={0}>
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
