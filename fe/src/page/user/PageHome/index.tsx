import { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useNavigate } from 'react-router-dom'
import TabCategory from '../TabCategory'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'
import { useQuery } from '@/utils/useQuery'

function PageHome() {
  const query = useQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const courses = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(courseActions.getCourses('active', query.get('search'), false) as unknown as AnyAction)
  }, [query.get('search')])

  const handleDetail = (slug: string) => {
    const course = courses.dataList.find((c: IProduct) => c.slug === slug)
    if (!course) return
    navigate(`/chi-tiet-khoa-hoc/${slug}`, { state: course })
  }

  return (
    <div className={styles.bg}>
      <main className={styles.mainContent} role='main'>
        <section className={styles.courses} aria-label='Course listings'>
          {courses?.dataList?.map((course: IProduct, i: number) => (
            <article className={styles.courseCard} key={i} role='article' onClick={() => handleDetail(course.slug)}>
              <img src={`${import.meta.env.VITE_DOMAIN_URL}${course.imageUrl}`} alt={`${course.name} course image`} />
              <div className={styles.courseCat}>{course.categoryId}</div>
              <h3 className={styles.courseTitle}>{course.name}</h3>
            </article>
          ))}
        </section>

        <TabCategory />
      </main>

      <div className={styles.description} id='description'>
        <div className={styles.description_title}>
          <h1>Chia Sẻ Khóa Học | Chọn & Tải về từ hơn 5000+ khóa học</h1>
        </div>
        <section className={styles.herald_txt}>
          <p>
            Việc tìm một trang web phù hợp để bắt đầu học miễn phí không hề đơn giản. Bạn có thể gặp khó khăn khi tìm
            khóa học mình cần mà không phải trả phí, trừ khi bạn đã biết đến ChiaSeKhoaHoc. Trang web của chúng tôi đứng
            đầu trong việc cung cấp bộ sưu tập khóa học đa dạng từ nhiều lĩnh vực khác nhau.
          </p>
          <p>
            Khi khám phá bộ sưu tập khóa học của chúng tôi, bạn có thể tìm thấy các khóa học về tiếp thị liên kết,
            Photoshop, phát triển Shopify và nhiều danh mục khác. Nói ngắn gọn, ChiaSeKhoaHoc là nơi lý tưởng cho mọi
            hình thức học tập từ các khóa học trực tuyến.
          </p>
          <h2>Giới thiệu về ChiaSeKhoaHoc</h2>
          <p>
            ChiaSeKhoaHoc là giải pháp toàn diện cho những người học không có khả năng chi trả cho các khóa học đắt tiền
            từ các giảng viên trực tuyến. Chúng tôi tin rằng học tập là cần thiết cho tất cả mọi người, không phân biệt
            giàu nghèo. Đó là lý do chúng tôi mang đến danh sách khóa học phong phú mà ai cũng có thể tải về.
          </p>
          <p>
            Dù bạn ở đâu, địa vị xã hội ra sao, hay tình trạng tài chính thế nào, bạn vẫn có thể tải về các khóa học
            miễn phí từ trang web của chúng tôi. Chúng tôi phục vụ mọi người học trên toàn thế giới, không phân biệt bất
            kỳ yếu tố nào ảnh hưởng đến việc học của họ.
          </p>
          <p>
            Từ ChiaSeKhoaHoc, bạn có thể dễ dàng tải về bao nhiêu khóa học tùy thích. Không quan trọng lĩnh vực bạn cần
            là gì, chúng tôi đã bao phủ hầu hết các lĩnh vực có thể học qua khóa học trực tuyến. Bạn có thể khám phá
            phần tiếp theo của trang này để tìm hiểu thêm về danh sách khóa học miễn phí của chúng tôi.
          </p>
          <h2>Danh mục khóa học chính</h2>
          <p>
            Không nghi ngờ gì, ChiaSeKhoaHoc bao gồm nhiều lĩnh vực từ thiết kế 3D đến học HTML, tiếp thị YouTube đến
            chỉnh sửa video và nhiều lĩnh vực khác. Bạn có thể học từ bất kỳ khóa học nào hoàn toàn miễn phí, không cần
            trả phí hay lệ phí.
          </p>
          <p>Một số lĩnh vực chính mà chúng tôi đang phục vụ bao gồm:</p>
          <ul>
            <li>Thiết kế</li>
            <li>Phát triển Web</li>
            <li>Phát triển Ứng dụng</li>
            <li>Lập trình</li>
            <li>Quản lý Cơ sở dữ liệu</li>
            <li>SEO</li>
          </ul>
          <p>
            Nếu bạn mới bắt đầu và muốn học một kỹ năng cụ thể, chúng tôi khuyên bạn nên khám phá các danh mục khóa học
            chính ở trên. ChiaSeKhoaHoc có nhiều hướng dẫn cho từng kỹ năng, giúp bạn thành thạo từ cơ bản đến nâng cao.
            Chỉ cần chuẩn bị máy tính, ghế ngồi và một cuốn sổ để bắt đầu học từ ChiaSeKhoaHoc.
          </p>
          <h2>Ai có thể học từ ChiaSeKhoaHoc?</h2>
          <p>
            Không có giới hạn nào trong việc học dựa trên các yếu tố như giới tính, chủng tộc, độ tuổi hay tình trạng
            tài chính. Bất kỳ ai cũng có thể truy cập ChiaSeKhoaHoc để tìm khóa học mong muốn và trở thành chuyên gia
            trong lĩnh vực của mình.
          </p>
          <p>
            Trang web của chúng tôi không chỉ dành cho người mới bắt đầu hay chuyên gia. Chúng tôi cung cấp các khóa học
            đa dạng để mọi người đều có thể tìm thấy điều mình cần. Dù bạn đã có kiến thức cơ bản hay mới bắt đầu, bạn
            đều có thể học được điều gì đó từ các khóa học của chúng tôi.
          </p>
          <p>
            Hãy khám phá bộ sưu tập khóa học của chúng tôi để tìm khóa học phù hợp với bạn. Điều tuyệt vời là bạn có thể
            đọc mô tả khóa học để biết nội dung bên trong trước khi học.
          </p>
          <h2>Cách tải khóa học từ ChiaSeKhoaHoc?</h2>
          <p>Quá trình tải khóa học từ ChiaSeKhoaHoc rất đơn giản. Bạn chỉ cần thực hiện một vài bước sau:</p>
          <ol>
            <li>Truy cập “ChiaSeKhoaHoc” và tìm khóa học bạn cần</li>
            <li>Nhấp vào khóa học bạn muốn tải</li>
            <li>Cuộn xuống cho đến khi thấy nút “Get Course Now” và nhấp vào đó</li>
            <li>Một trang mới sẽ mở ra, bạn cần chờ 15 giây</li>
            <li>Nhấp vào nút “Get Link” khi nó xuất hiện trên màn hình</li>
            <li>
              Sau đó, khóa học sẽ được thêm vào Google Drive của bạn. Không cần chia sẻ tài khoản Google vì hệ thống sẽ
              tự động chuyển hướng đến Drive. Khi khóa học hiển thị trong Drive, bạn có thể sử dụng tính năng tải về để
              lưu vào máy tính/laptop/điện thoại.
            </li>
          </ol>
          <h2>Tại sao chọn ChiaSeKhoaHoc để tải khóa học?</h2>
          <p>
            Có rất nhiều trang web trên internet cung cấp khóa học miễn phí. Vậy tại sao nên chọn ChiaSeKhoaHoc thay vì
            các trang khác? Dưới đây là một số điểm nổi bật giúp chúng tôi vượt trội hơn:
          </p>
          <h3>Khóa học an toàn</h3>
          <p>
            Từ ChiaSeKhoaHoc, bạn sẽ không nhận được bất kỳ khóa học nào chứa phần mềm độc hại hay tệp nguy hiểm. Chúng
            tôi quan tâm đến sự an toàn của người học và luôn kiểm tra khóa học trước khi chia sẻ. Đội ngũ của chúng tôi
            đảm bảo khóa học không chứa bất kỳ tệp độc hại nào gây ảnh hưởng đến dữ liệu của bạn.
          </p>
          <h3>Bộ sưu tập phong phú</h3>
          <p>
            ChiaSeKhoaHoc cung cấp hơn 5000 khóa học từ nhiều danh mục khác nhau, bao gồm cả các lĩnh vực chính đã nêu ở
            trên. Bạn có thể tìm kiếm khóa học mình cần và dễ dàng khám phá bộ sưu tập để chọn khóa học phù hợp nhất.
          </p>
          <h3>Không cần đăng ký</h3>
          <p>
            Một lợi ích lớn khác khi truy cập trang web của chúng tôi là bạn không cần đăng ký hay tạo tài khoản. Bạn có
            thể tự do duyệt trang web như <a href='https://thedownloadly.com/'>Downloadly</a>, tải khóa học và học tập.
            Chúng tôi sẽ không yêu cầu thông tin đăng ký hay bất kỳ dữ liệu cá nhân nào.
          </p>
          <h3>Giao diện tải về dễ sử dụng</h3>
          <p>
            Ngoài ra, ChiaSeKhoaHoc có phương thức tải khóa học tích hợp sẵn. Bạn có thể dễ dàng tải bất kỳ khóa học nào
            chỉ với vài bước đơn giản mà không gặp khó khăn. Trình tải khóa học của chúng tôi có giao diện thân thiện,
            phù hợp với mọi người dùng.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PageHome
