import styles from './style.module.css'
import { SearchOutlined, UserOutlined, ShoppingCartOutlined} from '@ant-design/icons'

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          Chia sẻ khóa học<span>.ORG</span>
        </div>
      </div>

      <div className={styles.centerSection}>
        <input type='text' placeholder='Nhập tên khóa học hoặc giảng viên...' className={styles.searchInput} />
        <button className={styles.searchButton}>
          <SearchOutlined />
        </button>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.actions}>
          <div className={styles.accountWrapper}>
            <div className={styles.accountIcon}>
              <UserOutlined />
            </div>
            <div>
              <p className={styles.greating}>Xin chào, Quý khách</p>
              <a href='/login' className={styles.bnt}>Đăng Nhập / Đăng Ký</a>
            </div>
          </div>
          <button className={styles.cart}><ShoppingCartOutlined className={styles.icon}/></button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
