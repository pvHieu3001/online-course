import { useNavigate, useParams } from 'react-router-dom'
import TabCategory from '../components/TabCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '../components/util/HandleLoading'

function ProductDetailPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const {
    dataList: relatedCourses,
    data: course,
    isLoading,
    error_message
  } = useSelector((state: RootState) => state.course)
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      dispatch(courseActions.resetCourse() as unknown as AnyAction)
      dispatch(courseActions.getCourseBySlug(slug) as unknown as AnyAction)
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (course && course.category?.id) {
      dispatch(courseActions.getCoursesByCategory(course.category.id) as unknown as AnyAction)
    }
  }, [course, dispatch])

  const handleDetail = (courseRelate: IProduct) => {
    navigate(`/chi-tiet-khoa-hoc/${courseRelate.slug}`)
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/tat-ca-khoa-hoc' },
    { name: course?.name, href: `/chi-tiet-khoa-hoc/${slug}` }
  ]

  const handleSearch = (tag: string) => {
    navigate(`/tim-kiem?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='min-h-screen max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8'>
        <Helmet>
          <title>Global Times || {course?.name ?? ''} </title>
          <meta
            key='description'
            name='description'
            content={`Read details about ${course?.name} at Global Times. Stay tuned for expert insights and knowledge.`}
          />
        </Helmet>
        <div className='lg:w-[80%] w-full'>
          <nav aria-label='Breadcrumb' className='mt-6'>
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
          {course ? (
            <>
              <header className='mt-8'>
                <p className='text-sm uppercase tracking-wide text-[#008000]'>
                  {course.category?.name || 'Undefined category'}
                </p>
                <h1 className='text-2xl text-[#464646] font-bold mt-2'>{course.name || 'Course name unavailable'}</h1>
              </header>
              <div className='mt-4 flex flex-wrap items-center gap-2'>
                {course.tags?.map((tag) => (
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
              <section className='mt-8'>
                <img
                  src={getImageUrl(course.imageUrl)}
                  alt={course.name || 'Course Image'}
                  className='rounded-lg shadow-md w-full max-w-sm h-48 object-cover'
                />
              </section>

              <section className='mt-10'>
                <h2 className='text-xl text-[#464646] font-arial mb-4'>Introduction</h2>
                {course.content ? (
                  <div
                    className='text-xl leading-8 text-gray-800 font-arial
                [&_p]:mb-4 
                [&_p]:text-base
                [&_h1]:text-3xl 
                [&_h2]:text-2xl 
                [&_h3]:text-xl 
                [&_ul]:list-disc 
                [&_ul]:pl-6 
                [&_a]:text-blue-600 [&_a:hover]:underline text-base'
                    dangerouslySetInnerHTML={{ __html: course.content }}
                  />
                ) : (
                  <p className='text-gray-500 italic'>Content is being updated.</p>
                )}
              </section>

              <section className='mt-10 text-center'>
                <h2 className='text-xl text-[#464646] font-arial mb-4'>Download link</h2>
                {course.urls && course.urls.length > 0 ? (
                  <div className='flex flex-row justify-center items-center  gap-4'>
                    {[...course.urls]
                      .sort((a, b) => a.seqNo - b.seqNo)
                      .map((urlItem, index) => (
                        <a
                          key={urlItem.id || index}
                          href={urlItem.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-arial hover:bg-blue-700 transition max-w-md'
                        >
                          Download Part {urlItem.seqNo || index + 1}
                        </a>
                      ))}
                  </div>
                ) : (
                  <p className='text-gray-400 italic'>Document is not ready for download.</p>
                )}
              </section>

              <section className='max-w-7xl mx-auto mt-16 px-4'>
                <h2 className='text-lg font-semibold bg-gray-100 text-gray-800 inline-block px-4 py-2 rounded-t-md shadow'>
                  You May Also Like
                </h2>
                <div className='border-t border-gray-300 mt-2 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {relatedCourses && relatedCourses.length > 0 ? (
                    relatedCourses.slice(0, 3).map((related, index) => (
                      <div
                        key={index}
                        onClick={() => handleDetail(related)}
                        className='relative group rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl'
                        style={{
                          backgroundImage: `url(${getImageUrl(related.imageUrl)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '220px'
                        }}
                      >
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10' />
                        <div className='absolute inset-0 z-20 flex flex-col justify-between p-4 text-white'>
                          <span className='bg-sky-500 text-[10px] font-semibold px-2 py-1 rounded uppercase self-start'>
                            {related.category?.name || 'Undefined'}
                          </span>
                          <h3 className='text-sm sm:text-base font-semibold leading-snug line-clamp-2'>
                            {related.name || 'Course name not available'}
                          </h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500 col-span-full italic'>No related courses yet.</p>
                  )}
                </div>
              </section>

              <section className='max-w-4xl mx-auto mt-10 px-4 text-center'></section>
            </>
          ) : (
            <div className='text-center py-12 text-gray-500'>Course information not found.</div>
          )}
        </div>

        <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
          <TabCategory />
        </aside>
      </div>
    </HandleLoading>
  )
}

export default ProductDetailPage
