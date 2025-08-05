import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { categoryActions } from '@/app/actions'
import { useNavigate } from 'react-router-dom'

function TabCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector((state: any) => state.category)
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
    navigate(`/category-detail/${slug}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <aside className={styles.sidebar} role='complementary'>
      <div className={styles.searchBox}>
        <h2 className={styles.searchLabel}>Tìm kiếm khóa học</h2>
        <form onSubmit={handleSearch} className={styles.searchInputWrap}>
          <input type='text' placeholder='Type here to search...' aria-label='Search for courses' />
          <button type='submit' aria-label='Submit search'>
            <span className={styles.searchIcon} role='img' aria-label='Search'>
              🔍
            </span>
          </button>
        </form>
      </div>

      <div className={styles.categoriesBox}>
        <h2 className={styles.categoriesLabel}>Loại khóa học</h2>
        <ul className={styles.categoriesList} role='list'>
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
            >
              <span className={styles.catCount}>{index}</span>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default TabCategory
