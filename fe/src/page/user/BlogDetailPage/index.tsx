import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType, IBlog } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatDateTimeString, getFullName } from '@/utils/formatDate'
import HandleLoading from '@/page/admin/components/util/HandleLoading'
import LoadingPage from '@/page/admin/components/util/LoadingPage'

function BlogDetailPage() {
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: blogData,
    relatedPosts: relatedDatas,
    isLoading,
    error_message
  } = useSelector((state: RootState) => state.blog)
  const [relatedBlogs, setRelatedBlogs] = useState<IBlog[]>()

  useEffect(() => {
    if (slug) {
      dispatch(blogActions.resetBlog() as unknown as AnyAction)
      dispatch(blogActions.getBlogBySlug(slug) as unknown as AnyAction)
    }
    setIsShowRecommendCourses(false)
  }, [dispatch, setIsShowRecommendCourses, slug])

  useEffect(() => {
    if (relatedDatas && relatedDatas.length > 0) {
      setRelatedBlogs(relatedDatas.slice())
    }
  }, [relatedDatas])

  const handleDetail = (slug: string) => {
    navigate(`/bai-viet/${slug}`)
  }

  if (isLoading || !blogData) {
    return <LoadingPage />
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='bg-white text-gray-800 font-sans leading-relaxed'>
        <main className='max-w-[1300px] w-full mx-auto px-4 py-10'>
          <h1 className='text-4xl font-bold mb-4'>{blogData.title}</h1>
          <h3 className='text-3xl mb-4'>{blogData.description}</h3>
          <div className='text-sm text-gray-500 mb-6'>
            <span>
              Đăng bởi &nbsp;
              <strong className='text-gray-700'>
                {getFullName(blogData.updatedBy?.firstname, blogData.updatedBy?.lastname)}
              </strong>
            </span>{' '}
            ·<span>{formatDateTimeString(blogData.updatedAt) || 'Chưa cập nhật'}</span>
          </div>

          <img src={getImageUrl(blogData.image)} alt={blogData.title} className='w-full rounded-lg mb-8 shadow' />

          <article
            className='prose prose-lg max-w-none font-arial
                [&_p]:mb-4 
                [&_p]:text-base
                [&_h1]:text-3xl 
                [&_h2]:text-2xl 
                [&_h3]:text-xl 
                [&_ul]:list-disc 
                [&_ul]:pl-6 
                [&_a]:text-blue-600 [&_a:hover]:underline text-base'
            dangerouslySetInnerHTML={{ __html: blogData.content || '' }}
          ></article>

          {/* Bài viết liên quan */}
          <section className='mt-16 border-t pt-10'>
            <h3 className='text-xl font-semibold mb-6'>Bài viết liên quan</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedBlogs &&
                relatedBlogs.length > 0 &&
                relatedBlogs.map((post, index) => (
                  <div
                    onClick={() => {
                      handleDetail(post.slug)
                    }}
                    key={index}
                    className='border rounded p-4 hover:shadow transition-shadow h-full flex flex-col'
                  >
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className='w-full h-40 object-cover rounded mb-3'
                    />
                    <p className='text-lg font-medium hover:text-blue-600 block mb-1'>{post.title}</p>
                    <p className='text-sm text-gray-500'>{formatDateTimeString(post.updatedAt)}</p>
                  </div>
                ))}
            </div>
          </section>
        </main>
      </div>
    </HandleLoading>
  )
}

export default BlogDetailPage
