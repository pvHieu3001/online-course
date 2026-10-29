import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatDateTimeString, getFullName } from '@/utils/formatDate'
import HandleLoading from '../components/util/HandleLoading'
import LoadingPage from '../components/util/LoadingPage'
import { Helmet } from 'react-helmet-async'
import { getBlogInfoByType } from '@/utils/getBlogInfo'

function BlogDetailPage() {
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()
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

  useEffect(() => {
    if (slug) {
      dispatch(blogActions.resetBlog() as unknown as AnyAction)
      dispatch(blogActions.getBlogBySlug(slug) as unknown as AnyAction)
    }
    setIsShowRecommendBooks(false)
  }, [dispatch, setIsShowRecommendBooks, slug])

  const handleDetail = (slug: string) => {
    navigate(`/blog/${slug}`)
  }

  if (isLoading || !blogData) {
    return <LoadingPage />
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: getBlogInfoByType(blogData?.type).title, href: '/' + getBlogInfoByType(blogData?.type).path },
    { name: blogData?.title, href: `/blog/${slug}` }
  ]

  const handleSearch = (tag: string) => {
    navigate(`/search-blog?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Global Times || {blogData.title}</title>
        <meta
          key='description'
          name='description'
          content={blogData.description || `Read the article ${blogData.title} at Global Times.`}
        />
      </Helmet>
      <div className='min-h-screen max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:justify-center gap-8'>
        <div className='lg:w-[80%] w-full'>
          <nav aria-label='Breadcrumb' className='mt-6 max-w-[1300px] w-full mx-auto px-4'>
            <ol className='text-sm text-gray-900 font-bold leading-relaxed'>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className='inline'>
                  {index > 0 && (
                    <svg
                      className='mx-0.5 inline-block h-3 w-3 align-[-0.15em] text-gray-700'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                    </svg>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <a
                      href={crumb.href}
                      className='break-words [overflow-wrap:anywhere] font-bold text-gray-900 hover:text-black hover:underline'
                    >
                      {crumb.name}
                    </a>
                  ) : (
                    <span className='break-words [overflow-wrap:anywhere] font-bold text-gray-900'>{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className='bg-white text-gray-800 font-sans leading-relaxed'>
            <main className='max-w-[1300px] w-full mx-auto px-4 py-5'>
              <h1 className='text-4xl text-[#464646] font-bold mt-2'>{blogData.title}</h1>
              <div className='mb-1 mt-1 flex flex-wrap items-center gap-2'>
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
              <div className='mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500'>
                <span>
                  Posted by{' '}
                  <strong className='text-gray-700'>
                    {getFullName(blogData.updatedBy?.firstname, blogData.updatedBy?.lastname)}
                  </strong>
                </span>
                <span className='flex items-center gap-2'>
                  <span aria-hidden='true'>·</span>
                  <span>{formatDateTimeString(blogData.updatedAt) || 'Not updated yet'}</span>
                </span>
              </div>
              <p className='mb-6 text-lg leading-relaxed text-gray-600'>{blogData.description}</p>

              <img src={getImageUrl(blogData.image)} alt={blogData.title} className='w-full rounded-lg mb-8 shadow' />

              <article
                className='prose prose-lg max-w-none font-arial
                [&_p]:mb-4 
                [&_p]:text-[17px]
                [&_h1]:text-3xl 
                [&_h2]:text-2xl 
                [&_h3]:text-xl 
                [&_ul]:list-disc 
                [&_ul]:pl-6 
                [&_img]:mx-auto [&_img]:block
                [&_video]:mx-auto [&_video]:block
                [&_iframe]:mx-auto [&_iframe]:block
                [&_a]:text-blue-600 [&_a:hover]:underline text-[17px]'
                dangerouslySetInnerHTML={{ __html: blogData.content || '' }}
              ></article>

              {/* Bài viết liên quan */}
              <section className='mt-16 border-t pt-10'>
                <h3 className='text-xl font-semibold mb-6'>You may also be interested in</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {relatedDatas &&
                    relatedDatas.length > 0 &&
                    relatedDatas.map((post, index) => (
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
      </div>
    </HandleLoading>
  )
}

export default BlogDetailPage
