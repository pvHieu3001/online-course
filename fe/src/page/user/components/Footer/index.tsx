import styles from './styles.module.css'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Footer thông tin */}
        <div className={styles.copyrightBar}>
          Copyright © 2025. Created by
          <a
            href='https://freecoursesites.com'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.copyrightLink}
          >
            Free Course Sites
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Footer
