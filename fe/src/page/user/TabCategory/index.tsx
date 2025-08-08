import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { categoryActions } from '@/app/actions'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/app/store'

function TabCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector((state: RootState) => state.category)
  const hasLoaded = useRef(false)

  useEffect(() => {
    // Only fetch categories if not already loading and not loaded
    if (!hasLoaded.current && !categories.isLoading && (!categories.dataList || categories.dataList.length === 0)) {
      hasLoaded.current = true
      dispatch(categoryActions.getCategories() as unknown as AnyAction)
    }
  }, []) // Empty dependency array - only run once

  const handleCategoryDetail = (slug: any) => {
    const category = categories.dataList.find((c: any) => c.slug === slug)
    if (!category) return
    navigate(`/khoa-hoc-theo-chu-de/${slug}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <aside className='w-full lg:w-[20%] bg-white p-6 rounded-lg shadow-md' role='complementary'>
      {/* Search Box */}
      <div className='mb-8'>
        <h2 className='text-lg font-semibold text-gray-800 mb-3'>Tìm kiếm khóa học</h2>
        <form
          onSubmit={handleSearch}
          className='flex rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500'
        >
          <input
            type='text'
            placeholder='Type here to search...'
            aria-label='Search for courses'
            className='flex-1 px-4 py-2 focus:outline-none'
          />
          <button
            type='submit'
            aria-label='Submit search'
            className='px-4 bg-blue-600 text-white hover:bg-blue-700 transition'
          >
            <span role='img' aria-label='Search'>
              🔍
            </span>
          </button>
        </form>
      </div>

      {/* Categories Box */}
      <div>
        <h2 className='text-lg font-semibold text-gray-800 mb-3'>Loại khóa học</h2>
        <ul className='space-y-2' role='list'>
          {categories?.dataList?.map((category: any, index: number) => (
            <li
              key={index}
              role='button'
              tabIndex={0}
              onClick={() => handleCategoryDetail(category.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCategoryDetail(category.slug)
                }
              }}
              className='flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <span className='text-gray-700 font-medium'>{category.name}</span>
              <span className='text-sm text-gray-500 bg-white px-2 py-0.5 rounded-full border'>{index}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default TabCategory
