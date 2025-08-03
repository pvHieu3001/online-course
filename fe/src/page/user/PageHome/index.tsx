import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { categoryActions } from '@/app/actions'
import { useNavigate } from 'react-router-dom'
import TabCategory from '../TabCategory'



function PageHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(courseActions.getCourses() as unknown as AnyAction)
    dispatch(categoryActions.getCategories() as unknown as AnyAction)
  }, [dispatch])

  const courses = useSelector((state) => state.course)
  const categories = useSelector((state) => state.category)

  console.log("categories", categories)

  const handleDetail = (id: any) => {
    const course = courses.dataList.find((c: any) => c.id === id)
    if (!course) return
    navigate(`/product-detail/${id}`, { state: course })
  }

  return (
    <div className={styles.bg}>
      

      <main className={styles.mainContent} role='main'>
        <section className={styles.courses} aria-label='Course listings'>
          {courses?.dataList?.map((course: any, i: number) => (
            <article className={styles.courseCard} key={i} role='article' onClick={() => handleDetail(course.id)}>
              <img src={`https://dogohiephong.vn/${course.imageUrl}`} alt={`${course.name} course image`} />
              <div className={styles.courseCat}>{course.categoryId}</div>
              <h3 className={styles.courseTitle}>{course.name}</h3>
            </article>
          ))}
        </section>

        <TabCategory/>
      </main>

      <div className={styles.description} id='description'>
        <div className={styles.description_title}>
          <h1>Free Course Site | Choose &amp; Download from 5000+ Courses</h1>
        </div>
        <section className={styles.herald_txt}>
          <p>
            Finding the right website to get started with learning for free isn’t simple. You may find it hard to get
            your required course for free from any website unless you have reached freecoursesite. Our website stands at
            the top when it comes to offering a versatile collection of courses from different fields.
          </p>
          <p>
            By exploring our collection of courses, you can find courses for affiliate marketing, photoshop, Shopify
            development, and many other categories. Shortly, you will find a freecourse site good for every type of
            learning from online courses.
          </p>
          <h2>About Freecoursesite</h2>
          <p>
            Free Course Sites is an all-in-one solution for learners who can’t pay to buy expensive courses from online
            mentors. We aim that learning is necessary for everyone without discrimination between rich and poor. That’s
            why we are here with an extensive list of courses that anyone can download.
          </p>
          <p>
            No matter where you are, what is your rank, and what is your financial status, you can get free courses from
            our website. We are here to serve every learner in the world regardless of any factor impacting their
            learning.
          </p>
          <p>
            From freecoursesite, you can easily download as many courses as you want. Doesn’t matter what is your
            required field, we have covered almost every field that can be learned from online courses. You can explore
            the following section of this page to learn more about our freecourse list.
          </p>
          <h2>Our Major Course Categories</h2>
          <p>
            Undoubtedly, the free course site covers multiple fields from 3D designing to HTML learning, YouTube
            marketing to video editing, and many others. One can learn from any course freely without any fee or charges
            as per their connected fields.
          </p>
          <p>But a few major fields that we are serving in are mentioned below.</p>
          <ul>
            <li>Designing</li>
            <li>Web Development</li>
            <li>App Development</li>
            <li>Programming</li>
            <li>Database Management</li>
            <li>SEO</li>
          </ul>
          <p>
            If you are new to the field and looking to learn a specific skill, we recommend exploring the above major
            categories of courses. Free Course Sites have multiple tutorials for every skill making you proficient in a
            specific skill from basic to advanced. Just get your computer, chair, and a notebook to get started with
            learning from our freecourse site.
          </p>
          <h2>Who Can Learn from Free Course Sites?</h2>
          <p>
            No limitations are applied to learning depending on any factor like gender, race, age, and financial status.
            One can browse our freecourse site and explore it to get their desired course and be master in their skills.
          </p>
          <p>
            Our website doesn’t only offer learning for beginners or professionals. But we are offering courses in
            versatile collections to let everyone get what they want in terms of learning. Whether you have a basic
            knowledge of the field or looking to get started with it, you can go ahead and learn something from our
            courses.
          </p>
          <p>
            Just explore our course collection to find the one that suits you. The best thing is you can read about the
            course description from free course sites to learn what’s inside.
          </p>
          <h2>How to Download Courses From Freecourse Site?</h2>
          <p>
            The process to download courses from freecourse sites is pretty simple. You only have to follow a few simple
            steps. Here are the steps that you have to follow for downloading courses from our website.
          </p>
          <ol>
            <li>Browse “Free Course Sites” and search for your required course</li>
            <li>Click on the course you want to download</li>
            <li>Scroll down unless you get a button labeled “Get Course Now” and click on it</li>
            <li>It will open a new page where you have to wait for 15 seconds</li>
            <li>Click on the “Get Link” button when shown on the screen</li>
            <li>
              By doing so, the course will be added to your G-drive. No need to share the Google account as it will
              automatically redirect you to Google Drive after clicking on the button. Once the course is shown in the
              drive, you can use its built-in downloading feature to get it on your computer/laptop/mobile.
            </li>
          </ol>
          <h2>Why Choose a Free Course Site for Downloading Courses?</h2>
          <p>
            Multiple websites are available on the internet offering courses for free. Then the question that comes to
            mind is “Why choose freecoursesite over others”. Here are some features that make us better than those
            websites and let us stand at the top of the list.
          </p>
          <h3>Safe Courses</h3>
          <p>
            From our free course sites, you won’t get a single course that is affected by malware or malicious files. We
            do care about our learner’s safety and always check a course before sharing it on our website. Our team
            makes sure that the course doesn’t have a single malicious file making it difficult for learners to keep
            their data safe.
          </p>
          <h3>Wide Collection</h3>
          <p>
            Free Course Site offers more than 5000 courses from different categories including the major ones mentioned
            above. You can search for your required course and easily explore the collection to find the most suitable
            one.
          </p>
          <h3>No Subscription Required</h3>
          <p>
            Another major advantage of browsing our website is you won’t need any registration or subscription. You can
            freely browse the website like <a href='https://thedownloadly.com/'>Downloadly</a>, download courses, and
            learn from it. We will neither ask you for registration details or anything else.
          </p>
          <h3>Easy to Download Interface</h3>
          <p>
            Additionally, freecoursesite has a built-in method to download courses for free. You can easily download any
            course within a few steps without facing any hurdles. Its course downloader has a simple working interface
            making it suitable for everyone to download and learn from the courses.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PageHome
