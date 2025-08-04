import styles from './styles.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TabCategory from '../TabCategory'
import { courseActions, categoryActions } from '@/app/actions'

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
      dispatch(categoryActions.getCategoryBySlug(slug))
    }
  }, [slug])

  // Fetch courses when category is loaded
  useEffect(() => {
    if (category && category.id) {
      dispatch(courseActions.getCoursesByCategory(category.id))
    }
  }, [category])

  // Handle course item click
  const handleCourseClick = (course) => {
    navigate('/course-detail', { state: course })
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

  // Show error if category not found
  if (!category) {
    return (
      <div className={styles.bg}>
        <div className={styles.categoryDetailPage}>
          <div className={styles.noCourses}>Category not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.bg}>
      <div className={styles.categoryDetailPage}>
        <div className={styles.categoryDetail}>
          <div>
            <div className={styles.categoryLabel}>Khóa học - {category.name}</div>
            <h1 className={styles.title}>Adobe After Effects Tutorials – Learn Adobe After Effects For Free</h1>
            <p className={styles.subtitle}>
              Adobe After Effects Tutorials – Learn Adobe After Effects For Free – how to compare in-camera footage with
              behind-the-scenes material, and make creative choices about blending them together. He also shares some
              beautiful special effects for adding flair to visuals. The final chapters show you how to put it all
              together, and make your Adobe CC workflow even more efficient, with presets.
            </p>
            <div className={styles.topics}>
              <div className={styles.topicsTitle}>Topics include:</div>
              <ul className={styles.topicList}>
                <li>Assessing your video footage</li>
                <li>Repairing and color correcting media</li>
                <li>Warming and cooling clips</li>
                <li>Shot matching</li>
              </ul>
            </div>
          </div>

          <div className={styles.courseList}>
            {coursesLoading ? (
              <div className={styles.loading}>Loading courses...</div>
            ) : currentCourses && currentCourses.length > 0 ? (
              <>
                {currentCourses.map((course) => (
                  <div
                    className={styles.courseItem}
                    key={course.id}
                    onClick={() => handleCourseClick(course)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={course.imageUrl} alt={course.name} className={styles.thumbnail} />
                    <div className={styles.courseContent}>
                      <div className={styles.courseCategory}>{category.name}</div>
                      <div className={styles.courseTitle}>{course.name}</div>
                      <div className={styles.courseDescription}>{course.description}</div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      className={styles.pageButton}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((pageNumber, index) => (
                      <button
                        key={index}
                        className={`${styles.pageButton} ${pageNumber === currentPage ? styles.activePage : ''} ${
                          pageNumber === '...' ? styles.ellipsis : ''
                        }`}
                        onClick={() => (typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null)}
                        disabled={pageNumber === '...'}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      className={styles.pageButton}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noCourses}>No courses found in this category</div>
            )}
          </div>
        </div>
        <TabCategory />
      </div>
    </div>
  )
}

export default CategoryDetailPage
