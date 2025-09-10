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
      <div className='bg-[#2e7551] text-white py-2'>
        <div className='max-w-7xl mx-auto pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1'>
            <h1 className='text-xl sm:text-2xl font-bold'>{title || 'Bài Viết'}</h1>
            <Input
              placeholder='Tìm kiếm bài viết...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full sm:w-64 text-base sm:text-sm px-4 py-1 rounded-full'
              allowClear
              size='middle'
            />
          </div>
          <section>
            <div className='border-t border-white/30 mt-4 overflow-x-auto'>
              {Array.isArray(recommendList) && recommendList.length > 0 ? (
                <div className='flex justify-start gap-4 flex-nowrap min-w-full'>
                  {recommendList.map((recommend, index) => (
                    <div
                      key={index}
                      onClick={() => handleDetail(recommend?.title)}
                      className='w-full sm:w-[280px] rounded-xl overflow-hidden shadow-md cursor-pointer transition hover:shadow-xl flex-shrink-0 relative group'
                      style={{
                        backgroundImage: `url(${
                          recommend?.image ? getImageUrl(recommend.image) : '/default-image.jpg'
                        })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '220px'
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10' />

                      {/* Text overlay */}
                      <div className='absolute inset-0 z-20 flex flex-col justify-end p-4 text-white'>
                        <h3 className='text-base font-semibold leading-snug line-clamp-2'>
                          {recommend?.title || 'Tên bài viết chưa có'}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-white py-4'></div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className='max-w-7xl mx-auto pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-4 py-5 flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-gray-800'>Bài Viết Nổi Bật</h2>

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
                    ✍️ {getFullName(article?.updatedBy.firstname, article?.updatedBy.lastname) || 'Tác giả ẩn danh'} •
                    🗓️ {formatDateTimeString(article?.updatedAt) || 'Chưa cập nhật'}
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
  )
}

export default PageBlog
