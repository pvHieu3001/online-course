import styles from './styles.module.css'

function TabMenu () {

   return (
      <>
           <div className={styles['page-container']}>
            <div className={styles['top-section']}>
                <div className={styles['search-container']}>
                    <input type="text" className={styles['search-input']} placeholder="Search..." />
                    <button className={styles['search-button']}>SEARCH</button>
                </div>
            </div>

            <div className={styles['header-banner']}>
                <h1 className={styles['banner-title']}>Course Club</h1>
                <p className={styles['banner-subtitle']}>Get Premium Courses For Free</p>
            </div>

            <div className={styles['main-content']}>
                <div className={styles['section-divider']}></div>
                <h2 className={styles['pages-heading']}>PAGES</h2>
                <ul className={styles['page-list']}>
                    <li className={styles['page-item']}>
                        {/* Font Awesome icons still use their own class names directly */}
                        <i className="fas fa-file-alt"></i>
                        <a href="#" className={styles['page-link']}>How to Download Course From FCS – Complete Guide</a>
                    </li>
                    <li className={styles['page-item']}>
                        <i className="fas fa-folder"></i>
                        <a href="#" className={styles['page-link']}>GDTOT Error Fix</a>
                    </li>
                </ul>
            </div>
        </div>
      </>
   )
}

export default TabMenu;