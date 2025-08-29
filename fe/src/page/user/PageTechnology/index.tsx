import { useOutletContext } from 'react-router-dom'
import styles from './styles.module.css'
import { useEffect } from 'react'

type ContextType = {
  setIsShowRecommendCourses: (value: boolean) => void
}
function PageTermOfUse() {
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendCourses(false)
  }, [setIsShowRecommendCourses])
  return (
    <div className={styles.bg}>
      <div className={styles.description} id='term-of-use'>
        <div className={styles.description_title}>
          <h1>Điều khoản sử dụng</h1>
        </div>
        <section className={styles.herald_txt}>
          <h2>1. Chấp nhận điều khoản</h2>
          <p>Khi truy cập và sử dụng website, bạn đồng ý tuân thủ các điều khoản dưới đây.</p>
          <h2>2. Quyền và nghĩa vụ của người dùng</h2>
          <p>
            Bạn có quyền truy cập, sử dụng các khoá học miễn phí. Không được sử dụng website cho mục đích vi phạm pháp
            luật hoặc gây ảnh hưởng đến hệ thống.
          </p>
          <h2>3. Quyền và nghĩa vụ của chúng tôi</h2>
          <p>
            Chúng tôi có quyền thay đổi, cập nhật nội dung website mà không cần thông báo trước. Không chịu trách nhiệm
            về nội dung khoá học do bên thứ ba cung cấp.
          </p>
          <h2>4. Bảo mật thông tin</h2>
          <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng theo chính sách bảo mật.</p>
          <h2>5. Liên hệ</h2>
          <p>Nếu có thắc mắc về điều khoản, vui lòng liên hệ qua email: support@ChiaSeKhoaHoc.vn</p>
        </section>
      </div>
    </div>
  )
}

export default PageTermOfUse
