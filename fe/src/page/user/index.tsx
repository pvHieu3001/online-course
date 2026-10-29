import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../../utils/ScrollToTop'
import '../../assets/fonts/line-awesome-1.3.0/css/line-awesome.css'
import styles from './styles.module.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

function Base() {
  const [isShowRecommendBooks, setIsShowRecommendBooks] = useState(true)
  return (
    <>
      <div className={styles.modules}>
        <Toaster />
        <ScrollToTop />
        <Header isShowRecommendBooks={isShowRecommendBooks} />
        <main className={styles.container}>
          <Outlet context={{ setIsShowRecommendBooks }} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Base
