import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../../utils/ScrollToTop'
import '../../assets/fonts/line-awesome-1.3.0/css/line-awesome.css'
import styles from './styles.module.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

function Base() {
  const [isShowRecommendCourses, setIsShowRecommendCourses] = useState(true)
  return (
    <>
      <div className={styles.modules}>
        <Toaster />
        <ScrollToTop />
        <main className={styles.container}>
          <Header isShowRecommendCourses={isShowRecommendCourses} />
          <Outlet context={{ setIsShowRecommendCourses }} />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Base
