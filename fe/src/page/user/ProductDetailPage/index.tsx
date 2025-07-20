
import { useParams, useLocation } from 'react-router-dom';
import TabDetail from './TabMenu';
import imageCourse from './assets/image.png'
import courseFirst from './assets/courseFirst.jpg'
import { ShareAltOutlined, FacebookOutlined, TwitterOutlined, GoogleOutlined, RedditOutlined, PlusOutlined, CommentOutlined } from '@ant-design/icons';
import styles from './styles.module.css'

function ProductDetailPage() {
    const location = useLocation()
    const course = location.state
    return (
        <div className={styles.detailtContainer}>


            <article className={styles.articleContainer}>
                <div className={styles.developmentTag}>DEVELOPMENT</div>
                <h1 className={styles.articleTitle}>{course.name}</h1>
                <div className={styles.articleMeta}>
                    <span className={styles.author}>By <b>FCS</b>-</span>
                    <span className={styles.date}>  On <b>Apr 29, 2025</b> </span>
                </div>

                <div className={styles.socialShare}>
                    <div className={`${styles.socialIcon} ${styles.shareButton}`}>
                        <ShareAltOutlined /> Share
                    </div>
                    <div className={`${styles.socialIcon} ${styles.facebook}`}>
                        <FacebookOutlined /> Facebook
                    </div>
                    <div className={`${styles.socialIcon} ${styles.twitter}`}>
                        <TwitterOutlined /> Twitter
                    </div>
                    <div className={`${styles.socialIcon} ${styles.googlePlus}`}>
                        <GoogleOutlined /> Google+
                    </div>
                    <div className={`${styles.socialIcon} ${styles.reddit}`}>
                        <RedditOutlined /> Reddit
                    </div>
                    <div className={`${styles.socialIcon} ${styles.more}`}>
                        <PlusOutlined />
                    </div>
                    <div className={styles.commentCount}>
                        <CommentOutlined /> 0
                    </div>
                </div>

                <div className={styles.btn}>
                    <button className={styles.downloadButton}>DOWNLOAD HERE</button>
                </div>




                <div className={styles.articleImageContainer}>
                    <img src={imageCourse} alt="Pre-Coding Bootcamp Image" className={styles.articleImage} />
                </div>

                <h2 className={styles.introductionText}>{course.name}</h2>


                <div className={styles.learnBox}>
                    <h2 className={styles.title}>What you'll learn</h2>
                    <ul className={styles.list}>
                        <li>The different types of programs you can build (websites, GUIs, automation, etc.)</li>
                        <li>How to use the terminal to navigate files and run commands</li>
                        <li>Core tools every developer uses: editors, IDEs, Git, and databases</li>
                        <li>Key data formats: CSV, JSON, and XML, and when to use them</li>
                        <li>How to break down problems like a programmer</li>
                        <li>Core programming concepts: variables, data types, loops, and functions</li>
                        <li>What web servers, APIs, and deployment really mean</li>
                        <li>The solid foundation you need to start coding with confidence</li>
                    </ul>
                </div>


                <div className={styles.sectionContainer}>

                    <h2 className={styles.sectionHeading}>Requirements</h2>
                    <ul className={styles.reqList}>
                        <li className={styles.reqListItem}>No prior programming or technical experience is required.</li>
                        <li className={styles.reqListItem}>Curiosity and a willingness to learn how programming works behind the scenes.</li>
                    </ul>


                    <h2 className={styles.sectionHeading}>Description</h2>
                    <p className={styles.descriptionPara}>
                        {course.description}
                    </p>
                    
                </div>

                <div className={styles.learnSection}>
                    <h2 className={styles.sectionTitle}>What You'll Learn</h2>
                    <ol className={styles.learnList}>
                        <li className={styles.learnListItem}>Get to know the different types of programs you can create: web apps, desktop apps, APIs, automation, and more.</li>
                        <li className={styles.learnListItem}>How to use the <strong className={styles.boldText}>terminal/command line</strong> like a real developer.</li>
                        <li className={styles.learnListItem}>The difference between <strong className={styles.boldText}>code editors</strong> and <strong className={styles.boldText}>IDEs</strong>, and how to choose the right one.</li>
                        <li className={styles.learnListItem}>How <strong className={styles.boldText}>files</strong> like CSV, JSON, and XML are used in real-world programming.</li>
                        <li className={styles.learnListItem}>The basics of <strong className={styles.boldText}>databases</strong>, both relational and NoSQL.</li>
                        <li className={styles.learnListItem}>How <strong className={styles.boldText}>Git</strong> and <strong className={styles.boldText}>GitHub</strong> help developers collaborate and track code history.</li>
                        <li className={styles.learnListItem}>The <strong className={styles.boldText}>core concepts of programming</strong> (variables, data types, loops, functions) from a computer science perspective.</li>
                        <li className={styles.learnListItem}>How to <strong className={styles.boldText}>break down real-world problems</strong> and plan programs logically – before ever touching code.</li>
                        <li className={styles.learnListItem}>What <strong className={styles.boldText}>web servers, APIs, and deployment</strong> really mean.</li>
                        <li className={styles.learnListItem}>Where to go next: choosing your language, building your portfolio.</li>
                    </ol>
                </div>


                <div className={styles.courseForSection}>
                    <h2 className={styles.sectionTitle}>Who This Course Is For</h2>

                    <p className={styles.introPara}>
                        This course is intended for <strong className={styles.boldText}>beginners</strong> who want to learn programming. If you haven't started a
                        programming language course, this course is the first step. If you have started a programming language
                        course, take this course at the same time as a companion course and you will see that many things in the
                        programming language you are learning will finally make sense.
                    </p>

                    <p className={styles.introPara}>
                        By the end of this course, you will understand the world of programming, know how real developers work,
                        and feel fully prepared to learn your first programming language.
                    </p>

                    <h3 className={styles.subHeading}>Who this course is for:</h3>
                    <ul className={styles.targetList}>
                        <li className={styles.targetListItem}>Absolute beginners</li>
                        <li className={styles.targetListItem}>Non-technical professionals</li>
                    </ul>

                    <div className={styles.metaInfo}>
                        <p className={styles.metaItem}>Created by: <span className={styles.metaValue}>Ardit Sulce</span></p>
                        <p className={styles.metaItem}>Last updated: <span className={styles.metaValue}>4/2025</span></p>
                        <p className={styles.metaItem}>English</p> {/* No specific value span as it's just one word */}
                        <p className={styles.metaItem}>Size: <span className={styles.metaValue}>2.21 GB</span></p>
                    </div>
                </div>

                <div className={styles.downloadContainer}>
                    <p className={styles.downloadParts}>
                        <a href="#" className={styles.partLink}>Download Part 1</a> | <a href="#" className={styles.partLink}>Download Part 2</a>
                    </p>

                    <p className={styles.udemyLink}>
                        <a href="https://www.udemy.com/course/pre-coding-bootcamp-your-first-step-to-become-a-programmer/" target="_blank" rel="noopener noreferrer">
                            https://www.udemy.com/course/pre-coding-bootcamp-your-first-step-to-become-a-programmer/.
                        </a>
                    </p>

                    <div className={styles.buttonGroup}>
                        <button className={styles.bigRedButton}>WORKING GOOGLE DRIVE LINK</button>
                        <button className={styles.bigRedButtonSecondary}>HIGH SPEED TORRENT LINK</button>
                    </div>
                </div>

                <div className={styles.recommendationSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>YOU MIGHT ALSO LIKE</h2>
                        <a href="#" className={styles.moreLink}>More From Author</a>
                    </div>

                    <div className={styles.cardsGrid}>
                        <div className={styles.courseCard}>
                            <div className={styles.cardImageContainer}>
                                <img src={imageCourse} alt="Ultimate DevOps Project Implementation" className={styles.cardImage} />
                                <span className={styles.cardTag}>IT & SOFTWARE</span>
                            </div>
                            <p className={styles.cardTitle}>Ultimate DevOps Project Implementation</p>
                        </div>


                        <div className={styles.courseCard}>
                            <div className={styles.cardImageContainer}>
                                <img src={courseFirst} alt="The Complete Networking Fundamentals Course" className={styles.cardImage} />
                                <span className={styles.cardTag}>IT & SOFTWARE</span>
                            </div>
                            <p className={styles.cardTitle}>The Complete Networking Networking Fundamentals Course. Your CCNA start</p>
                        </div>


                        <div className={styles.courseCard}>
                            <div className={styles.cardImageContainer}>
                                <img src={courseFirst} className={styles.cardImage} />
                                <span className={styles.cardTag + ' ' + styles.tagDevelopment}>DEVELOPMENT</span> {/* Specific tag style */}
                            </div>
                            <p className={styles.cardTitle}>The Complete Ruby on Rails Developer Course</p>
                        </div>
                    </div>

                    <div className={styles.navigationButtons}>
                        <button className={styles.navButton}>&lt; PREV</button>
                        <button className={styles.navButton}>NEXT &gt;</button>
                    </div>

                    <hr className={styles.sectionDivider} />
                </div>

            </article>

            <TabDetail />
        </div>
    )
}

export default ProductDetailPage
