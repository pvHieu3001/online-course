import { useLocation } from 'react-router-dom'

function ProductDetailPage() {
  const location = useLocation()
  const course = location.state
  return (
    <div>
      <header className='max-w-4xl mx-auto mt-8 px-4'>
        <p className='text-sm uppercase tracking-wide text-blue-500'>{course.category?.name}</p>
        <h1 className='text-3xl font-bold mt-2'>{course.name}</h1>
      </header>

      <section className='max-w-4xl mx-auto mt-8 px-4'>
        <img
          src='https://freecoursesites.com/wp-content/uploads/2025/07/Facebook-Ads-2025-Launch-Your-Best-Advertising-Campaign.webp'
          alt='Facebook Ads 2025'
          className='rounded-lg shadow-md w-full'
        />
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4'>
        <h2 className='text-2xl font-semibold mb-4'>Nội Dung Bạn Sẽ Được Đào Tạo</h2>
        <div dangerouslySetInnerHTML={{ __html: course.content }}></div>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4'>
        <h2 className='text-2xl font-semibold mb-4'>Giới Thiệu Khóa Học</h2>
        <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4 bg-white p-6 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>Lý Do Bạn Nên Chọn Khóa Học Này</h2>
        <div dangerouslySetInnerHTML={{ __html: course.courseBenefits }}></div>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4 text-center'>
        <a
          href={course.sourceUrl}
          download
          target='_blank'
          className='inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition'
        >
          Tải Xuống
        </a>
      </section>
      <section className='max-w-4xl mx-auto mt-10 px-4 text-center'></section>
    </div>
  )
}

export default ProductDetailPage
