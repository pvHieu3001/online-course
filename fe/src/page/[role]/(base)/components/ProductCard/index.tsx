import clsx from 'clsx'
import styles from './styles.module.css'

const ProductCard = () => {
  return (
    <div className={styles.modules}>
      <div className={styles.imageBox}>
        <img className={styles.image} src="https://github.com/gianValentin/core-java21-springboot3/assets/45782176/91e795b5-cd19-4492-95bd-33f7465dfb31" title="PostgreSql" alt="PostgresSql" width="100px" height="100px"/>
      </div>
      <a className={styles.contents}>
        <span className={clsx(styles.tagItem, styles.tagBlue)}>500k</span>&nbsp;
        <span className={clsx(styles.tagItem, styles.tagRoyalBlue)}>Quang Trung</span>&nbsp;
        <span className={clsx(styles.tagItem, styles.tagBlue)}>Hà Đông</span>
         sâđâsd sadasd sdasd sâđâsd sadasd sdasd sâđâsd sadasd sdasd sâđâsd sadasd sdasd
      </a>
      <a className={styles.forum}>Forum</a>
    </div>
  )
}

export default ProductCard
