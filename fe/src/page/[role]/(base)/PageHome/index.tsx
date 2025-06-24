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
            className={styles.featureIconRt1}
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
        <div className={styles.featureWrapper}>
          <img
            className={styles.featureIconTime}
            data-bb-lazy='true'
            loading='lazy'
            src='https://khoahocgiasieure.com/storage/time.png'
            alt='Kích hoạt nhanh chóng'
          />
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>Kích hoạt nhanh chóng</h3>
            <p>Nhận khoá học qua email trong vòng 30s</p>
          </div>
        </div>
        <div className={styles.featureWrapper}>
          <img
            className={styles.featureIconRt1}
            data-bb-lazy='true'
            loading='lazy'
            src='https://khoahocgiasieure.com/storage/rt3.png'
            alt='Mua hàng tiết kiệm'
          />
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>Mua hàng tiết kiệm</h3>
            <p>Khóa học với giá rẻ nhất thị trường hiện nay</p>
          </div>
        </div>
        <div className={styles.featureWrapper}>
          <img
            className={styles.featureIconRt1}
            data-bb-lazy='true'
            loading='lazy'
            src='https://khoahocgiasieure.com/storage/rt4.png'
            alt='Hỗ trợ trực tuyến'
          />
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>Hỗ trợ trực tuyến</h3>
            <p>Liên hệ fanpage để được hỗ trợ ngay </p>
          </div>
        </div>
      </div>

      <div className={styles.title}>
        <h1>Danh Mục Nổi Bật</h1>
      </div>

      <div className={styles.categories}>
        <div className={styles.categoryBox}>
          <div className={styles.categoryIconBox}>
            <a href='https://khoahocgiasieure.com/tat-ca-khoa-hoc' title='Tất Cả Khóa Học'>
              <img
                className={styles.categoryIcon}
                data-bb-lazy='true'
                loading='lazy'
                src='https://khoahocgiasieure.com/storage/transparent-stack-of-books-stack-of-books-with-coffee-and-1711055827221.jpg'
                alt='Tất Cả Khóa Học'
              />
            </a>
          </div>
          <div className={styles.categoryContent}>
            <h3 className={styles.categoryTitle}>
              <a href='https://khoahocgiasieure.com/tat-ca-khoa-hoc' title='Tất Cả Khóa Học'>
                Tất Cả Khóa Học
              </a>
            </h3>
            <p>217 khoá học</p>
          </div>
        </div>
        <div className={styles.categoryBox}>
          <div className={styles.categoryIconBox}>
            <a href='https://khoahocgiasieure.com/combo-tiet-kiem' title='Combo Giá Rẻ'>
              <img
                className={styles.categoryIcon}
                data-bb-lazy='true'
                loading='lazy'
                src='https://khoahocgiasieure.com/storage/poster-giam-gia-1.jpg'
                alt='Combo Giá Rẻ'
              />
            </a>
          </div>
          <div className={styles.categoryContent}>
            <h3 className={styles.categoryTitle}>
              <a href='https://khoahocgiasieure.com/combo-tiet-kiem' title='Combo Giá Rẻ'>
                Combo Giá Rẻ
              </a>
            </h3>
            <p>15 khoá học</p>
          </div>
        </div>
        <div className={styles.categoryBox}>
          <div className={styles.categoryIconBox}>
            <a href='https://khoahocgiasieure.com/khoa-hoc-lap-trinh-cntt' title='Khóa Học Lập Trình'>
              <img
                className={styles.categoryIcon}
                data-bb-lazy='true'
                loading='lazy'
                src='https://khoahocgiasieure.com/storage/68747470733a2f2f70726f6d7074692e61692f77702d636f6e74656e742f75706c6f6164732f323032332f30372f7063626f.jpg'
                alt='Khóa Học Lập Trình'
              />
            </a>
          </div>
          <div className={styles.categoryContent}>
            <h3 className={styles.categoryTitle}>
              <a href='https://khoahocgiasieure.com/khoa-hoc-lap-trinh-cntt' title='Khóa Học Lập Trình'>
                Khóa Học Lập Trình
              </a>
            </h3>
            <p>126 khoá học</p>
          </div>
        </div>
        <div className={styles.categoryBox}>
          <div className={styles.categoryIconBox}>
            <a href='https://khoahocgiasieure.com/khoa-hoc-thiet-ke-do-hoa' title='Thiết Kế Đồ Họa'>
              <img
                className={styles.categoryIcon}
                data-bb-lazy='true'
                loading='lazy'
                src='https://khoahocgiasieure.com/storage/1-pdd6bennjngqoaoql6spwq.jpg'
                alt='Thiết Kế Đồ Họa'
              />
            </a>
          </div>
          <div className={styles.categoryContent}>
            <h3 className={styles.categoryTitle}>
              <a href='https://khoahocgiasieure.com/khoa-hoc-thiet-ke-do-hoa' title='Thiết Kế Đồ Họa'>
                Thiết Kế Đồ Họa
              </a>
            </h3>
            <p>24 khoá học</p>
          </div>
        </div>
        <div className={styles.categoryBox}>
          <div className={styles.categoryIconBox}>
            <a href='https://khoahocgiasieure.com/am-nhac' title='Âm nhạc'>
              <img
                className={styles.categoryIcon}
                data-bb-lazy='true'
                loading='lazy'
                src='https://khoahocgiasieure.com/storage/amnhac.png'
                alt='Âm nhạc'
              />
            </a>
          </div>
          <div className={styles.categoryContent}>
            <h3 className={styles.categoryTitle}>
              <a href='https://khoahocgiasieure.com/am-nhac' title='Âm nhạc'>
                Âm nhạc
              </a>
            </h3>
            <p>16 khoá học</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHome
