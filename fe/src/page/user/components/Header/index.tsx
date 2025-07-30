import styles from './styles.module.css'

const Header = () => {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={styles.bg}>
      <div className={styles.topbar} role='banner'>
        <span className={styles.date} aria-label='Current date'>
          {dateStr}
        </span>
      </div>

      <div className={styles.bannerWrapper}>
        <header className={styles.banner} role='banner'>
          <img src='/logo.png' alt='FCS Logo' className={styles.logo} />
          <span className={styles.slogan}>
            BEING <span className={styles.smart}>SMART</span> IS GREAT
          </span>
        </header>
      </div>

      <div className={styles.menuWrapper}>
        <nav className={styles.menu} role='navigation' aria-label='Main navigation'>
          <a className={styles.active} href='#' aria-current='page'>
            HOME
          </a>
          <a href='#'>100% OFF UDEMY COUPON</a>
          <a href='#'>ALL COURSES</a>
          <a href='#'>GAMES</a>
          <a href='#'>TERMS OF USE</a>
          <a href='#'>PRIVACY POLICY</a>
          <a href='#'>DMCA COPYRIGHTS</a>
        </nav>
      </div>
    </div>
  )
}

export default Header
