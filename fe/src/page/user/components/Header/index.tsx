import styles from './styles.module.css'
import canvas from '../../../../assets/images/base/canvas.png'
import ai from '../../../../assets/images/base/ai.jpg'
import adobe from '../../../../assets/images/base/adobe.jpg'
import inteligent from '../../../../assets/images/base/inteligent.jpg'
import chatgpt from '../../../../assets/images/base/chatgpt.jpg'
import powerbi from '../../../../assets/images/base/powerbi.png'

const Header = () => {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const featuredCourses = [
    { img: powerbi, title: 'Introduction to Microsoft Power BI' },
    { img: chatgpt, title: 'ChatGPT Prompt Engineering ( Free Course )' },
    { img: inteligent, title: 'N8N – Build intelligent AI 2.0 Agent Systems Without Coding' },
    { img: adobe, title: 'Adobe Premiere Pro CC Masterclass for Video Editing' },
    { img: ai, title: 'Adobe Illustrator CC for Learning Graphics Design' },
    { img: canvas, title: 'Canva for Social Media Graphic Design and Video Editing' }
  ]

  return (
    <div className={styles.bg}>
      <div className={styles.topbar} role='banner'>
        <span className={styles.date} aria-label='Current date'>
          {dateStr}
        </span>
      </div>

      <div className={styles.bannerWrapper}>
        <header className={styles.banner} role='banner'>
          <img src='/logo.png' alt='FCS Logo' className={styles.logo} />
          <span className={styles.slogan}>
            BEING <span className={styles.smart}>SMART</span> IS GREAT
          </span>
        </header>
      </div>

      <div className={styles.menuWrapper}>
        <nav className={styles.menu} role='navigation' aria-label='Main navigation'>
          <a className={styles.active} href='/' aria-current='page'>
            HOME
          </a>
          <a href='/category-detail/udemy'>100% OFF UDEMY COUPON</a>
          <a href='/category-detail/all'>ALL COURSES</a>
          <a href='/category-detail/game'>GAMES</a>
          <a href='/term-of-use'>TERMS OF USE</a>
          <a href='/privacy-policy'>PRIVACY POLICY</a>
          <a href='/copyright'>DMCA COPYRIGHTS</a>
        </nav>
      </div>

      <div className={styles.sliderWrapper}>
        <section className={styles.slider} role='region' aria-label='Featured courses'>
          {featuredCourses.map((course, i) => (
            <div className={styles.sliderItem} key={i} role='button' tabIndex={0}>
              <img src={course.img} alt={`${course.title} thumbnail`} />
              <span>{course.title}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Header
