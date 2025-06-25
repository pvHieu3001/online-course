import styles from './styles.module.css'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Cam kết dịch vụ */}
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <img src='/footer/quality.jpg' alt='Uy tín chất lượng' />
            <div>
              <h4>Uy tín chất lượng</h4>
              <p>Hoàn tiền nếu khóa học không như mô tả</p>
            </div>
          </div>
          <div className={styles.featureCard}>
            <img src='/footer/fast.png' alt='Kích hoạt nhanh' />
            <div>
              <h4>Kích hoạt nhanh</h4>
              <p>Kích hoạt khóa học tự động</p>
            </div>
          </div>
          <div className={styles.featureCard}>
            <img src='/footer/update.png' alt='Update liên tục' />
            <div>
              <h4>Update liên tục</h4>
              <p>Cập nhật 7 - 15 khóa học mỗi hàng tuần</p>
            </div>
          </div>
          <div className={styles.featureCard}>
            <img src='/footer/online.jpg' alt='Học online tiện lợi' />
            <div>
              <h4>Học online tiện lợi</h4>
              <p>Học online bằng điện thoại hoặc máy tính</p>
            </div>
          </div>
        </div>

        {/* Footer thông tin */}
        <div className={styles.bottom}>
          <div className={styles.left}>
            <strong>khokhoahoc.org</strong>
            <p>Copyright © 2025 - Chuyên mua bán khóa học giá rẻ</p>
          </div>
          <div className={styles.right}>
            <p>
              SDT (Zalo): <span className={styles.highlight}>0983456789</span>
            </p>
            <p>
              Quy định:{' '}
              <a href='#' className={styles.link}>
                Sử dụng tài khoản
              </a>
            </p>
            <p>
              Email:{' '}
              <a href='mailto:support@sharedocuments.org' className={styles.email}>
                support@haredocuments.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
