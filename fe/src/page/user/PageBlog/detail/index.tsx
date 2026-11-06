import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatDateTimeString, getFullName } from '@/utils/formatDate'
import HandleLoading from '../../components/util/HandleLoading'
import HtmlContent from '@/page/shared/HtmlContent'
import LoadingPage from '../../components/util/LoadingPage'
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
    { name: getBlogInfoByType(blogData?.type).title, href: '/blogs/' + getBlogInfoByType(blogData?.type).path },
    { name: blogData?.title, href: `/blog/${slug}` }
  ]

  const handleSearch = (tag: string) => {
    navigate(`/search-blog?tag=${encodeURIComponent(tag)}`)
  }

  const publishedAt = blogData.createdAt || blogData.updatedAt

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Wise Owl News || {blogData.title}</title>
        <meta
          key='description'
          name='description'
          content={blogData.description || `Read the article ${blogData.title} at Wise Owl News.`}
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
            <main className='mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10'>
              <header className='mb-8 max-w-4xl'>
                <p className='mb-3 text-sm font-bold uppercase tracking-[0.14em] text-blue-700'>
                  {getBlogInfoByType(blogData.type).title}
                </p>
                <h1 className='mb-5 break-words text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl'>
                  {blogData.title}
                </h1>
                {blogData.description && (
                  <p className='text-lg leading-relaxed text-gray-600 sm:text-xl'>{blogData.description}</p>
                )}
                <div className='mb-5 flex flex-wrap items-center gap-2'>
                  {blogData.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      onClick={() => {
                        handleSearch(tag.name)
                      }}
                      className='cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:bg-gray-200'
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-200 py-3 text-sm text-gray-500'>
                  <span>
                    By{' '}
                    <strong className='font-semibold text-gray-800'>
                      {getFullName(blogData.updatedBy?.firstname, blogData.updatedBy?.lastname)}
                    </strong>
                  </span>
                  <span aria-hidden='true' className='text-gray-300'>
                    |
                  </span>
                  <time dateTime={publishedAt} className='font-medium text-gray-600'>
                    Published {publishedAt ? formatDateTimeString(publishedAt) : 'date unavailable'}
                  </time>
                </div>
              </header>

              {blogData.showFeaturedImage !== false && (
                <figure className='mb-10 overflow-hidden rounded-2xl bg-gray-100 shadow-lg'>
                  <img
                    src={getImageUrl(blogData.image)}
                    alt={blogData.title}
                    className='aspect-[4/3] w-full object-cover object-center sm:aspect-[16/9]'
                    fetchPriority='high'
                  />
                </figure>
              )}

              <HtmlContent as='article' content={blogData.content} enableReadMore />

              {/* Related Articles */}
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
