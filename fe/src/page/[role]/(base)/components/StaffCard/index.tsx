import styles from './styles.module.css'

const StaffCard = () => {
  return (
    <div className={styles.modules}>
      <div className={styles.imageBox}>
        <a href='/threads/' title='' className={styles.image}>
          <img
            src='https://github.com/gianValentin/core-java21-springboot3/assets/45782176/91e795b5-cd19-4492-95bd-33f7465dfb31'
            title='PostgreSql'
            alt='PostgresSql'
            width='48px'
            height='48px'
          />
        </a>
      </div>

      <div className={styles.contents}>
        <div className={styles.moreInfo}>
          <span>YouandI</span>
        </div>
        <div className={styles.forum}>
          <span>Administrator</span>
        </div>
      </div>
    </div>
  )
}

export default StaffCard
