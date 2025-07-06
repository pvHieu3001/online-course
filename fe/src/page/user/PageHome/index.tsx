import ProductCard from '../components/ProductCard/index'
import styles from './styles.module.css'

function PageHome() {
  return (
    <div className={styles.modules}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Loại khóa học</h1>
      </div>
      <div className={styles.cardWrapper}>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </div>
  )
}

export default PageHome
