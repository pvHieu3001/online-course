import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'

function BlogDetailPage() {
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { data: blogData } = useSelector((state: RootState) => state.blog)
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      dispatch(blogActions.getBlogBySlug(slug) as unknown as AnyAction)
    }
    setIsShowRecommendCourses(false)
  }, [slug])

  const handleDetail = (slug: string) => {
    navigate(`/bai-viet/${slug}`)
  }

  if (!blogData) {
    return (
      <div className='flex items-center justify-center min-h-screen text-gray-500 text-lg'>Đang tải bài viết...</div>
    )
  }

  return (
    <div className='bg-white text-gray-800 font-sans leading-relaxed'>
      <main className='max-w-5xl mx-auto px-4 py-10'>
        <h1 className='text-4xl font-bold mb-4'>{blogData.title}</h1>

        <div className='text-sm text-gray-500 mb-6'>
          <span>
            Đăng bởi <strong className='text-gray-700'>Nguyễn Văn A</strong>
          </span>{' '}
          ·<span>29 Tháng 8, 2025</span>
        </div>

        <img src={getImageUrl(blogData.image)} alt={blogData.title} className='w-full rounded-lg mb-8 shadow' />

        <article
          className='prose prose-lg max-w-none [&_p]:mb-4 
                [&_p]:text-xl
                [&_h1]:text-4xl 
                [&_h2]:text-3xl 
                [&_h3]:text-2xl 
                [&_ul]:list-disc 
                [&_ul]:pl-6 
                [&_a]:text-blue-600 [&_a:hover]:underline'
          dangerouslySetInnerHTML={{ __html: blogData.content || '' }}
        ></article>

        <section className='mt-16 border-t pt-10'>
          <h3 className='text-xl font-semibold mb-4'>Bài viết liên quan</h3>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <li className='border rounded p-4 hover:shadow'>
              <a href='#' className='text-lg font-medium hover:text-blue-600'>
                Lịch sử phát triển của mật khẩu
              </a>
              <p className='text-sm text-gray-500'>10 Tháng 7, 2025</p>
            </li>
            <li className='border rounded p-4 hover:shadow'>
              <a href='#' className='text-lg font-medium hover:text-blue-600'>
                Xác thực 2 bước có còn đủ an toàn?
              </a>
              <p className='text-sm text-gray-500'>22 Tháng 6, 2025</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default BlogDetailPage
