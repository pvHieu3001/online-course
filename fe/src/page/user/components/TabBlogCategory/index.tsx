import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { affiliateActions } from '@/app/actions'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/app/store'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ShopeeAffiliateBanner from '../ShopeeAffiliateBanner'

function TabBlogCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const affiliateStore = useSelector((state: RootState) => state.affiliate)
  const [keyword, setKeyword] = useState('')
  const router = useNavigate()

  const categories = [
    { name: 'Chứng Khoán', href: '/chung-khoan' },
    { name: 'Crypto', href: '/crypto' },
    { name: 'Tiện Ích', href: `/thu-thuat-huu-ich` },
    { name: 'Sưu Tầm', href: `/suu-tam` }
  ]

  useEffect(() => {
    dispatch(affiliateActions.getRandomAffiliate() as unknown as AnyAction)
    const intervalId = setInterval(() => {
      dispatch(affiliateActions.getRandomAffiliate() as unknown as AnyAction)
    }, 30000)
    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch])

  const handleCategoryDetail = (href: string) => {
    navigate(`${href}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    if (e) e.preventDefault()
    router(`/tim-kiem?search=${encodeURIComponent(keyword)}`)
  }

  return (
    <aside className='w-full lg:w-[100%] bg-white p-6 rounded-lg shadow-md space-y-8 sticky top-4' role='complementary'>
      {affiliateStore?.dataRandom && (
        <ShopeeAffiliateBanner
          link={affiliateStore.dataRandom?.targetUrl || 'https://shopee.vn/'}
          imageUrl={affiliateStore.dataRandom?.image || 'https://cf.shopee.vn/file/sg-11134201-22100-2p0q3k3l1e4d6e'}
          price={affiliateStore.dataRandom?.price}
          originalPrice={affiliateStore.dataRandom?.originalPrice}
          alt='Mua ngay trên Shopee'
          width='100%'
        />
      )}

      {/* Tìm kiếm */}
      <div>
        <h2 className='text-lg font-semibold text-gray-800 mb-3'>Tìm kiếm bà viết</h2>
        <form
          onSubmit={handleSearch}
          className='flex rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500'
        >
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Nhập từ khóa...'
            aria-label='Search for blogs'
            suffix={
              <SearchOutlined
                onClick={handleSearch}
                style={{ color: '#1890ff', cursor: 'pointer' }}
                aria-label='Tìm kiếm'
              />
            }
            className='py-1 px-4'
          />
        </form>
      </div>

      <div>
        <h2 className='text-lg font-semibold text-gray-800 mb-3'>Loại bài viết</h2>
        <ul className='space-y-2' role='list'>
          {categories.map((category, index: number) => (
            <li
              key={index}
              role='button'
              tabIndex={0}
              onClick={() => handleCategoryDetail(category.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCategoryDetail(category.href)
                }
              }}
              className='flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <span className='text-gray-700 font-medium text-base'>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default TabBlogCategory
