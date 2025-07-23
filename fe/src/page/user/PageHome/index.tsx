import React, { useEffect } from 'react'
import styles from './styles.module.css'
import canvas from '../../../assets/images/base/canvas.png'
import ai from '../../../assets/images/base/ai.jpg'
import adobe from '../../../assets/images/base/adobe.jpg'
import inteligent from '../../../assets/images/base/inteligent.jpg'
import chatgpt from '../../../assets/images/base/chatgpt.jpg'
import powerbi from '../../../assets/images/base/powerbi.png'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { categoryActions } from '@/app/actions'
import { selectCourseData } from '@/app/selectors/course.selectors'
import { useNavigate } from 'react-router-dom'

const featuredCourses = [
  { img: powerbi, title: 'Introduction to Microsoft Power BI' },
  { img: chatgpt, title: 'ChatGPT Prompt Engineering ( Free Course )' },
  { img: inteligent, title: 'N8N – Build intelligent AI 2.0 Agent Systems Without Coding' },
  { img: adobe, title: 'Adobe Premiere Pro CC Masterclass for Video Editing' },
  { img: ai, title: 'Adobe Illustrator CC for Learning Graphics Design' },
  { img: canvas, title: 'Canva for Social Media Graphic Design and Video Editing' },
]

function PageHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(courseActions.getCourses() as unknown as AnyAction)
    dispatch(categoryActions.getCategories() as unknown as AnyAction)
  }, [dispatch])

  const courses = useSelector(selectCourseData)
  const categories = useSelector((state) => state.category)

  const handleDetail = (id: any) => {
    const course = courses.find((c: any) => c.id === id)
    if (!course) return
    navigate(`/product-detail/${id}`, { state: course })
  }

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search submitted')
  }

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName)
  }

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
          <a className={styles.active} href='#' aria-current='page'>HOME</a>
          <a href='#'>100% OFF UDEMY COUPON</a>
          <a href='#'>ALL COURSES</a>
          <a href='#'>GAMES</a>
          <a href='#'>TERMS OF USE</a>
          <a href='#'>PRIVACY POLICY</a>
          <a href='#'>DMCA COPYRIGHTS</a>
          <a href='#'>
            <span className={styles.searchIcon} role='img' aria-label='Search'>🔍</span>
          </a>
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

      <main className={styles.mainContent} role='main'>
        <section className={styles.courses} aria-label='Course listings'>
          {courses.map((course: any, i: number) => (
            <article className={styles.courseCard} key={i} role='article' onClick={() => handleDetail(course.id)}>
              <img src={`https://dogohiephong.vn/${course.imageUrl}`} alt={`${course.name} course image`} />
              <div className={styles.courseCat}>{course.categoryId}</div>
              <h3 className={styles.courseTitle}>{course.name}</h3>
            </article>
          ))}
        </section>

        <aside className={styles.sidebar} role='complementary'>
          <div className={styles.searchBox}>
            <h2 className={styles.searchLabel}>Search Course</h2>
            <form onSubmit={handleSearch} className={styles.searchInputWrap}>
              <input type='text' placeholder='Type here to search...' aria-label='Search for courses' />
              <button type='submit' aria-label='Submit search'>
                <span className={styles.searchIcon} role='img' aria-label='Search'>🔍</span>
              </button>
            </form>
          </div>

          <div className={styles.categoriesBox}>
            <h2 className={styles.categoriesLabel}>Categories</h2>
            <ul className={styles.categoriesList} role='list'>
              {categories?.data?.map((category: any, i: number) => (
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
                  <span className={styles.catCount}>{category.id}</span>
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
