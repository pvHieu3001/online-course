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

function PageCourse() {
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
        <div className='flex flex-col lg:flex-row gap-6 max-w-[1300px] mx-auto'>
          <div className='min-h-screen w-full lg:w-[80%] bg-white flex-1 rounded-lg shadow-md p-6'>
            <div>
              <div className='text-xl font-semibold text-indigo-600 mb-6'>All Courses</div>
            </div>

            <div>
              {coursesLoading ? (
                <div className='text-center text-gray-500'>Loading courses...</div>
              ) : courses && courses.length > 0 ? (
                <>
                  {/* Thay đổi từ flex-col sang grid 4 cột trên màn hình lớn */}
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
                    {courses.map((course) => {
                      const stripHtml = (html: string) => {
                        const tmp = document.createElement('div')
                        tmp.innerHTML = html
                        return tmp.textContent || tmp.innerText || ''
                      }

                      const shortDescription = course.description ? stripHtml(course.description).slice(0, 100) : ''

                      return (
                        <div
                          key={course.id}
                          onClick={() => handleCourseClick(course)}
                          className='group cursor-pointer flex flex-col items-center'
                        >
                          {/* Phần hình ảnh: Tỉ lệ dọc giống bìa sách trong hình */}
                          <div className='relative w-full aspect-[3/4] mb-3 overflow-hidden rounded-md shadow-sm group-hover:shadow-lg transition-shadow duration-300'>
                            <img
                              src={getImageUrl(course.imageUrl)}
                              alt={course.name}
                              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>

                          {/* Phần nội dung: Căn giữa giống trong hình */}
                          <div className='text-center w-full'>
                            {/* Category (tùy chọn hiện hoặc ẩn nếu muốn giống hệt hình) */}
                            <div className='text-[12px] text-indigo-500 font-medium uppercase tracking-wider mb-1'>
                              {course.category?.name}
                            </div>

                            {/* Tên khóa học/sách */}
                            <div className='text-sm font-medium text-gray-700 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors'>
                              {course.name}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Pagination */}
                  <div className='flex justify-center mt-4'>
                    <Pagination
                      current={currentPage}
                      pageSize={coursesPerPage}
                      total={totalElements}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              ) : (
                <div className='text-center text-gray-500'>No courses found in this category</div>
              )}
            </div>
          </div>
          <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
            <TabCategory />
          </aside>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageCourse
