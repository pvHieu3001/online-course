import { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/app/store'
import { IBlog } from '@/common/types.interface'
import { useQuery } from '@/utils/useQuery'
import Link from 'antd/es/typography/Link'
import { getImageUrl } from '@/utils/getImageUrl'
import { Helmet } from 'react-helmet-async'
import HandleLoading from '@/page/admin/components/util/HandleLoading'
import TabBlogCategory from '../components/TabBlogCategory'
import { blogActions } from '@/app/actions'
import { getBlogInfoByType } from '@/utils/getBlogInfo'

function PageBlogSearch() {
  const query = useQuery()
  const search = query.get('search') || ''
  const tag = query.get('tag') || ''
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { dataList, isLoading, error_message } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    dispatch(blogActions.getBlogs(search) as unknown as AnyAction)
  }, [dispatch, search, tag])

  const handleDetail = (slug: string) => {
    const course = dataList.find((c: IBlog) => c.slug === slug)
    if (course) {
      navigate(`/bai-viet/${slug}`, { state: course })
    }
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className={styles.bg}>
        <Helmet>
          <title>Học Free || Tìm Kiếm</title>
          <meta
            name='description'
            content='Trang tìm kiếm của Học Free. Tìm kiếm các bài viết, bài giảng và tài liệu học tập miễn phí chất lượng cao về mọi lĩnh vực.'
          />
        </Helmet>
        <main className={styles.mainContent} role='main'>
          <section className={styles.coursesWrapper} aria-label='Course listings'>
            <h2 className={styles.courseListTitle}>Kết quả tìm kiếm</h2>
            <div className={styles.courses}>
              {isLoading && <p>Đang tải bài viết...</p>}
              {!isLoading && error_message && (
                <p className={styles.error}>Đã xảy ra lỗi khi tải bài viết. Vui lòng thử lại sau.</p>
              )}
              {!isLoading && !error_message && dataList?.length === 0 && <p>Không tìm thấy bài viết phù hợp.</p>}
              {!isLoading &&
                !error_message &&
                dataList?.map((blog: IBlog) => (
                  <article
                    className={styles.courseCard}
                    key={blog.id}
                    role='button'
                    tabIndex={0}
                    onClick={() => handleDetail(blog.slug)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDetail(blog.slug)}
                  >
                    <img src={getImageUrl(blog.image)} alt={`${blog.title} course image`} loading='lazy' />
                    <Link className={styles.courseCat}>{getBlogInfoByType(blog.type).title}</Link>
                    <h3 className={styles.courseTitle}>{blog.title}</h3>
                  </article>
                ))}
            </div>
            <div className={styles.breaker}></div>
          </section>
          <aside className='w-full lg:w-[20%] sticky top-4' role='complementary'>
            <TabBlogCategory />
          </aside>
        </main>
      </div>
    </HandleLoading>
  )
}

export default PageBlogSearch
