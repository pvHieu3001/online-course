import styles from './styles.module.css'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Footer thông tin */}
        <div className={styles.copyrightBar}>
          Copyright © 2025. Created by &nbsp;
          <a
            href='https://hocfree.vn'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.copyrightLink}
          >
            hocfree.vn
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Footer
