import { useLocation, useNavigate } from 'react-router-dom'
import TabCategory from '../TabCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { courseActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IProduct } from '@/common/types.interface'

function ProductDetailPage() {
  const dispatch = useDispatch()
  const { dataList: relatedCourses } = useSelector((state: RootState) => state.course)
  const location = useLocation()
  const navigate = useNavigate()
  const course = location.state

  useEffect(() => {
    if (course && course.category?.id) {
      dispatch(courseActions.getCoursesByCategory(course.category.id) as unknown as AnyAction)
    }
  }, [])

  const handleDetail = (courseRelate: IProduct) => {
    navigate(`/chi-tiet-khoa-hoc/${courseRelate.slug}`, { state: courseRelate })
  }

  return (
    <div className='max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8'>
      <div className='lg:w-[80%] w-full'>
        <header className='mt-8'>
          <p className='text-sm uppercase tracking-wide text-blue-500'>{course.category?.name}</p>
          <h1 className='text-3xl font-bold mt-2'>{course.name}</h1>
        </header>

        <section className='mt-8'>
          <img
            src={`${import.meta.env.VITE_DOMAIN_URL}${course.imageUrl}`}
            alt={`${course.name}`}
            className='rounded-lg shadow-md w-full max-w-sm h-48 object-cover'
          />
        </section>

        <section className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Nội Dung Bạn Sẽ Được Đào Tạo</h2>
          <div
            className='text-xl leading-8 text-gray-800 
             [&_p]:mb-4 
             [&_h1]:text-4xl 
             [&_h2]:text-3xl 
             [&_h3]:text-2xl 
             [&_ul]:list-disc 
             [&_ul]:pl-6 
             [&_a]:text-blue-600 [&_a:hover]:underline'
            dangerouslySetInnerHTML={{ __html: course.content }}
          ></div>
        </section>

        <section className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Giới Thiệu Khóa Học</h2>
          <div
            className='text-xl leading-8 text-gray-800 
             [&_p]:mb-4 
             [&_h1]:text-4xl 
             [&_h2]:text-3xl 
             [&_h3]:text-2xl 
             [&_ul]:list-disc 
             [&_ul]:pl-6 
             [&_a]:text-blue-600 [&_a:hover]:underline'
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></div>
        </section>

        <section className='mt-10'>
          <h2 className='text-xl font-semibold mb-4'>Lý Do Bạn Nên Chọn Khóa Học Này</h2>
          <div
            className='text-xl leading-8 text-gray-800 
             [&_p]:mb-4 
             [&_h1]:text-4xl 
             [&_h2]:text-3xl 
             [&_h3]:text-2xl 
             [&_ul]:list-disc 
             [&_ul]:pl-6 
             [&_a]:text-blue-600 [&_a:hover]:underline'
            dangerouslySetInnerHTML={{ __html: course.courseBenefits }}
          ></div>
        </section>

        <section className='mt-10 text-center'>
          <a
            href={course.sourceUrl}
            download
            target='_blank'
            className='inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition'
          >
            Tải Xuống
          </a>
        </section>

        <section className='max-w-7xl mx-auto mt-16 px-4'>
          <h2 className='text-lg font-semibold bg-gray-100 text-gray-800 inline-block px-4 py-2 rounded-t-md shadow'>
            Bạn Cũng Có Thể Thích
          </h2>
          <div className='border-t border-gray-300 mt-2 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {relatedCourses?.slice(0, 3).map((course: IProduct, index: number) => (
              <div
                key={index}
                onClick={() => handleDetail(course)}
                className='relative group rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl'
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_DOMAIN_URL}${course.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '220px'
                }}
              >
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10' />
                <div className='absolute inset-0 z-20 flex flex-col justify-between p-4 text-white'>
                  <span className='bg-sky-500 text-[10px] font-semibold px-2 py-1 rounded uppercase self-start'>
                    {course.category?.name}
                  </span>
                  <h3 className='text-sm sm:text-base font-semibold leading-snug line-clamp-2'>{course.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='max-w-4xl mx-auto mt-10 px-4 text-center'></section>
      </div>

      <TabCategory />
    </div>
  )
}

export default ProductDetailPage
