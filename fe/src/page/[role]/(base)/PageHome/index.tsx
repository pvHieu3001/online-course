import ProductCard from '../components/ProductCard/index'
import RightSection from '../components/RightSection'
import styles from './styles.module.css'
import { ExclamationOutlined, IdcardOutlined } from '@ant-design/icons'

function PageHome() {
  return (
    <div className={styles.modules}>
      <h1 className={styles.title}>CHUYÊN BÁN MÈO</h1>
      <div className={styles.contentWrapper}>
        <div className={styles.notice}>
          <div className={styles.noticeIcon}>
            <ExclamationOutlined />
          </div>
          <div className={styles.noticeContent}>
            <p>Xác minh ảnh thật cho bánh|| Cách Upload ảnh||</p>
          </div>
        </div>
        <div className={styles.notice}>
          <div className={styles.noticeIcon}>
            <ExclamationOutlined />
          </div>
          <div className={styles.noticeContent}>
            <p>
              THÔNG BÁO: Cách truy cập Telegram,Nicegram không bị chặn, không mất phí{' '}
              <a href='/threads/telegram-bi-chan-o-viet-nam.41120/' title='Chặn telegram'>
                Tại đây
              </a>
            </p>
          </div>
        </div>
        <div className={styles.contentItemList}>
          <div className={styles.leftContent}>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <IdcardOutlined />
                <h1 className={styles.location}>Hải Phòng</h1>
              </div>
              <div className={styles.cardWrapper}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
            <div className={styles.leftContentBox}>
              <div className={styles.locationWrapper}>
                <IdcardOutlined />
                <h1 className={styles.location}>Đà Nẵng</h1>
              </div>
              <div className={styles.cardWrapper}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
          </div>
          <RightSection></RightSection>
        </div>
      </div>
    </div>
  )
}

export default PageHome
