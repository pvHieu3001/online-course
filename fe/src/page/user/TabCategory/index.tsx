import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { categoryActions } from '@/app/actions'
import { useNavigate } from 'react-router-dom'


function TabCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(categoryActions.getCategories() as unknown as AnyAction)
  }, [dispatch])

  const categories = useSelector((state) => state.category)

  const handleCategoryDetail = (id: any) => {
    const category = categories.dataList.find((c: any) => c.id === id)
    if (!category) return
    navigate(`/category-detail/${id}`, { state: category })
  }


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
      
        <aside className={styles.sidebar} role='complementary'>
                  <div className={styles.searchBox}>
                    <h2 className={styles.searchLabel}>Search Course</h2>
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
                    <h2 className={styles.categoriesLabel}>Categories</h2>
                    <ul className={styles.categoriesList} role='list'>
                      {categories?.dataList?.map((category: any, i: number) => (
                        <li
                          key={i}
                          role='button'
                          tabIndex={0}
                          onClick={() => handleCategoryDetail(category.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleCategoryDetail(category.id)
                            }
                          }}
                        >
                          <span className={styles.catCount}>{category.id}</span>
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
        </aside>
  )
}

export default TabCategory
