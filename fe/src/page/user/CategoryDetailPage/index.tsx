import styles from './styles.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TabCategory from '../TabCategory'
import { courseActions, categoryActions } from '@/app/actions'
import _ from 'lodash'
import { AnyAction } from '@reduxjs/toolkit'

function CategoryDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(6)

  // Get data from Redux store
  const { dataList: courses, isLoading: coursesLoading } = useSelector((state) => state.course)
  const { data: category, isLoading: categoryLoading } = useSelector((state) => state.category)

  // Fetch category and courses when component mounts
  useEffect(() => {
    if (slug) {
      dispatch(categoryActions.getCategoryBySlug(slug) as unknown as AnyAction)
    }
  }, [slug])

  // Fetch courses when category is loaded
  useEffect(() => {
    if (category && category.id) {
      dispatch(courseActions.getCoursesByCategory(category.id) as unknown as AnyAction)
    }
  }, [category])

  // Handle course item click
  const handleCourseClick = (course) => {
    navigate('/chi-tiet-khoa-hoc', { state: course })
  }

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = courses ? courses.slice(indexOfFirstCourse, indexOfLastCourse) : []
  const totalPages = courses ? Math.ceil(courses.length / coursesPerPage) : 0

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }
  // Show loading if category is still loading
  if (categoryLoading) {
    return (
      <div className={styles.bg}>
        <div className={styles.categoryDetailPage}>
          <div className={styles.loading}>Loading category...</div>
        </div>
      </div>
    )
  }

  // Show error if Danh mục không tồn tại
  if (!category) {
    return (
      <div className={styles.bg}>
        <div className={styles.categoryDetailPage}>
          <div className={styles.noCourses}>Danh mục không tồn tại</div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-100 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Nội dung chính bên trái */}
          <div className='flex-1 bg-white rounded-lg shadow-md p-6'>
            <div>
              <div className='text-sm font-semibold text-indigo-600 mb-2'>Khóa học - {category.name}</div>
              <h1 className='text-2xl font-bold text-gray-800 mb-4'>Mô tả chủ đề</h1>
              <p className='text-gray-600 mb-6'>{category.description}</p>

              <div className='mb-6'>
                <div className='text-lg font-semibold text-gray-700 mb-2'>Nội dung:</div>
                <p className='list-disc list-inside text-gray-600 space-y-1'>{category.content}</p>
              </div>
            </div>

            <div>
              {coursesLoading ? (
                <div className='text-center text-gray-500'>Đang tải khóa học...</div>
              ) : currentCourses && currentCourses.length > 0 ? (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                    {currentCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleCourseClick(course)}
                        className='cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm p-4 transition'
                      >
                        <img
                          src={course.imageUrl}
                          alt={course.name}
                          className='w-full h-40 object-cover rounded-md mb-4'
                        />
                        <div>
                          <div className='text-sm text-indigo-500 font-medium'>{category.name}</div>
                          <div className='text-lg font-semibold text-gray-800'>{course.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className='flex justify-center items-center space-x-2'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50'
                      >
                        Trước
                      </button>

                      {getPageNumbers().map((pageNumber, index) => (
                        <button
                          key={index}
                          onClick={() => (typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null)}
                          disabled={pageNumber === '...'}
                          className={`px-3 py-1 border rounded ${
                            pageNumber === currentPage ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-100'
                          } ${pageNumber === '...' ? 'cursor-default text-gray-400' : ''}`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50'
                      >
                        Tiếp
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='text-center text-gray-500'>Không tìm thấy khóa học nào trong danh mục này</div>
              )}
            </div>
          </div>

          <TabCategory />
        </div>
      </div>
    </div>
  )
}

export default CategoryDetailPage
