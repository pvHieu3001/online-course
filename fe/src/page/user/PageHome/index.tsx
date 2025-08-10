import { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useNavigate } from 'react-router-dom'
import TabCategory from '../TabCategory'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { useQuery } from '@/utils/useQuery'
import Description from './Description'

function PageHome() {
  const query = useQuery()
  const search = query.get('search') || ''
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { dataList, isLoading, error_message } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(courseActions.getCourses('active', search, false) as unknown as AnyAction)
  }, [search])

  const handleDetail = (slug: string) => {
    const course = dataList.find((c: IProduct) => c.slug === slug)
    if (course) {
      navigate(`/chi-tiet-khoa-hoc/${slug}`, { state: course })
    }
  }

  const getImageUrl = (url: string): string => {
    const domain = import.meta.env.VITE_DOMAIN_URL
    return url.startsWith('/') ? `${domain}${url}` : `${domain}/${url}`
  }

  return (
    <div className={styles.bg}>
      <main className={styles.mainContent} role='main'>
        <section className={styles.courses} aria-label='Course listings'>
          {isLoading && <p>Đang tải khóa học...</p>}

          {!isLoading && error_message && (
            <p className={styles.error}>Đã xảy ra lỗi khi tải khóa học. Vui lòng thử lại sau.</p>
          )}

          {!isLoading && !error_message && dataList?.length === 0 && <p>Không tìm thấy khóa học phù hợp.</p>}

          {!isLoading &&
            !error_message &&
            dataList?.map((course: IProduct) => (
              <article
                className={styles.courseCard}
                key={course.slug}
                role='button'
                tabIndex={0}
                onClick={() => handleDetail(course.slug)}
                onKeyDown={(e) => e.key === 'Enter' && handleDetail(course.slug)}
              >
                <img src={getImageUrl(course.imageUrl)} alt={`${course.name} course image`} loading='lazy' />
                <div className={styles.courseCat}>{course.categoryId}</div>
                <h3 className={styles.courseTitle}>{course.name}</h3>
              </article>
            ))}
        </section>

        <TabCategory />
      </main>

      {/* PHẦN GIỚI THIỆU */}
      <Description />
    </div>
  )
}

export default PageHome
