import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TabCategory from '../components/TabCategory'
import { bookActions, categoryActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IBook } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '../components/util/HandleLoading'
import LoadingPage from '../components/util/LoadingPage'

function CategoryDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(15)

  const {
    dataList: books,
    isLoading: booksLoading,
    error_message: bookError
  } = useSelector((state: RootState) => state.book)
  const { data: category, isLoading: categoryLoading } = useSelector((state: RootState) => state.category)

  useEffect(() => {
    if (slug) {
      dispatch(categoryActions.resetCategory() as unknown as AnyAction)
      dispatch(categoryActions.getCategoryBySlug(slug) as unknown as AnyAction)
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (category && category.id) {
      dispatch(bookActions.getBooksByCategory(category.id) as unknown as AnyAction)
    }
  }, [category, dispatch])

  const handleBookClick = (book: IBook) => {
    navigate(`/book-detail/${book.slug}`)
  }

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books ? books.slice(indexOfFirstBook, indexOfLastBook) : []
  const totalPages = books ? Math.ceil(books.length / booksPerPage) : 0

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 15

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }
  if (categoryLoading || !category) {
    return <LoadingPage />
  }

  return (
    <HandleLoading isLoading={booksLoading} error_message={bookError}>
      <div className='bg-gray-100 py-8 min-h-screen px-4'>
        <Helmet>
          <title>Global Times || {category.name}</title>
          <meta
            name='description'
            content={`Discover informative resources about ${category.name} on Global Times — read from basic to advanced, suitable for all types of readers.`}
          />
        </Helmet>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='flex-1 bg-white rounded-lg shadow-md p-6'>
              <div>
                <div className='text-xl font-semibold text-indigo-600 mb-2'>Books - {category.name}</div>
                <p className='text-gray-700 mb-6 text-base'>{category.description}</p>
              </div>

              {currentBooks && currentBooks.length > 0 ? (
                <div>
                  <div className='flex flex-col gap-6 mb-6'>
                    {currentBooks.map((book) => {
                      const stripHtml = (html: string) => {
                        const tmp = document.createElement('div')
                        tmp.innerHTML = html
                        return tmp.textContent || tmp.innerText || ''
                      }

                      const shortDescription = book.description ? stripHtml(book.description).slice(0, 200) : ''
                      return (
                        <div
                          key={book.id}
                          onClick={() => handleBookClick(book)}
                          className='cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm p-4 transition flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4'
                        >
                          <img
                            src={getImageUrl(book.imageUrl)}
                            alt={book.name}
                            className='w-100 h-40 object-cover rounded-md flex-shrink-0'
                          />
                          <div className='w-full'>
                            <div className='text-sm text-indigo-500 font-medium'>{category.name}</div>
                            <div className='text-lg font-semibold text-gray-800'>{book.name}</div>
                            <div
                              dangerouslySetInnerHTML={{ __html: shortDescription }}
                              className='text-gray-600 text-base mt-1 [&_p]:mb-4 
                                [&_p]:text-xl
                                [&_h1]:text-4xl 
                                [&_h2]:text-3xl 
                                [&_h3]:text-2xl 
                                [&_ul]:list-disc 
                                [&_ul]:pl-6 
                                [&_a]:text-blue-600 [&_a:hover]:underline'
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className='flex justify-center items-center space-x-2'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50'
                      >
                        Previous
                      </button>

                      {getPageNumbers().map((pageNumber, index) => (
                        <button
                          key={index}
                          onClick={() => (typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null)}
                          disabled={pageNumber === '...'}
                          className={`px-3 py-1 border rounded ${
                            pageNumber === currentPage ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-100'
                          } ${pageNumber === '...' ? 'cursor-default text-gray-400' : ''}`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50'
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className='text-center text-gray-500'>No books found</div>
              )}
            </div>

            <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
              <TabCategory />
            </aside>
          </div>
        </div>
      </div>
    </HandleLoading>
  )
}

export default CategoryDetailPage
