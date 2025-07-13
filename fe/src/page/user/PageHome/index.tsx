import React from 'react'
import styles from './styles.module.css'

const featuredCourses = [
  {
    img: 'https://freecoursesites.com/introduction-to-microsoft-power-bi/',
    title: 'Introduction to Microsoft Power BI'
  },
  {
    img: 'https://img-c.udemycdn.com/course/240x135/654321.jpg',
    title: 'ChatGPT Prompt Engineering ( Free Course )'
  },
  {
    img: 'https://img-c.udemycdn.com/course/240x135/111111.jpg',
    title: 'N8N – Build intelligent AI 2.0 Agent Systems Without Coding'
  },
  {
    img: 'https://img-c.udemycdn.com/course/240x135/222222.jpg',
    title: 'Adobe Premiere Pro CC Masterclass for Video Editing'
  },
  {
    img: 'https://img-c.udemycdn.com/course/240x135/333333.jpg',
    title: 'Adobe Illustrator CC for Learning Graphics Design'
  },
  {
    img: 'https://img-c.udemycdn.com/course/240x135/444444.jpg',
    title: 'Canva for Social Media Graphic Design and Video Editing'
  }
]

const categories = [
  { name: '.NET Tutorials', count: 12 },
  { name: '100% Off Udemy Coupon', count: 20 },
  { name: '2d Tutorials', count: 17 },
  { name: '3D Max Tutorials', count: 3 },
  { name: '3D Tutorials', count: 15 },
  { name: 'Adobe After Affects', count: 14 }
]

const courses = [
  {
    img: 'https://img-c.udemycdn.com/course/480x270/123456.jpg',
    title: 'Introduction to Microsoft Power BI',
    category: 'FREE UDEMY COURSES'
  },
  {
    img: 'https://img-c.udemycdn.com/course/480x270/654321.jpg',
    title: 'ChatGPT Prompt Engineering ( Free Course )',
    category: 'FREE UDEMY COURSES'
  },
  {
    img: 'https://img-c.udemycdn.com/course/480x270/111111.jpg',
    title: 'N8N – Build intelligent AI 2.0 Agent Systems Without Coding',
    category: 'FREE UDEMY COURSES'
  },
  {
    img: 'https://img-c.udemycdn.com/course/480x270/222222.jpg',
    title: 'Adobe Premiere Pro CC Masterclass for Video Editing',
    category: 'FREE UDEMY COURSES'
  },
  {
    img: 'https://img-c.udemycdn.com/course/480x270/333333.jpg',
    title: 'Adobe Illustrator CC for Learning Graphics Design',
    category: 'FREE UDEMY COURSES'
  },
  {
    img: 'https://img-c.udemycdn.com/course/480x270/444444.jpg',
    title: 'Canva for Social Media Graphic Design and Video Editing',
    category: 'FREE UDEMY COURSES'
  }
]

function PageHome() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Add search functionality here
    console.log('Search submitted')
  }

  const handleCategoryClick = (categoryName: string) => {
    // Add category filter functionality here
    console.log('Category clicked:', categoryName)
  }

  return (
    <div className={styles.bg}>
      {/* Header ngày tháng */}
      <div className={styles.topbar} role='banner'>
        <span className={styles.date} aria-label='Current date'>
          {dateStr}
        </span>
      </div>

      {/* Banner/logo */}
      <div className={styles.bannerWrapper}>
        <header className={styles.banner} role='banner'>
          <img src='/logo.png' alt='FCS Logo' className={styles.logo} />
          <span className={styles.slogan}>
            BEING <span className={styles.smart}>SMART</span> IS GREAT
          </span>
        </header>
      </div>

      {/* Menu ngang */}
      <div className={styles.menuWrapper}>
        <nav className={styles.menu} role='navigation' aria-label='Main navigation'>
          <a className={styles.active} href='#' aria-current='page'>
            HOME
          </a>
          <a href='#' aria-label='100% off Udemy coupon courses'>
            100% OFF UDEMY COUPON
          </a>
          <a href='#' aria-label='Browse all courses'>
            ALL COURSES
          </a>
          <a href='#' aria-label='Games section'>
            GAMES
          </a>
          <a href='#' aria-label='Terms of use'>
            TERMS OF USE
          </a>
          <a href='#' aria-label='Privacy policy'>
            PRIVACY POLICY
          </a>
          <a href='#' aria-label='DMCA copyrights'>
            DMCA COPYRIGHTS
          </a>
          <a href='#' aria-label='Search courses'>
            <span className={styles.searchIcon} role='img' aria-label='Search'>
              🔍
            </span>
          </a>
        </nav>
      </div>

      {/* Slider khóa học nổi bật */}
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

      {/* Main content */}
      <main className={styles.mainContent} role='main'>
        {/* Danh sách khóa học */}
        <section className={styles.courses} aria-label='Course listings'>
          {courses.map((course, i) => (
            <article className={styles.courseCard} key={i} role='article'>
              <img src={course.img} alt={`${course.title} course image`} />
              <div className={styles.courseCat}>{course.category}</div>
              <h3 className={styles.courseTitle}>{course.title}</h3>
            </article>
          ))}
        </section>

        {/* Sidebar */}
        <aside className={styles.sidebar} role='complementary'>
          <div className={styles.searchBox}>
            <h2 className={styles.searchLabel}>Search Course</h2>
            <form onSubmit={handleSearch} className={styles.searchInputWrap}>
              <input type='text' placeholder='Type here to search...' aria-label='Search for courses' />
              <button type='submit' aria-label='Submit search'>
                <span className={styles.searchIcon} role='img' aria-label='Search'>
                  🔍
                </span>
              </button>
            </form>
          </div>

          <div className={styles.categoriesBox}>
            <h2 className={styles.categoriesLabel}>Categories</h2>
            <ul className={styles.categoriesList} role='list'>
              {categories.map((category, i) => (
                <li
                  key={i}
                  role='button'
                  tabIndex={0}
                  onClick={() => handleCategoryClick(category.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCategoryClick(category.name)
                    }
                  }}
                >
                  <span className={styles.catCount}>{category.count}</span>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default PageHome
