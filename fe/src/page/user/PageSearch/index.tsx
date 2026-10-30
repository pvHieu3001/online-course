import { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { bookActions } from '@/app/actions/book.actions'
import { useNavigate } from 'react-router-dom'
import TabCategory from '../components/TabCategory'
import { RootState } from '@/app/store'
import { IBook } from '@/common/types.interface'
import { useQuery } from '@/utils/useQuery'
import Link from 'antd/es/typography/Link'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '../components/util/HandleLoading'

function PageSearch() {
  const query = useQuery()
  const search = query.get('search') || query.get('tag') || ''
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { dataList, isLoading, error_message } = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(bookActions.getBooks('active', search) as unknown as AnyAction)
  }, [dispatch, search])

  const handleDetail = (slug: string) => {
    const book = dataList.find((c: IBook) => c.slug === slug)
    if (book) {
      navigate(`/book-detail/${slug}`, { state: book })
    }
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className={styles.bg}>
        <Helmet>
          <title>Global Times || Search</title>
          <meta
            name='description'
            content='Global Times search page. Search for high-quality news, informative articles, and learning materials.'
          />
        </Helmet>
        <main className={styles.mainContent} role='main'>
          <section className={styles.booksWrapper} aria-label='Book listings'>
            <h2 className={styles.bookListTitle}>Search Results</h2>
            <div className={styles.books}>
              {isLoading && <p>Loading books...</p>}
              {!isLoading && error_message && (
                <p className={styles.error}>Error loading books. Please try again later.</p>
              )}
              {!isLoading && !error_message && dataList?.length === 0 && <p>No matching books found.</p>}
              {!isLoading &&
                !error_message &&
                dataList?.map((book: IBook) => (
                  <article
                    className={styles.bookCard}
                    key={book.id}
                    role='button'
                    tabIndex={0}
                    onClick={() => handleDetail(book.slug)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDetail(book.slug)}
                  >
                    <img src={getImageUrl(book.imageUrl)} alt={`${book.name} book image`} loading='lazy' />
                    <Link className={styles.bookCat}>{book.category?.name}</Link>
                    <h3 className={styles.bookTitle}>{book.name}</h3>
                  </article>
                ))}
            </div>
            <div className={styles.breaker}></div>
          </section>
          <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
            <TabCategory />
          </aside>
        </main>
      </div>
    </HandleLoading>
  )
}

export default PageSearch
