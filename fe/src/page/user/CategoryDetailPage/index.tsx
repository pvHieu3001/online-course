import canvas from '../../../assets/images/base/canvas.png'
import ai from '../../../assets/images/base/ai.jpg'
import adobe from '../../../assets/images/base/adobe.jpg'
import inteligent from '../../../assets/images/base/inteligent.jpg'
import chatgpt from '../../../assets/images/base/chatgpt.jpg'
import powerbi from '../../../assets/images/base/powerbi.png'
import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import TabCategory from '../TabCategory'

function CategoryDetailPage() {

    const location = useLocation()
    const category = location.state

    const featuredCourses = [
        { img: powerbi, title: 'Introduction to Microsoft Power BI' },
        { img: chatgpt, title: 'ChatGPT Prompt Engineering ( Free Course )' },
        { img: inteligent, title: 'N8N – Build intelligent AI 2.0 Agent Systems Without Coding' },
        { img: adobe, title: 'Adobe Premiere Pro CC Masterclass for Video Editing' },
        { img: ai, title: 'Adobe Illustrator CC for Learning Graphics Design' },
        { img: canvas, title: 'Canva for Social Media Graphic Design and Video Editing' }
    ]

    const courses = [
        {
            id: 1,
            image: 'https://i.imgur.com/euT3ZqY.png',
            category: 'Adobe After Affects · All Courses',
            title: 'Adobe After Effects: Complete Animation Course for Beginners',
            description:
                'Adobe After Effects CC lets you make beautiful motion graphics, shape animations, and animated...'
        },
        {
            id: 2,
            image: 'https://i.imgur.com/NGEXCqT.png',
            category: 'Adobe After Affects · All Courses',
            title: 'Learn Adobe After Effects with a Crash Course for Creatives',
            description:
                'You can make great social media videos and motion graphics without any experience. Study theory...'
        }
    ];
    return (
        <>
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
            <div className={styles.categoryDetailPage}>

                <div className={styles.categoryDetail}>

                    <div>
                        <div className={styles.categoryLabel}>Category - {category.name}</div>
                        <h1 className={styles.title}>
                            Adobe After Effects Tutorials – Learn Adobe After Effects For Free
                        </h1>
                        <p className={styles.subtitle}>
                            Adobe After Effects Tutorials – Learn Adobe After Effects For Free – how to compare
                            in-camera footage with behind-the-scenes material, and make creative choices about
                            blending them together. He also shares some beautiful special effects for adding
                            flair to visuals. The final chapters show you how to put it all together, and make
                            your Adobe CC workflow even more efficient, with presets.
                        </p>
                        <div className={styles.topics}>
                            <div className={styles.topicsTitle}>Topics include:</div>
                            <ul className={styles.topicList}>
                                <li>Assessing your video footage</li>
                                <li>Repairing and color correcting media</li>
                                <li>Warming and cooling clips</li>
                                <li>Shot matching</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.courseList}>
                        {courses.map((course) => (
                            <div className={styles.courseItem} key={course.id}>
                                <img src={course.image} alt={course.title} className={styles.thumbnail} />
                                <div className={styles.courseContent}>
                                    <div className={styles.courseCategory}>{course.category}</div>
                                    <div className={styles.courseTitle}>{course.title}</div>
                                    <div className={styles.courseDescription}>{course.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <TabCategory />
            </div>




        </>
    )
}

export default CategoryDetailPage;