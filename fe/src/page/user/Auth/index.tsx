import { FC } from 'react'
import facebookSvg from '../../../assets/images/base/Facebook.svg'
import twitterSvg from '../../../assets/images/base/Twitter.svg'
import googleSvg from '../../../assets/images/base/Google.svg'
import logo from '../../../assets/images/base/login.png'
import { Helmet } from 'react-helmet-async'
import styles from './styles.module.css'
import {LockOutlined } from '@ant-design/icons'

export interface PageLoginProps {
  className?: string
}

const loginSocials = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: facebookSvg
  },
  {
    name: 'Continue with Twitter',
    href: '#',
    icon: twitterSvg
  },
  {
    name: 'Continue with Google',
    href: '#',
    icon: googleSvg
  }
]

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
  return (
    <div className={styles.modules}>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name='google-site-verification' content='T9IaRbRYVAYLaOMteD3gLMso6FUu62Kkyu7ORBpDrqw' />
      </Helmet>
      
      <div className={styles.container}>
          <img className={styles.logo} src={logo}/>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.logoWrapper}>
              <LockOutlined />        
            </div>
            <div className={styles.textWrapper}>
              <h1 className={styles.header}>Đăng Nhập tài khoản</h1>
              <p className={styles.description}>Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, để quản lý quyền truy cập vào tài khoản của bạn.</p>
            </div>
          </div>
          <div>
            <label>Email</label>
            <input></input>
          </div>
          <div>
            <label>Mật khẩu</label>
            <input></input>
          </div>
          <div>
            <span>Duy trì đăng nhập</span>
            <a>Quên mật khẩu?</a>
          </div>
            <button>Đăng nhập</button>
                        <div className={styles.line}>
                             <span>Bạn chưa có tài khoản? <a>Đăng ký ngay</a></span>
                           </div>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
