import React from 'react'
import styles from './styles.module.css'

function PageCopyright() {
  return (
    <div className={styles.bg}>
      <div className={styles.description} id='copyright'>
        <div className={styles.description_title}>
          <h1>Copyrights</h1>
        </div>
        <section className={styles.herald_txt}>
          <h2>Thông báo</h2>
          <p>
            Nếu bạn là chủ sở hữu bản quyền và phát hiện nội dung vi phạm trên website, vui lòng liên hệ để chúng tôi xử
            lý kịp thời.
          </p>
          <h2>Chính sách bản quyền</h2>
          <p>
            Chúng tôi tôn trọng quyền sở hữu trí tuệ và cam kết tuân thủ các quy định về bản quyền. Mọi yêu cầu gỡ bỏ
            nội dung sẽ được xem xét và xử lý nhanh chóng.
          </p>
          <h2>Liên hệ</h2>
          <p>Email: copyright@chiasekhoahoc.vn</p>
        </section>
      </div>
    </div>
  )
}

export default PageCopyright
