import { useNavigate, useParams } from 'react-router-dom'
import TabCategory from '../../components/TabCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { bookActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IBook } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '../../components/util/HandleLoading'

function BookDetailPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { dataList: relatedBooks, data: book, isLoading, error_message } = useSelector((state: RootState) => state.book)
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      dispatch(bookActions.resetBook() as unknown as AnyAction)
      dispatch(bookActions.getBookBySlug(slug) as unknown as AnyAction)
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (book && book.category?.id) {
      dispatch(bookActions.getBooksByCategory(book.category.id) as unknown as AnyAction)
    }
  }, [book, dispatch])

  const handleDetail = (bookRelate: IBook) => {
    navigate(`/book-detail/${bookRelate.slug}`)
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: book?.name, href: `/book-detail/${slug}` }
  ]

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='min-h-screen max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:justify-center gap-8'>
        <Helmet>
          <title>Global Times || {book?.name ?? ''} </title>
          <meta
            key='description'
            name='description'
            content={book?.description || `Read details about ${book?.name} at Global Times.`}
          />
        </Helmet>
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
          {book ? (
            <>
              <main className='max-w-[1300px] w-full mx-auto px-4 py-5 text-gray-800 font-sans leading-relaxed'>
                <header className='mt-2 grid grid-cols-1 items-center gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8'>
                  <img
                    src={getImageUrl(book.imageUrl)}
                    alt={book.name || 'Book cover'}
                    className='mx-auto aspect-[2/3] w-full max-w-[220px] rounded-lg object-cover shadow md:mx-0'
                  />
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-gray-600'>{book.category?.name || 'Undefined category'}</p>
                    <h1 className='mt-2 text-3xl font-bold text-[#464646]'>{book.name || 'Book name unavailable'}</h1>
                    {book.description && (
                      <p className='mt-3 max-w-3xl text-lg leading-relaxed text-gray-600'>{book.description}</p>
                    )}
                  </div>
                </header>

                <section className='mt-10'>
                  <h2 className='text-2xl text-[#464646] font-semibold mb-4'>Introduction</h2>
                  {book.content ? (
                    <div
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
                      dangerouslySetInnerHTML={{ __html: book.content }}
                    />
                  ) : (
                    <p className='text-gray-500 italic'>Content is being updated.</p>
                  )}
                </section>

                <section className='mt-16 border-t pt-10 text-center'>
                  {book.amzUrl ? (
                    <button
                      type='button'
                      onClick={() => window.open(book.amzUrl, '_blank', 'noopener,noreferrer')}
                      className='inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-arial hover:bg-blue-700 transition max-w-md'
                    >
                      Read This Book
                    </button>
                  ) : (
                    <p className='text-gray-400 italic'>No book link is available yet.</p>
                  )}
                </section>

                <section className='mt-16 border-t pt-10'>
                  <h2 className='text-xl font-semibold mb-6'>You May Also Like</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {relatedBooks && relatedBooks.length > 0 ? (
                      relatedBooks.slice(0, 3).map((related, index) => (
                        <div
                          key={index}
                          onClick={() => handleDetail(related)}
                          className='border rounded p-4 hover:shadow transition-shadow h-full flex flex-col cursor-pointer'
                        >
                          <img
                            src={getImageUrl(related.imageUrl)}
                            alt={related.name || 'Related book'}
                            className='w-full h-40 object-cover rounded mb-3'
                          />
                          <p className='text-sm text-gray-500 mb-1'>{related.category?.name || 'Undefined'}</p>
                          <h3 className='text-lg font-medium'>{related.name || 'Book name not available'}</h3>
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500 col-span-full italic'>No related books yet.</p>
                    )}
                  </div>
                </section>
              </main>
            </>
          ) : (
            <div className='text-center py-12 text-gray-500'>Book information not found.</div>
          )}
        </div>

        <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
          <TabCategory />
        </aside>
      </div>
    </HandleLoading>
  )
}

export default BookDetailPage
