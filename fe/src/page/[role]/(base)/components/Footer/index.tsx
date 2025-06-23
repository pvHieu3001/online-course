import Logo from '../../shared/Logo/Logo'
import styles from './styles.module.css'

const Footer = () => {
  return (
    <div className={styles.modules}>
      <div className={styles.banner}>
        <Logo></Logo>
        <span>Khóa học online</span>
        <span>Tri thức là sức mạnh</span>
      </div>
      <div className={styles.menu}>
        <h1 className={styles.menuHeading}>Miền Bắc</h1>
        <ul className={styles.menuItem}>
          <li>
            <a href='/forums/ha-noi.85/' target='_blank'>
              Hà Nội
            </a>
          </li>
          <li>
            <a href='/forums/hai-phong.86/' target='_blank'>
              Hải Phòng
            </a>
          </li>
          <li>
            <a href='/forums/thai-nguyen.88/' target='_blank'>
              Thái Nguyên
            </a>
          </li>
          <li>
            <a href='/forums/hung-yen.90/' target='_blank'>
              Hưng Yên
            </a>
          </li>
          <li>
            <a href='/forums/hai-duong.91/' target='_blank'>
              Hải Dương
            </a>
          </li>
          <li>
            <a href='/forums/nam-dinh.87/' target='_blank'>
              Nam Định
            </a>
          </li>
          <li>
            <a href='/forums/quang-ninh.89/' target='_blank'>
              Quảng Ninh
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.menu}>
        <h1 className={styles.menuHeading}>Miền Trung</h1>
        <ul className={styles.menuItem}>
          <li>
            <a href='/forums/ha-noi.85/' target='_blank'>
              Hà Nội
            </a>
          </li>
          <li>
            <a href='/forums/hai-phong.86/' target='_blank'>
              Hải Phòng
            </a>
          </li>
          <li>
            <a href='/forums/thai-nguyen.88/' target='_blank'>
              Thái Nguyên
            </a>
          </li>
          <li>
            <a href='/forums/hung-yen.90/' target='_blank'>
              Hưng Yên
            </a>
          </li>
          <li>
            <a href='/forums/hai-duong.91/' target='_blank'>
              Hải Dương
            </a>
          </li>
          <li>
            <a href='/forums/nam-dinh.87/' target='_blank'>
              Nam Định
            </a>
          </li>
          <li>
            <a href='/forums/quang-ninh.89/' target='_blank'>
              Quảng Ninh
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.menu}>
        <h1 className={styles.menuHeading}>Miền Nam</h1>
        <ul className={styles.menuItem}>
          <li>
            <a href='/forums/ha-noi.85/' target='_blank'>
              Hà Nội
            </a>
          </li>
          <li>
            <a href='/forums/hai-phong.86/' target='_blank'>
              Hải Phòng
            </a>
          </li>
          <li>
            <a href='/forums/thai-nguyen.88/' target='_blank'>
              Thái Nguyên
            </a>
          </li>
          <li>
            <a href='/forums/hung-yen.90/' target='_blank'>
              Hưng Yên
            </a>
          </li>
          <li>
            <a href='/forums/hai-duong.91/' target='_blank'>
              Hải Dương
            </a>
          </li>
          <li>
            <a href='/forums/nam-dinh.87/' target='_blank'>
              Nam Định
            </a>
          </li>
          <li>
            <a href='/forums/quang-ninh.89/' target='_blank'>
              Quảng Ninh
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
