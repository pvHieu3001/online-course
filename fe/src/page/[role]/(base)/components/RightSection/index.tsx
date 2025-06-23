import ProductCardSmall from '../ProductCardSmall'
import StaffCard from '../StaffCard'
import styles from './styles.module.css'
import { FireOutlined } from '@ant-design/icons'

const RightSection = () => {

  return (
    <div className={styles.leftContent}>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <FireOutlined />
                <h1 className={styles.location}>Mới Đăng</h1>
              </div>
              <div className={styles.cardSmallWrapper}>
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
              </div>
            </div>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <FireOutlined />
                <h1 className={styles.location}>Chưa Xem</h1>
              </div>
              <div className={styles.cardSmallWrapper}>
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
                <ProductCardSmall />
              </div>
            </div>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <FireOutlined />
                <h1 className={styles.location}>Staff Online</h1>
              </div>
              <div className={styles.cardSmallWrapper}>
                <StaffCard />
              </div>
            </div>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <FireOutlined />
                <h1 className={styles.location}>Member Online</h1>
              </div>
              <div className={styles.cardSmallWrapper}>
                <span className={styles.member}>anie, </span>
                <span className={styles.vip}>jack, </span>
                <span className={styles.admin}>duck</span>
                <a href='#'> ...more</a>
              </div>
              <div className={styles.summary}>
                <span className='block-footer-counter'>Total:&nbsp;884 (members:&nbsp;53, guests:&nbsp;831)</span>
              </div>
            </div>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <FireOutlined />
                <h1 className={styles.location}>Forum statics</h1>
              </div>
              <div className={styles.forumWrapper}>
                <span className={styles.label}>Threads </span>
                <span>1000</span>
              </div>
              <div className={styles.forumWrapper}>
                <span className={styles.label}>Bài viết</span>
                <span>2000</span>
              </div>
              <div className={styles.forumWrapper}>
                <span className={styles.label}>Thành viên</span>
                <span>600</span>
              </div>
              <div className={styles.forumWrapper}>
                <span className={styles.label}>Thành viên mới nhất</span>
                <span>jack</span>
              </div>
            </div>
          </div>
  )
}

export default RightSection
