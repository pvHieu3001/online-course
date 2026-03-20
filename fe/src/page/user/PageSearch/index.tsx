import { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useNavigate } from 'react-router-dom'
import TabCategory from '../components/TabCategory'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { useQuery } from '@/utils/useQuery'
import Link from 'antd/es/typography/Link'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '@/page/admin/components/util/HandleLoading'

function PageSearch() {
  const query = useQuery()
  const search = query.get('search') || ''
  const tag = query.get('tag') || ''
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { dataList, isLoading, error_message } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(courseActions.getCourses('active', search, '', undefined, undefined, tag) as unknown as AnyAction)
  }, [dispatch, search, tag])

  const handleDetail = (slug: string) => {
    const course = dataList.find((c: IProduct) => c.slug === slug)
    if (course) {
      navigate(`/chi-tiet-khoa-hoc/${slug}`, { state: course })
    }
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className={styles.bg}>
        <Helmet>
          <title>Hocfree || Search</title>
          <meta
            name='description'
            content='Hocfree search page. Search for high-quality free courses, lectures, and learning materials in all fields.'
          />
        </Helmet>
        <main className={styles.mainContent} role='main'>
          <section className={styles.coursesWrapper} aria-label='Course listings'>
            <h2 className={styles.courseListTitle}>Search Results</h2>
            <div className={styles.courses}>
              {isLoading && <p>Loading courses...</p>}
              {!isLoading && error_message && (
                <p className={styles.error}>Error loading courses. Please try again later.</p>
              )}
              {!isLoading && !error_message && dataList?.length === 0 && <p>No matching courses found.</p>}
              {!isLoading &&
                !error_message &&
                dataList?.map((course: IProduct) => (
                  <article
                    className={styles.courseCard}
                    key={course.id}
                    role='button'
                    tabIndex={0}
                    onClick={() => handleDetail(course.slug)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDetail(course.slug)}
                  >
                    <img src={getImageUrl(course.imageUrl)} alt={`${course.name} course image`} loading='lazy' />
                    <Link className={styles.courseCat}>{course.category?.name}</Link>
                    <h3 className={styles.courseTitle}>{course.name}</h3>
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
