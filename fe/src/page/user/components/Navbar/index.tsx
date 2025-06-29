import styles from './style.module.css'

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
        <button className={styles.searchButton}>🔍</button>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.actions}>
          <button className={styles.login}>Đăng Nhập</button>
          <button className={styles.cart}>🛒</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
