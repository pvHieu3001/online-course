import { blogActions } from '@/app/actions'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import { formatDateTimeString, getFullName } from '@/utils/formatDate'
import { getImageUrl } from '@/utils/getImageUrl'
import { AnyAction } from '@reduxjs/toolkit'
import { Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

function PageBlog() {
  const location = useLocation()
  const prevContent = useRef('')
  const [title, setTitle] = useState('Văn Hóa Công Nghệ')
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { dataList: dataList, recommendList: recommendList } = useSelector((state: RootState) => state.blog)

  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  useEffect(() => {
    setIsShowRecommendCourses(false)
  }, [setIsShowRecommendCourses])

  useEffect(() => {
    const path = location.pathname.replace(/^\/|\/$/g, '')

    let type = 'technology'
    let title = 'Văn Hóa Công Nghệ'

    switch (path) {
      case 'game':
        type = 'game'
        title = 'Game Hot'
        break
      case 'san-pham-cong-nghe':
        type = 'technology'
        title = 'Trending'
        break
      case 'thu-thuat-huu-ich':
        type = 'tips'
        title = 'Thủ Thuật Hữu Ích'
        break
      case 'suu-tam':
        type = 'archive'
        title = 'Sưu Tầm'
        break
    }

    setTitle(title)

    if (prevContent.current !== type) {
      prevContent.current = type
      dispatch(blogActions.getBlogByType(type, searchQuery) as unknown as AnyAction)
    }
  }, [location.pathname, dispatch, searchQuery])

  useEffect(() => {
    dispatch(blogActions.getBlogByType(prevContent.current, searchQuery) as unknown as AnyAction)
  }, [location.pathname, dispatch, searchQuery])

  const handleDetail = (slug: string) => {
    navigate(`/bai-viet/${slug}`)
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      {Array.isArray(recommendList) && recommendList.length > 0 && (
        <div className='w-full flex justify-center items-center'>
          <section
            className='max-w-[1300px] w-full flex items-center gap-2 px-5 overflow-x-auto h-24'
            role='region'
            aria-label='Featured courses'
          >
            {recommendList?.map((recommend, i) => (
              <div
                key={i}
                onClick={() => handleDetail(recommend.slug)}
                role='button'
                tabIndex={0}
                className='flex items-center gap-3 max-w-[220px] flex-shrink-0 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors'
              >
                <img
                  src={getImageUrl(recommend.image)}
                  alt={`${recommend.title} thumbnail`}
                  className='w-14 h-14 rounded-full object-cover border-2 border-white shadow-md'
                />
                <span className='text-sm font-medium text-gray-700 group-hover:text-black line-clamp-3'>
                  {recommend.title}
                </span>
              </div>
            ))}
          </section>
        </div>
      )}

      <div className='bg-gray-100 min-h-screen pb-16'>
        <div className='flex flex-col lg:flex-row gap-6 max-w-[1300px] mx-auto'>
          <div className='min-h-screen w-full lg:w-[80%] bg-white flex-1 bg-white rounded-lg shadow-md p-6'>
            <div className='flex flex-col items-start gap-4 border-b border-gray-200 pb-4 mb-2 md:flex-row md:items-center md:justify-between'>
              <h2 className='text-xl font-bold text-gray-800'>Bài Viết Nổi Bật</h2>
              <Input
                placeholder='Tìm kiếm bài viết...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full md:w-72' // Chiều rộng linh hoạt
                allowClear
              />
            </div>

            {dataList && dataList.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {dataList.map((article, index) => (
                  <div
                    onClick={() => handleDetail(article.slug)}
                    key={index}
                    className='bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer flex flex-col sm:flex-row'
                  >
                    <img
                      src={getImageUrl(article?.image || '/default-image.jpg')}
                      alt={article?.title || 'Không có tiêu đề'}
                      className='w-full sm:w-1/3 h-48 object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none'
                      loading='lazy'
                    />
                    <div className='p-5 flex-1'>
                      <h2 className='text-xl font-semibold text-black mb-2 hover:underline'>
                        {article?.title || 'Tiêu đề chưa có'}
                      </h2>
                      <p className='text-sm text-gray-500'>
                        ✍️ {getFullName(article?.updatedBy?.firstname, article?.updatedBy?.lastname)}{' '}
                        • 🗓️ {formatDateTimeString(article?.updatedAt) || 'Chưa cập nhật'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 italic'>Không có bài viết nào để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageBlog
