import { blogActions } from '@/app/actions'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

function PageBlog() {
  const location = useLocation()
  const prevContent = useRef('')
  const [title, setTitle] = useState('Văn Hóa Công Nghệ')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { dataList, isLoading, error_message } = useSelector((state: RootState) => state.blog)

  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  setIsShowRecommendCourses(false)

  const articles = [
    {
      title: 'Are Passwords Dead? What Are Passkeys?',
      author: 'David Matthews',
      date: 'Mar 31, 2025',
      image: 'https://via.placeholder.com/600x400?text=Passwords'
    },
    {
      title: 'Top 10 Tech Pranks',
      author: 'Devin Kate Pope',
      date: 'Jan 04, 2024',
      image: 'https://via.placeholder.com/600x400?text=Tech+Pranks'
    },
    {
      title: 'How to Edit Windows OEM Information',
      author: 'Nick Evanson',
      date: 'Dec 27, 2023',
      image: 'https://via.placeholder.com/600x400?text=Windows+OEM'
    }
  ]

  useEffect(() => {
    const path = location.pathname.replace(/^\/|\/$/g, '')

    let newContent = 'technology'
    let newTitle = 'Văn Hóa Công Nghệ'

    switch (path) {
      case 'game':
        newContent = 'game'
        newTitle = 'Chính Sách Game'
        break
      case 'san-pham-cong-nghe':
        newContent = 'technology'
        newTitle = 'Sản Phẩm Công Nghệ'
        break
      case 'thu-thuat-huu-ich':
        newContent = 'tips'
        newTitle = 'Thủ Thuật Hữu Ích'
        break
      case 'suu-tam':
        newContent = 'archive'
        newTitle = 'Bài Viết Sưu Tầm'
        break
    }

    setTitle(newTitle)

    if (prevContent.current !== newContent) {
      prevContent.current = newContent
      dispatch(blogActions.getBlogByType(newContent) as unknown as AnyAction)
    }
  }, [location.pathname, dispatch])

  const handleDetail = (slug: string) => {
    navigate(`/bai-viet/${slug}`)
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='bg-[#2e7551] text-white py-6'>
        <div className='max-w-7xl mx-auto pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-4'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>{title}</h1>
          <section>
            <div className='border-t border-white/30 mt-4 overflow-x-auto'>
              <div className='flex justify-start gap-4 flex-nowrap min-w-full'>
                {articles.slice(0, 3).map((related, index) => (
                  <div
                    key={index}
                    onClick={() => handleDetail(related.title)}
                    className='w-full sm:w-[280px] rounded-xl overflow-hidden shadow-md cursor-pointer transition hover:shadow-xl flex-shrink-0 relative group'
                    style={{
                      backgroundImage: `url(${related.image ? getImageUrl(related.image) : '/default-image.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '220px'
                    }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10' />
                    <div className='absolute inset-0 z-20 flex flex-col justify-end p-4 text-white'>
                      <h3 className='text-base font-semibold leading-snug line-clamp-2'>
                        {related.title || 'Tên bài viết chưa có'}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='max-w-7xl mx-auto pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-4 py-10 flex flex-col gap-10'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Danh sách bài viết nổi bật</h2>

        {dataList && dataList.length > 0 ? (
          dataList.map((article, index) => (
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
                  ✍️ {article?.author || 'Tác giả ẩn danh'} • 🗓️ {article?.date || 'Chưa cập nhật'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 italic'>Không có bài viết nào để hiển thị.</p>
        )}
      </div>
    </div>
  )
}

export default PageBlog
