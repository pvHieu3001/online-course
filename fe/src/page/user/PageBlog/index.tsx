import { blogActions } from '@/app/actions'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import HandleLoading from '@/page/admin/components/util/HandleLoading'
import { formatDateTimeString, getFullName } from '@/utils/formatDate'
import { getImageUrl } from '@/utils/getImageUrl'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import TabBlogCategory from '../components/TabBlogCategory'

function PageBlog() {
  const location = useLocation()
  const prevContent = useRef('')
  const [title, setTitle] = useState('Tech Culture')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    dataList: dataList,
    recommendList: recommendList,
    isLoading,
    error_message
  } = useSelector((state: RootState) => state.blog)

  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  useEffect(() => {
    setIsShowRecommendCourses(false)
  }, [setIsShowRecommendCourses])

  useEffect(() => {
    const path = location.pathname.replace(/^\/|\/$/g, '')

    let type = 'technology'
    let title = 'Tech Culture'

    switch (path) {
      case 'game':
        type = 'game'
        title = 'Hot Games'
        break
      case 'san-pham-cong-nghe':
        type = 'technology'
        title = 'Tech Products'
        break
      case 'crypto':
        type = 'crypto'
        title = 'Crypto'
        break
      case 'chung-khoan':
        type = 'stock'
        title = 'Stock'
        break
      case 'thu-thuat-huu-ich':
        type = 'tips'
        title = 'Useful Tips'
        break
      case 'suu-tam':
        type = 'archive'
        title = 'Collections'
        break
    }

    setTitle(title)

    if (prevContent.current !== type) {
      prevContent.current = type
      dispatch(blogActions.getBlogByType(type, '') as unknown as AnyAction)
    }
  }, [location.pathname, dispatch])

  useEffect(() => {
    dispatch(blogActions.getBlogByType(prevContent.current, '') as unknown as AnyAction)
  }, [location.pathname, dispatch])

  const handleDetail = (slug: string) => {
    navigate(`/bai-viet/${slug}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='bg-gray-100 min-h-screen'>
        <Helmet>
          <title>Hocfree || {title}</title>
          <meta
            name='description'
            content={`Read the article "${title}" on Hocfree to discover new knowledge about programming, design, marketing, and more.`}
          />
        </Helmet>
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
                <div>
                  <div className='text-xl font-semibold text-indigo-600 mb-2'>All Blogs</div>
                </div>
              </div>

              {dataList && dataList.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-1 gap-6'>
                  {dataList.map((article, index) => (
                    <div
                      onClick={() => handleDetail(article.slug)}
                      key={index}
                      className='cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm p-4 transition flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4'
                    >
                      <img
                        src={getImageUrl(article?.image || '/default-image.jpg')}
                        alt={article?.title || 'No title'}
                        className='w-100 h-40 object-cover rounded-md flex-shrink-0'
                        loading='lazy'
                      />
                      <div className='p-5 flex-1'>
                        <h2 className='text-lg font-semibold text-gray-800'>{article?.title || 'No title available'}</h2>
                        <p className='text-sm text-gray-500'>
                          ✍️ {getFullName(article?.updatedBy?.firstname, article?.updatedBy?.lastname)} • 🗓️{' '}
                          {formatDateTimeString(article?.updatedAt) || 'Not updated yet'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-gray-500 italic'>No blogs to display.</p>
              )}
            </div>
            <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
              <TabBlogCategory />
            </aside>
          </div>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageBlog
