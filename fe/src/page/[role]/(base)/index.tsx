import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../../../feature/ScrollToTop'
import '../../../fonts/line-awesome-1.3.0/css/line-awesome.css'
import styles from './styles.module.css'
import Header from './components/Header'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Footer from './components/Footer'

function Base() {
  return (
    <HelmetProvider>
      <div className={styles.modules}>
        <Helmet>
          <title>Mèo Anh Lông dài</title>
          <meta name='description' content='Mèo Anh Lông dài' />
          <meta name='google-site-verification' content='T9IaRbRYVAYLaOMteD3gLMso6FUu62Kkyu7ORBpDrqw' />
        </Helmet>

        <Toaster />
        <ScrollToTop />
        <Header />
        <Outlet />
      </div>
      <Footer />
    </HelmetProvider>
  )
}

export default Base
