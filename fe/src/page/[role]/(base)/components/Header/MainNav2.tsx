import { FC } from 'react'
import Logo from '../../shared/Logo/Logo'
import MenuBar from '../../shared/MenuBar/MenuBar'
import LangDropdown from './LangDropdown'
import AvatarDropdown from './AvatarDropdown'
import DropdownCategories from './DropdownCategories'
import CartDropdown from './CartDropdown'

export interface MainNav2Props {
  className?: string
}

const MainNav2: FC<MainNav2Props> = ({ className = '' }) => {
  const renderMagnifyingGlassIcon = () => {
    return (
      <button type='submit'>
        <svg width={22} height={22} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M22 22L20 20' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>
    )
  }

  const searchForm = () => {
    return (
      <form className='py-2 text-slate-900 dark:text-slate-100 hidden md:block mx-2' action='/page-search'>
        <div className='bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 rounded-[999px]'>
          {renderMagnifyingGlassIcon()}
          <input
            name='keyword'
            type='text'
            placeholder='Bạn cần tìm gì?'
            className='border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base'
            autoFocus
          />
        </div>
        <input type='submit' hidden value='' />
      </form>
    )
  }

  return (
    <div className='nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900 '>
      <div className='container'>
        <div className='h-20 flex justify-between'>
          <div className='flex items-center md:hidden flex-1'>
            <MenuBar />
          </div>

          <div className='flex lg:flex-1 items-center space-x-3 sm:space-x-8'>
            <Logo />
            <div className='hidden md:block h-10 border-l border-slate-200 dark:border-slate-700'></div>
            <div className='hidden md:block'>
              <DropdownCategories />
            </div>
          </div>

          <div className='flex-1 flex items-center justify-end '>
            {searchForm()}
            <LangDropdown />
            <AvatarDropdown />
            <CartDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav2
