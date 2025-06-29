import clsx from 'clsx'
import styles from './styles.module.css'
import { Tooltip } from 'antd'

const ProductCardSmall = () => {
  return (
    <div className={styles.modules}>
      <div className={styles.imageBox}>
        <a href='/threads/' title='' className={styles.image}>
          <img
            src='https://github.com/gianValentin/core-java21-springboot3/assets/45782176/91e795b5-cd19-4492-95bd-33f7465dfb31'
            title='PostgreSql'
            alt='PostgresSql'
            width='48px'
            height='48px'
          />
        </a>
      </div>

      <div className={styles.contents}>
        <a className={styles.info} href='/threads/mino/'>
          <span className={clsx(styles.tagItem, styles.tagYellow)} dir='auto'>
            700k
          </span>
          &nbsp;
          <span className={clsx(styles.tagItem, styles.tagOlive)} dir='auto'>
            Bình Định
          </span>
          &nbsp;
          <span className={clsx(styles.tagItem, styles.tagOrange)} dir='auto'>
            TP Quy Nhơn
          </span>{' '}
          So na ra
        </a>

        <div className={styles.moreInfo}>
          <span>Started by Toivaban</span>
          <Tooltip placement='rightTop' title={'20/6/25 lúc 08:27'}>
            <span className={styles.timeUp}>. Hôm nay lúc 08:27</span>
          </Tooltip>
        </div>
        <div className={styles.forum}>
          <a href='/forums/'>binano</a>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSmall
