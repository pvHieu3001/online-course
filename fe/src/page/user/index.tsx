import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../../feature/ScrollToTop'
import '../../fonts/line-awesome-1.3.0/css/line-awesome.css'
import styles from './styles.module.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Footer from './components/Footer'

function Base() {
  return (
    <HelmetProvider>
      <div className={styles.modules}>
        <Helmet>
          <title>Chia Sẻ Khóa Học</title>
          <meta name='description' content='Chia Sẻ Khóa Học' />
          <meta name='google-site-verification' content='T9IaRbRYVAYLaOMteD3gLMso6FUu62Kkyu7ORBpDrqw' />
        </Helmet>

        <Toaster />
        <ScrollToTop />
        <Navbar />
        <Header />
        <main className={styles.container}>
          <div className={styles.mainContent}></div>
          <Outlet />
        </main>
      </div>
      <Footer />
    </HelmetProvider>
  )
}

export default Base
