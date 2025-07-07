import { Carousel } from 'antd'
import ProductCard from '../components/ProductCard/index'
import RightSection from '../components/RightSection'
import styles from './styles.module.css'

function PageAllProduct() {
  return (
    <div className={styles.modules}>
      <div className={styles.topModule}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Danh Mục Khóa Học</h1>
          <div className={styles.menu}>
            <div className={styles.menuItem}>
              <span>Combo giá rẻ</span>
            </div>
            <div className={styles.menuItem}>
              <span>Khóa Học Lập Trình</span>
            </div>
            <div className={styles.menuItem}>
              <span>Thiết Kế Đồ Họa</span>
            </div>
            <div className={styles.menuItem}>
              <span>Ngoại Ngữ</span>
            </div>
            <div className={styles.menuItem}>
              <span>Tin Học Văn Phòng</span>
            </div>
            <div className={styles.menuItem}>
              <span>Kỹ Năng Mềm</span>
            </div>
            <div className={styles.menuItem}>
              <span>Tiktok-Facebook-Youtube</span>
            </div>
            <div className={styles.menuItem}>
              <span>Đầu Tư Kinh Doanh</span>
            </div>
            <div className={styles.menuItem}>
              <span>Âm Nhạc</span>
            </div>
            <div className={styles.menuItem}>
              <span>Kiếm Tiền</span>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <h1 className={styles.title}>Top Khóa Học Mới Nhất</h1>
              <Carousel className={styles.contentStyle} autoplay autoplaySpeed={5000}>
                <div>
                  <h3 className={styles.contentStyle1}>1</h3>
                </div>
                <div>
                  <h3 className={styles.contentStyle1}>2</h3>
                </div>
                <div>
                  <h3 className={styles.contentStyle1}>3</h3>
                </div>
                <div>
                  <h3 className={styles.contentStyle1}>4</h3>
                </div>
              </Carousel>
        </div>
      </div>
      

      <div className={styles.cardtitle}>
        <h1>Sản Phẩm Nổi Bật</h1>
      </div>
      <div className={styles.cardWrapper}>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </div>
  )
}

export default PageAllProduct
