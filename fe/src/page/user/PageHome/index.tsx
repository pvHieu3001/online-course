import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useNavigate, useOutletContext } from 'react-router-dom'
import TabCategory from '../components/TabCategory'
import { RootState } from '@/app/store'
import { ContextType, IProduct } from '@/common/types.interface'
import Description from './Description'
import Link from 'antd/es/typography/Link'
import { getImageUrl } from '@/utils/getImageUrl'
import HandleLoading from '@/page/admin/components/util/HandleLoading'
import { Helmet } from 'react-helmet-async'
import { Avatar, Button, Card, Col, Row, Tag, Typography } from 'antd'
import Paragraph from 'antd/es/skeleton/Paragraph'
const { Text, Title } = Typography

function PageHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setIsShowRecommendCourses } = useOutletContext<ContextType>()
  setIsShowRecommendCourses(true)

  const { quickViews, isLoading, error_message } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(courseActions.getQuickViewCourses() as unknown as AnyAction)
  }, [dispatch])

  const handleDetail = (slug: string) => {
    navigate(`/chi-tiet-khoa-hoc/${slug}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Free Resource Sharing Website - Quality Materials</title>
        <meta
          name='description'
          content='Hocfree platform shares free learning materials across multiple fields — helping students, teachers, and learners access high-quality resources easily and quickly.'
        />
      </Helmet>
      <div className='bg-gray-100 min-h-screen pb-16'>
        <main className='flex flex-col gap-6 max-w-[1300px] mx-auto'>
          <div className='bg-white'>
            <div className='flex gap-2 mt-4'>
              <Tag color='error' className='rounded-full p-1'>
                # Mỹ và Israel tấn công Iran
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Nghị quyết Đại hội XIV
              </Tag>
            </div>

            <Row gutter={[24, 24]}>
              <Col span={6}>
                <div className='flex flex-col gap-4 mt-4'>
                  <div className='flex flex-col sm:flex-row max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300'>
                    <div className='w-full sm:w-40 h-[120px] flex-shrink-0 overflow-hidden'>
                      <img
                        className='w-full h-full object-cover block'
                        src='https://picsum.photos/400/400'
                        alt='Thumbnail'
                      />
                    </div>
                    <div className='p-5 flex flex-col justify-between flex-1'>
                      <Title level={5} className='!mt-0 !mb-2' style={{ fontSize: '0.8rem' }}>
                        Tối ưu hóa Java Spring Boot với cơ chế Retry API
                      </Title>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className='w-full h-full rounded-lg text-center overflow-hidden bg-white'>
                  <div className='w-full mb-6'>
                    <img
                      className='w-full h-72 sm:h-96 object-cover block'
                      src='https://picsum.photos/800/400'
                      alt='Thumbnail'
                    />
                  </div>

                  <div className='px-4 pb-6'>
                    <Title level={2} className='!mb-3'>
                      Quốc hội khóa XVI có 6 Phó chủ tịch
                    </Title>
                    <Text className='text-red-600 font-bold block'>
                      • Bí thư Hưng Yên Nguyễn Hữu Nghĩa làm Tổng Kiểm toán Nhà nước
                    </Text>
                  </div>
                </div>
              </Col>

              {/* Cột Phải - Tin ảnh lớn bên phải */}
              <Col span={6}>
                <div className='flex flex-col gap-6'>
                  <Card cover={<img src='iran.png' />} bordered={false} bodyStyle={{ padding: '12px 0' }}>
                    <Text className='font-bold text-lg'>Iran bác đề xuất 45 ngày ngừng bắn...</Text>
                  </Card>
                </div>
              </Col>
            </Row>

            {/* Section Books phía dưới */}
            <div className='mt-12'>
              <Title level={3} className='border-l-4 border-purple-600 pl-3'>
                BOOKS
              </Title>
              <Row gutter={[16, 16]}>
                {/* Card cho sách - Lặp lại 6 lần */}
                <Col span={4}>
                  <Card cover={<img src='book1.png' className='h-40 object-cover' />} bordered={false}>
                    <Text strong>So sánh thú vị của...</Text>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </main>
      </div>
    </HandleLoading>
  )
}

export default PageHome
