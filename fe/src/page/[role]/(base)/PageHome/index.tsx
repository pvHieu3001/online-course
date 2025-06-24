import ProductCard from '../components/ProductCard/index'
import RightSection from '../components/RightSection'
import styles from './styles.module.css'
import { ExclamationOutlined, IdcardOutlined } from '@ant-design/icons'

function PageHome() {
  return (
    <div className={styles.modules}>
      <div className={styles.title}>
        <h1>Chia Sẻ Khóa Học Drive</h1>
        <p>
          Khoá Học Sinh Viên là website hàng đầu về chia sẻ khoá học online được học qua Google Drive. Mọi khoá học mua
          tại đây sẽ được học vĩnh viễn, luôn có đội ngũ hỗ trợ 24/7.
        </p>
      </div>
      <div className={styles.feature}>
        <div className={styles.featureWrapper}>
          <img
            className={styles.featureIcon}
            data-bb-lazy='true'
            loading='lazy'
            src='https://khoahocgiasieure.com/storage/rt1.png'
            alt='Uy tín chất lượng'
          />
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>Uy tín chất lượng</h3>
            <p>Hoàn tiền nếu như khoá học không như mô tả</p>
          </div>
        </div>
        <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
          <div className='tp-feature-item d-flex align-items-center'>
            <div className='tp-feature-icon mr-15'>
              <span>
                <img
                  data-bb-lazy='true'
                  loading='lazy'
                  src='https://khoahocgiasieure.com/storage/time.png'
                  alt='Kích hoạt nhanh chóng'
                />
              </span>
            </div>
            <div className='tp-feature-content'>
              <h3 className='tp-feature-title'>Kích hoạt nhanh chóng</h3>
              <p>Nhận khoá học qua email trong vòng 30s</p>
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
          <div className='tp-feature-item d-flex align-items-center'>
            <div className='tp-feature-icon mr-15'>
              <span>
                <img
                  data-bb-lazy='true'
                  loading='lazy'
                  src='https://khoahocgiasieure.com/storage/rt3.png'
                  alt='Mua hàng tiết kiệm'
                />
              </span>
            </div>
            <div className='tp-feature-content'>
              <h3 className='tp-feature-title'>Mua hàng tiết kiệm</h3>
              <p>Khóa học với giá rẻ nhất thị trường hiện nay</p>
            </div>
          </div>
        </div>
        <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
          <div className='tp-feature-item d-flex align-items-center'>
            <div className='tp-feature-icon mr-15'>
              <span>
                <img
                  data-bb-lazy='true'
                  loading='lazy'
                  src='https://khoahocgiasieure.com/storage/rt4.png'
                  alt='Hỗ trợ trực tuyến'
                />
              </span>
            </div>
            <div className='tp-feature-content'>
              <h3 className='tp-feature-title'>Hỗ trợ trực tuyến</h3>
              <p>Liên hệ fanpage để được hỗ trợ ngay </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHome
