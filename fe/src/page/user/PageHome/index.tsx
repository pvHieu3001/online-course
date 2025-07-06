import ProductCard from '../components/ProductCard/index'
import SEOComponent from '../../../components/SEO/SEOComponent'
import styles from './styles.module.css'

function PageHome() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Đồ Gỗ Hiệp Hồng",
    "url": "https://dogohiephong.com",
    "description": "Thương hiệu đồ gỗ Việt Nam uy tín, chất lượng cao",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dogohiephong.com/search?keyword={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEOComponent 
        title="Đồ Gỗ Hiệp Hồng - Thương Hiệu Đồ Gỗ Việt Nam Chất Lượng Cao"
        description="Đồ Gỗ Hiệp Hồng - Thương hiệu đồ gỗ Việt Nam uy tín, chất lượng cao. Chuyên cung cấp đồ gỗ nội thất, đồ gỗ mỹ nghệ, đồ gỗ công nghiệp với giá tốt nhất."
        keywords="đồ gỗ, nội thất, đồ gỗ việt nam, đồ gỗ hiệp hồng, đồ gỗ mỹ nghệ, đồ gỗ công nghiệp, bàn ghế gỗ, tủ gỗ, giường gỗ"
        url="/"
        structuredData={structuredData}
      />
      
      <main className={styles.modules}>
        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>Sản Phẩm Đồ Gỗ Chất Lượng Cao</h1>
          <p className={styles.subtitle}>Khám phá bộ sưu tập đồ gỗ nội thất đẹp, chất lượng cao từ thương hiệu Đồ Gỗ Hiệp Hồng</p>
        </section>
        
        <section className={styles.cardWrapper} aria-label="Danh sách sản phẩm">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </section>
      </main>
    </>
  )
}

export default PageHome
