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
import { Helmet } from 'react-helmet-async'
import { getBlogInfoByType } from '@/utils/getBlogInfo'
import TabBlogCategory from '../components/TabBlogCategory'

function BlogDetailPage() {
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: blogData,
    relatedPosts: relatedDatas,
    recommendList: recommendList,
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

  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: getBlogInfoByType(blogData?.type).title, href: '/' + getBlogInfoByType(blogData?.type).path },
    { name: blogData?.title, href: `/bai-viet/${slug}` }
  ]

  const handleSearch = (tag: string) => {
    navigate(`/tim-kiem-bai-viet?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Học Free || {blogData.title}</title>
        <meta
          key='description'
          name='description'
          content={blogData.description || `Đọc bài viết ${blogData.title} tại Học Free.`} // Ưu tiên dùng description
        />
      </Helmet>
      {Array.isArray(recommendList) && recommendList.length > 0 && (
        <div className='bg-gray-100 w-full flex justify-center items-center'>
          <section
            className='max-w-[1300px] w-full flex items-center gap-2 px-5 overflow-x-auto'
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
      <div className='min-h-screen max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-[80%] w-full'>
          <nav aria-label='Breadcrumb' className='mt-6 max-w-[1300px] w-full mx-auto px-4'>
            <ol className='flex items-center space-x-2 text-sm text-gray-500'>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className='flex items-center'>
                  {index > 0 && (
                    <svg
                      className='h-5 w-5 flex-shrink-0 text-gray-300'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                    </svg>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <a href={crumb.href} className='hover:text-gray-700 hover:underline'>
                      {crumb.name}
                    </a>
                  ) : (
                    <span className='ml-2 font-semibold text-gray-700'>{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className='bg-white text-gray-800 font-sans leading-relaxed'>
            <main className='max-w-[1300px] w-full mx-auto px-4 py-5'>
              <h1 className='text-2xl text-[#464646] font-bold mt-2'>{blogData.title}</h1>
              <div className='mb-2 mt-1 flex flex-wrap items-center gap-2'>
                {blogData.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    onClick={() => {
                      handleSearch(tag.name)
                    }}
                    className='cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-300'
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h3 className='text-xl mb-4'>{blogData.description}</h3>
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
        </div>
        <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
          <TabBlogCategory />
        </aside>
      </div>
    </HandleLoading>
  )
}

export default BlogDetailPage
