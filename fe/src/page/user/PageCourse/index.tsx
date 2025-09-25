import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd' // <-- import Pagination của antd
import TabCategory from '../components/TabCategory'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType, IProduct } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'

function PageCourse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [coursesPerPage] = useState(15)
  const {
    dataList: courses,
    isLoading: coursesLoading,
    totalElements
  } = useSelector((state: RootState) => state.course)
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendCourses(true)
  }, [setIsShowRecommendCourses])

  useEffect(() => {
    dispatch(courseActions.getCourses('active', '', '', currentPage - 1, coursesPerPage) as unknown as AnyAction)
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
    <div className='bg-gray-100 min-h-screen pb-16'>
      <div className='flex flex-col lg:flex-row gap-6 max-w-[1300px] mx-auto'>
        <div className='min-h-screen w-full lg:w-[80%] bg-white flex-1 bg-white rounded-lg shadow-md p-6'>
          <div>
            <div className='text-xl font-semibold text-indigo-600 mb-2'>Tất cả khóa học</div>
          </div>

          <div>
            {coursesLoading ? (
              <div className='text-center text-gray-500'>Đang tải khóa học...</div>
            ) : courses && courses.length > 0 ? (
              <>
                <div className='flex flex-col gap-6 mb-6'>
                  {courses.map((course) => {
                    const stripHtml = (html: string) => {
                      const tmp = document.createElement('div')
                      tmp.innerHTML = html
                      return tmp.textContent || tmp.innerText || ''
                    }

                    const shortDescription = stripHtml(course.description).slice(0, 200) + '...'
                    return (
                      <div
                        key={course.id}
                        onClick={() => handleCourseClick(course)}
                        className='cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm p-4 transition flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4'
                      >
                        <img
                          src={getImageUrl(course.imageUrl)}
                          alt={course.name}
                          className='w-100 h-40 object-cover rounded-md flex-shrink-0'
                        />
                        <div>
                          <div className='text-sm text-indigo-500 font-medium'>{course.category?.name}</div>
                          <div className='text-lg font-semibold text-gray-800'>{course.name}</div>
                          <div
                            dangerouslySetInnerHTML={{ __html: shortDescription }}
                            className='text-gray-600 text-base mt-1 [&_p]:mb-4 
                                [&_p]:text-xl
                                [&_h1]:text-4xl 
                                [&_h2]:text-3xl 
                                [&_h3]:text-2xl 
                                [&_ul]:list-disc 
                                [&_ul]:pl-6 
                                [&_a]:text-blue-600 [&_a:hover]:underline'
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Sử dụng Pagination của Ant Design */}
                <div className='flex justify-center'>
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
              <div className='text-center text-gray-500'>Không tìm thấy khóa học nào trong danh mục này</div>
            )}
          </div>
        </div>
        <TabCategory />
      </div>
    </div>
  )
}

export default PageCourse
