import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
import TabCategory from '../components/TabCategory'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType, IProduct } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '../components/util/HandleLoading'

function PageBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [coursesPerPage] = useState(15)
  const {
    dataList: courses,
    isLoading: coursesLoading,
    totalElements,
    error_message
  } = useSelector((state: RootState) => state.course)
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendCourses(true)
  }, [setIsShowRecommendCourses])

  useEffect(() => {
    dispatch(courseActions.getCourses('active', '', '', currentPage - 1, coursesPerPage, '') as unknown as AnyAction)
  }, [dispatch, currentPage, coursesPerPage])

  // Handle course item click
  const handleCourseClick = (course: IProduct) => {
    navigate(`/chi-tiet-khoa-hoc/${course.slug}`)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <HandleLoading isLoading={coursesLoading} error_message={error_message}>
      <div className='bg-gray-100 min-h-screen pb-16'>
        <Helmet>
          <title>Global Times || All Courses</title>
          <meta
            name='description'
            content='Discover all free courses and informative resources on Global Times — learn programming, design, marketing, and more, completely free.'
          />
        </Helmet>

        <div className='flex flex-col lg:flex-row gap-6 max-w-[1300px] mx-auto p-4 md:p-6'>
          {/* Main Content Area */}
          <div className='min-h-[80vh] w-full lg:w-[80%] bg-white rounded-lg shadow-md p-6 flex flex-col'>
            <div className='flex-1'>
              {coursesLoading ? (
                <div className='flex justify-center items-center h-64 text-gray-500'>
                  <div className='animate-pulse'>Loading courses...</div>
                </div>
              ) : courses && courses.length > 0 ? (
                /* Grid/Flex Container for Cards */
                <div className='flex flex-wrap gap-6 mb-8 justify-center md:justify-start'>
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => handleCourseClick(course)}
                      className='group cursor-pointer flex flex-col items-center w-[140px] flex-shrink-0'
                    >
                      {/* Image Frame */}
                      <div className='relative w-full h-[180px] mb-3 overflow-hidden rounded-md shadow-sm group-hover:shadow-lg transition-shadow duration-300'>
                        <img
                          src={getImageUrl(course.imageUrl)}
                          alt={course.name}
                          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      </div>

                      {/* Info Section */}
                      <div className='text-center w-full'>
                        <div className='text-[10px] text-indigo-500 font-medium uppercase tracking-wider mb-1 truncate'>
                          {course.category?.name || 'General'}
                        </div>
                        <div className='text-[13px] font-medium text-gray-700 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors h-[36px]'>
                          {course.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center h-64 text-gray-400'>
                  <p>No courses found in this category</p>
                </div>
              )}
            </div>

            {/* Pagination Section - Always at the bottom */}
            {courses && courses.length > 0 && !coursesLoading && (
              <div className='flex justify-center pt-8 border-t border-gray-100 mt-auto'>
                <Pagination
                  current={currentPage}
                  pageSize={coursesPerPage}
                  total={totalElements}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  responsive={true}
                />
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className='w-full lg:w-[20%]'>
            <div className='sticky top-4'>
              <TabCategory />
            </div>
          </aside>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageBook
