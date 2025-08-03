import React from 'react'
import styles from './styles.module.css'

function PagePolicy() {
  return (
    <div className={styles.bg}>
      <div className={styles.description} id='policy'>
        <div className={styles.description_title}>
          <h1>Chính sách sử dụng & bảo mật</h1>
        </div>
        <section className={styles.herald_txt}>
          <h2>1. Chính sách bảo mật</h2>
          <p>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng. Mọi thông tin thu thập chỉ phục vụ cho mục đích
            cải thiện dịch vụ và sẽ không chia sẻ với bên thứ ba.
          </p>
          <h2>2. Điều khoản sử dụng</h2>
          <p>
            Người dùng cần tuân thủ các quy định về sử dụng website, không được thực hiện các hành vi vi phạm pháp luật
            hoặc gây ảnh hưởng đến hệ thống.
          </p>
          <h2>3. Quyền lợi & trách nhiệm</h2>
          <p>
            Người dùng có quyền truy cập và sử dụng các khoá học miễn phí. Chúng tôi không chịu trách nhiệm về nội dung
            khoá học do bên thứ ba cung cấp.
          </p>
          <h2>4. Liên hệ</h2>
          <p>Nếu có thắc mắc về chính sách, vui lòng liên hệ qua email: support@freecoursesite.vn</p>
        </section>
      </div>
    </div>
  )
}

export default PagePolicy
