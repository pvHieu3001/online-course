import { useEffect, useRef, useState } from 'react'
import { MenuOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'

type Props = {
  isShowRecommendCourses: boolean
}

const Header = (props: Props) => {
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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const courses = useSelector((state: RootState) => state.course)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  // Xử lý ẩn/hiện Header khi cuộn
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
          setIsVisible(false) // Cuộn xuống thì ẩn
        } else {
          setIsVisible(true) // Cuộn lên thì hiện
        }
        setLastScrollY(window.scrollY)
      }
    }
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  useEffect(() => {
    dispatch(courseActions.getRecommendCourses() as unknown as AnyAction)
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Books', href: '/books' },
    { label: 'Business', href: '/chung-khoan' },
    { label: 'Health', href: '/crypto' },
    { label: 'Sport', href: '/thu-thuat-huu-ich' },
    { label: 'Life', href: '/suu-tam' },
    { label: 'Technology', href: '/tech' },
    { label: 'Entertainment', href: '/entertainment' },
    { label: 'Lifestyle', href: '/lifestyle' },
    { label: 'Car', href: '/car' },
    { label: 'Law', href: '/law' },
    { label: 'Education', href: '/education' },
    { label: 'Tourism', href: '/tourism' }
  ]

  const handleDetail = (course: IProduct) => {
    navigate(`/chi-tiet-khoa-hoc/${course.slug}`)
  }

  const handleSearch = (keyword: string) => {
    navigate(`?search=${encodeURIComponent(keyword)}`)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch((e.target as HTMLInputElement).value)
      setMenuOpen(false)
    }
  }

  return (
    <>
      {/* KHỐI HEADER CỐ ĐỊNH */}
      <div 
        className={`fixed top-0 left-0 w-full z-[1000] transition-transform duration-300 shadow-xl ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* 1. Topbar (Mobile Only) */}
        <div className='sm:hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white h-12 flex items-center justify-between px-4'>
          <button
            className='bg-transparent border-none p-1 rounded-md hover:bg-slate-700 transition'
            onClick={() => setMenuOpen(true)}
          >
            <MenuOutlined style={{ fontSize: 22, color: '#fff' }} />
          </button>
          <span className='opacity-90 font-medium text-[10px] uppercase tracking-wider'>{dateStr}</span>
        </div>

        {/* 2. Banner Section (Logo & Brand) */}
        <div className='w-full flex justify-center items-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none'></div>

          <header className='max-w-[1300px] w-full flex flex-col sm:flex-row items-center justify-between px-6 py-4 sm:py-6 relative z-10'>
            <Link to='/' className='flex items-center gap-4 group no-underline'>
              <div className='relative'>
                <div className='absolute -inset-1 bg-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300'></div>
                <svg
                  width='48'
                  height='48'
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='relative flex-shrink-0 drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-300'
                >
                  <defs>
                    <linearGradient id='owlBrandGradient' x1='0' y1='0' x2='120' y2='120'>
                      <stop offset='0%' stopColor='#38bdf8' />
                      <stop offset='100%' stopColor='#4f46e5' />
                    </linearGradient>
                  </defs>
                  <circle cx='60' cy='60' r='60' fill='url(#owlBrandGradient)' />
                  <path
                    d='M24 44 L42 78 L60 44 L78 78 L96 44'
                    stroke='#ffffff'
                    strokeWidth='12'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              <div className='flex flex-col'>
                <span className='text-white text-[20px] sm:text-[26px] font-black tracking-widest uppercase leading-none mb-1'>
                  Wise Owl
                </span>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase'>
                  Global News & Insights
                </span>
              </div>
            </Link>

            <div className='hidden sm:block text-right'>
              <span className='text-slate-400 text-[11px] font-medium uppercase tracking-widest'>{dateStr}</span>
            </div>
          </header>
        </div>

        {/* 3. Main Navigation Menu (Cố định ở đây) */}
        <div className='w-full bg-slate-900 border-b border-white/5 flex justify-center'>
          <nav className='max-w-[1300px] w-full hidden sm:flex items-center gap-1 h-12 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide'>
            {menuItems.map((item) => {
              const isActive = currentPath === item.href || (currentPath === '/' && item.href === '/')
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative font-semibold text-[13px] px-4 h-full flex items-center transition-all duration-300 ${
                    isActive ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className='absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-lg shadow-[0_-2px_12px_rgba(34,211,238,0.6)]'></span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 4. Sidebar Mobile (Giữ nguyên) */}
      {menuOpen && (
        <>
          <div className='fixed inset-0 bg-black/60 z-[2000] backdrop-blur-sm' onClick={() => setMenuOpen(false)}></div>
          <div
            ref={menuRef}
            className='fixed top-0 left-0 w-[85vw] max-w-[320px] h-screen bg-slate-900 shadow-2xl z-[2001] p-6 flex flex-col gap-4 overflow-y-auto'
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-white font-black text-xl tracking-tighter'>WISE OWL</span>
              <button
                className='bg-slate-800 hover:bg-slate-700 p-2 rounded-full border-none'
                onClick={() => setMenuOpen(false)}
              >
                <CloseOutlined style={{ fontSize: 18, color: '#fff' }} />
              </button>
            </div>
            {/* ... Phần search ... */}
            <div className='relative w-full'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400'>
                <SearchOutlined />
              </span>
              <input
                onKeyDown={handleSearchKeyDown}
                type='text'
                placeholder='Search articles...'
                className='w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400'
              />
            </div>
            {/* ... Menu mobile ... */}
            <nav className='mt-4 flex flex-col'>
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className={`block py-3 px-4 text-base font-semibold rounded-xl transition-all mb-2 ${
                    currentPath === item.href ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* 5. Placeholder - Bù chiều cao để nội dung không bị Header đè lên */}
      <div className='h-[110px] sm:h-[155px]'></div>
    </>
  )
}

export default Header