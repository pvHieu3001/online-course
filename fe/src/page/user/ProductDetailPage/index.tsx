import clsx from 'clsx'
import RightSection from '../components/RightSection'
import styles from './styles.module.css'
import { ExclamationOutlined, UserOutlined, TagsOutlined, RightOutlined, DownCircleOutlined } from '@ant-design/icons'

function ProducDetailPage() {
  return (
    <div className={styles.modules}>
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
          <UserOutlined />
          <span>Toivaban</span>
          <span>18 phút trước</span>
          <div className={styles.searchTagWrapper}>
            <TagsOutlined />
            <span className={styles.searchTag}>ha noi</span>
            <span className={styles.searchTag}>hue</span>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.notice}>
          <div className={styles.noticeIcon}>
            <ExclamationOutlined />
          </div>
          <div className={styles.noticeContent}>
            <p>Xác minh ảnh thật cho bánh|| Cách Upload ảnh||</p>
          </div>
        </div>
        <div className={styles.notice}>
          <div className={styles.noticeIcon}>
            <ExclamationOutlined />
          </div>
          <div className={styles.noticeContent}>
            <p>
              THÔNG BÁO: Cách truy cập Telegram,Nicegram không bị chặn, không mất phí{' '}
              <a href='/threads/telegram-bi-chan-o-viet-nam.41120/' title='Chặn telegram'>
                Tại đây
              </a>
            </p>
          </div>
        </div>
        <div className={styles.breadcrumbs}>
          <h1>Forums</h1>
          <RightOutlined />
          <h1>Hà Nội</h1>
          <RightOutlined />
          <h1>Cầu Giấy</h1>
        </div>
        <div className={styles.searchBox}>
          <h1>Tìm nhanh theo khu vực</h1>
          <ul className={styles.linkfast}>
            <li>
              <a href='/categories/126/' title=''>
                Hà Nội
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/da-nang.117/' title=''>
                Đà Nẵng
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/nha-trang-khanh-hoa.118/' title=''>
                Nha Trang
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/buon-ma-thuot.125/' title=''>
                Đắk Lắk-BMT
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/hai-phong.86/' title=''>
                Hải Phòng
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/89/' title=''>
                Quảng Ninh
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/ninh-binh.150/' title=''>
                Ninh Bình
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/thanh-hoa.144/' title=''>
                Thanh Hóa
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/nghe-an.152/' title=''>
                Nghệ An
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/tp-vinh-yen-vinh-phuc.143/' title=''>
                Vĩnh Yên-Vĩnh Phúc
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/hai-duong.91/' title=''>
                Hải Dương
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/bac-ninh.107/' title=''>
                Bắc Ninh
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/thanh-pho-bac-giang.162/' title=''>
                Bắc Giang
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/ha-nam.149/' title=''>
                Hà Nam
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/thai-nguyen.88/' title=''>
                Thái Nguyên
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/lam-dong.167/' title=''>
                Đà Lạt
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/binh-duong.98/' title=''>
                Bình Dương
              </a>
            </li>
            <li>
              {' '}
              <a href='/forums/hue-q-tri.120/' title=''>
                TP Huế
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/#mien-bac.64' title=''>
                Miền Bắc
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/#mien-bac.64' title=''>
                Miền Trung
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/#mien-bac.64' title=''>
                Miền Nam
              </a>{' '}
            </li>
            <li>
              {' '}
              <a href='/forums/#mien-bac.64' title=''>
                Vào Diễn Đàn
              </a>{' '}
            </li>
          </ul>
        </div>
        <div className={styles.contentItemList}>
          <div className={styles.leftContent}>
            <div className={styles.leftContentBox}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarBox}>
                  <a href='/' className={styles.avatar}>
                    B
                  </a>

                  <UserOutlined />
                </div>
                <div className={styles.userDetail}>
                  <a href='/' className='username '>
                    Baby2002
                  </a>
                  <div className={styles.role}>
                    <span>role</span>
                  </div>
                  <div className={styles.type}>
                    <span>type</span>
                  </div>
                  <div className={styles.rank}>
                    <span>rank</span>
                  </div>

                  <div className={styles.userMoreInfo}>
                    <UserOutlined />
                    <span>17/1/18</span>
                  </div>
                  <div className={styles.userMoreInfo}>
                    <UserOutlined />
                    <span>17/1/18</span>
                  </div>
                  <div className={styles.userMoreInfo}>
                    <UserOutlined />
                    <span>17/1/18</span>
                  </div>
                </div>
              </div>
              <div className={styles.detail}>
                <span className={styles.timeOnline}>Hôm nay lúc 17h34</span>
                <div className={styles.detailWrapper}>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <DownCircleOutlined />
                      <span>Nghệ danh</span>
                    </div>
                    <p className={styles.userName}>:Lưu Quang Vũ</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <DownCircleOutlined />
                      <span>Nghệ danh</span>
                    </div>
                    <p className={styles.userName}>:Lưu Quang Vũ</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <DownCircleOutlined />
                      <span>Nghệ danh</span>
                    </div>
                    <p className={styles.userName}>:Lưu Quang Vũ</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <DownCircleOutlined />
                      <span>Nghệ danh</span>
                    </div>
                    <p className={styles.userName}>:Lưu Quang Vũ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RightSection></RightSection>
        </div>
      </div>
    </div>
  )
}

export default ProducDetailPage
