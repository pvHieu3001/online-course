import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { bookActions } from '@/app/actions/book.actions'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import HandleLoading from '../components/util/HandleLoading'
import { Helmet } from 'react-helmet-async'
import { Card, Col, Divider, Row, Typography } from 'antd'
import { blogActions } from '@/app/actions/blog.actions'
import dayjs from 'dayjs'
const { Text, Title } = Typography

function PageHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()
  setIsShowRecommendBooks(true)

  const { recommends, isLoading, error_message } = useSelector((state: RootState) => state.book)
  const {
    trendingBlogs,
    newBlogs,
    trendingTechnologyBlogs,
    newTechnologyBlogs,
    newLifeStyleBlogs,
    newTravelBlogs,
    newWorldBlogs,
    newEducationBlogs,
    newScienceBlogs
  } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    dispatch(bookActions.getRecommendBooks() as unknown as AnyAction)
    dispatch(blogActions.getBlogs('', '') as unknown as AnyAction)
  }, [dispatch])

  const handleBlogClick = (slug: string | null | undefined) => {
    if (!slug?.trim()) return

    navigate(`/blog/${slug.trim()}`)
  }

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Wise Owl - International News & Learning</title>
        <meta
          name='description'
          content='Wise Owl News shares global news, profound insights, and learning materials across multiple fields — keeping you informed and educated.'
        />
      </Helmet>
      <div className='bg-gray-100 min-h-screen pb-16'>
        <main className='flex flex-col gap-6 max-w-[1300px] mx-auto'>
          <div className='bg-white p-4'>
            <Row gutter={[24, 24]}>
              <Col xs={{ span: 24, order: 3 }} sm={{ order: 3 }} md={{ order: 2 }} lg={{ span: 6, order: 1 }}>
                <div className='flex flex-col gap-4'>
                  {newBlogs?.map((post, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-4 py-3 border-b border-gray-50 last:border-none group cursor-pointer'
                      onClick={() => handleBlogClick(post.slug)}
                    >
                      <div className='w-24 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100'>
                        <img
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                          src={post.image}
                          alt='Thumbnail'
                        />
                      </div>
                      <div className='flex flex-col justify-center min-w-0'>
                        <Title
                          level={5}
                          className='!m-0 group-hover:text-blue-600 transition-colors line-clamp-2 max-md:!text-base'
                          style={{ fontSize: '0.8rem', lineHeight: '1.3', fontWeight: '500' }}
                        >
                          {post.description}
                        </Title>
                        <span className='text-gray-400 text-[9px] mt-1 font-medium'>
                          {dayjs(post.updatedAt).format('MMMM D, YYYY')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>

              <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
                <div
                  className='w-full h-full rounded-lg text-center overflow-hidden bg-white'
                  onClick={() => handleBlogClick(trendingBlogs?.[0]?.slug || '')}
                >
                  <div className='w-full mb-1 mt-3'>
                    <img
                      className='w-full h-72 sm:h-96 object-cover block'
                      src={trendingBlogs?.[0]?.image || 'https://picsum.photos/800/400?random=1'}
                      alt='Thumbnail'
                    />
                  </div>

                  <div className='px-4 pb-6'>
                    <Title level={3} className='!mb-3'>
                      {trendingBlogs?.[0]?.description || 'Global Markets Rally as Tech Stocks Hit New Record Highs'}
                    </Title>
                    <Text className='text-gray-400 font-bold block'>
                      {trendingBlogs?.[0]?.content ||
                        'Analysts predict continued sustained growth into the next quarter of 2026.'}
                    </Text>
                  </div>
                </div>
              </Col>

              <Col xs={{ span: 24, order: 2 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ span: 6, order: 3 }}>
                <div className='flex flex-col gap-5 h-[500px] max-md:flex-row max-md:gap-3 max-md:h-auto'>
                  {trendingBlogs &&
                    trendingBlogs.length > 1 &&
                    trendingBlogs.slice(1, 3).map((blog, index) => (
                      <div
                        key={blog.id || index}
                        className='h-[240px] flex-none min-w-0 flex flex-col rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 bg-white border border-gray-100 max-md:h-auto max-md:flex-1 max-md:rounded-lg'
                        onClick={() => handleBlogClick(blog.slug)}
                      >
                        <div className='w-full flex-1 overflow-hidden max-md:h-20 max-md:flex-none'>
                          <img
                            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                            src={blog.image || `https://picsum.photos/800/600?random=${index + 10}`}
                            alt={blog.title || 'news'}
                          />
                        </div>

                        <div className='p-4 flex-shrink-0 bg-white max-md:p-2'>
                          <Text
                            className='font-bold group-hover:text-blue-600 transition-colors line-clamp-2 max-md:!text-sm max-md:!leading-tight'
                            style={{ fontSize: '1rem', lineHeight: '1.4' }}
                          >
                            {blog.title ||
                              'UN calls for immediate ceasefire in ongoing international conflict zones...'}
                          </Text>
                          <div className='flex items-center justify-between mt-2 max-md:mt-1'>
                            <span className='text-gray-400 text-[10px] uppercase font-medium tracking-wider max-md:text-[8px]'>
                              {blog.type || 'Politics'}
                            </span>
                            <span className='text-gray-300 text-[10px] max-md:text-[8px]'>
                              {blog.updatedAt ? dayjs(blog.updatedAt).format('MMMM D, YYYY') : '2 hours ago'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Col>
            </Row>

            <div className='mt-12'>
              <Title
                onClick={() => {
                  navigate(`/books`)
                }}
                level={3}
                className='border-l-4 border-purple-600 pl-3 mb-6 cursor-pointer'
              >
                BOOKS
              </Title>

              <div
                className='flex overflow-x-auto gap-4 pb-4 snap-x [&::-webkit-scrollbar]:hidden'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {recommends?.map((item) => (
                  <div key={item.id} className='w-[150px] md:w-[180px] lg:w-[200px] flex-shrink-0 snap-start'>
                    <Card
                      hoverable
                      className='h-full'
                      bodyStyle={{ padding: '12px' }}
                      cover={
                        <div className='h-48 md:h-56 overflow-hidden rounded-t-lg border-b border-gray-100 bg-gray-50 flex items-center justify-center'>
                          <img
                            src={item.imageUrl}
                            className='w-full h-full object-contain transition-transform duration-300 hover:scale-105'
                            alt='book cover'
                          />
                        </div>
                      }
                    >
                      <Text strong className='line-clamp-2 text-center block w-full' style={{ fontSize: '0.85rem' }}>
                        {item.name || 'Book name not available'}
                      </Text>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-12'>
              <Row gutter={[24, 24]}>
                <Col xs={24} xl={18}>
                  <div className='flex items-center gap-4 mb-4 border-b border-gray-100 pb-2 flex-wrap'>
                    <Title
                      onClick={() => {
                        navigate(`/blogs/technology`)
                      }}
                      level={3}
                      className='border-l-4 border-purple-600 pl-3 mb-6 cursor-pointer'
                    >
                      TECHNOLOGY
                    </Title>
                  </div>
                  {/* Main article row */}
                  <Row
                    gutter={[24, 24]}
                    className='mb-8'
                    onClick={() => handleBlogClick(trendingTechnologyBlogs?.[0]?.slug || '')}
                  >
                    <Col xs={{ span: 24, order: 2 }} md={{ span: 10, order: 1 }} className='max-md:text-center'>
                      <Title
                        level={2}
                        className='!mb-4 hover:text-blue-700 cursor-pointer transition-colors max-md:!mb-3 max-md:!text-2xl'
                      >
                        {trendingTechnologyBlogs?.[0]?.title || 'Tech Giants Pioneer 6G Networks Ahead of Schedule'}
                      </Title>
                      <Text className='text-gray-500 leading-relaxed max-md:text-gray-400 max-md:font-bold max-md:block'>
                        {trendingTechnologyBlogs?.[0]?.content ||
                          'In a surprising turn of events, leading technology companies have announced the early deployment of 6G networks, promising faster speeds and lower latency than ever before.'}
                      </Text>
                    </Col>
                    <Col xs={{ span: 24, order: 1 }} md={{ span: 14, order: 2 }}>
                      <div className='rounded-lg overflow-hidden h-auto md:h-[350px] aspect-video md:aspect-auto'>
                        <img
                          src={trendingTechnologyBlogs?.[0]?.image || 'https://picsum.photos/800/400?tech-main'}
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                          alt='Main News'
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* 4 sub-articles row */}
                  <Row gutter={[16, 16]}>
                    {trendingTechnologyBlogs?.slice(1, 5).map((item, index) => (
                      <Col xs={12} sm={12} md={6} key={index}>
                        <div className='group cursor-pointer' onClick={() => handleBlogClick(item.slug)}>
                          <div className='h-32 rounded-lg overflow-hidden mb-3'>
                            <img
                              src={item.image || `https://picsum.photos/400/250?random=${index}`}
                              className='w-full h-full object-cover group-hover:scale-110 transition-transform'
                              alt='sub'
                            />
                          </div>
                          <Title level={5} className='!text-[0.9rem] line-clamp-3 group-hover:text-blue-600'>
                            {item.title || `Sub Article ${index + 1}`}
                          </Title>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Divider type='horizontal' className='h-1 hidden md:block' />
                </Col>
                <Col xs={24} xl={6} className='max-md:hidden'>
                  <div className='sticky top-4 mt-8 xl:mt-0'>
                    <div className='mt-6 bg-gray-100 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300'>
                      <Text className='text-gray-400 font-bold uppercase tracking-widest text-[10px]'>
                        Advertisement
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className='mt-12'>
              <Row gutter={[24, 48]}>
                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/technology')}
                    >
                      Technology
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newTechnologyBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newTechnologyBlogs?.[0]?.image || 'https://picsum.photos/400/250?tech-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newTechnologyBlogs?.[0]?.title || 'Main Tech News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newTechnologyBlogs?.[0]?.title || 'Main Tech News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newTechnologyBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/lifestyle')}
                    >
                      Lifestyle
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newLifeStyleBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newLifeStyleBlogs?.[0]?.image || 'https://picsum.photos/400/250?tech-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newLifeStyleBlogs?.[0]?.title || 'Main Lifestyle News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newLifeStyleBlogs?.[0]?.title || 'Main Lifestyle News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newLifeStyleBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/travel')}
                    >
                      Travel
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newTravelBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newTravelBlogs?.[0]?.image || 'https://picsum.photos/400/250?tech-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newTravelBlogs?.[0]?.title || 'Main Travel News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newTravelBlogs?.[0]?.title || 'Main Travel News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newTravelBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/education')}
                    >
                      Education
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newEducationBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newEducationBlogs?.[0]?.image || 'https://picsum.photos/400/250?edu-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newEducationBlogs?.[0]?.title || 'Main Education News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newEducationBlogs?.[0]?.title || 'Main Education News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newEducationBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/science')}
                    >
                      Science
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newScienceBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newScienceBlogs?.[0]?.image || 'https://picsum.photos/400/250?science-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newScienceBlogs?.[0]?.title || 'Main Science News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newScienceBlogs?.[0]?.title || 'Main Science News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newScienceBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                    <span className='w-1 h-4 bg-red-600 inline-block'></span>
                    <Text
                      className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'
                      onClick={() => navigate('/blogs/world')}
                    >
                      World
                    </Text>
                  </div>
                  <div
                    className='group cursor-pointer mb-4'
                    onClick={() => handleBlogClick(newWorldBlogs?.[0]?.slug || '')}
                  >
                    <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                      <img
                        src={newWorldBlogs?.[0]?.image || 'https://picsum.photos/400/250?world-main'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        alt={newWorldBlogs?.[0]?.title || 'Main World News'}
                      />
                    </div>
                    <Title
                      level={5}
                      className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                    >
                      {newWorldBlogs?.[0]?.title || 'Main World News'}
                    </Title>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {newWorldBlogs?.slice(1, 5).map((sub, sIdx) => (
                      <div key={sIdx} className='border-t border-gray-100 pt-3'>
                        <Text
                          onClick={() => handleBlogClick(sub.slug)}
                          className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'
                        >
                          {sub.title}
                        </Text>
                      </div>
                    ))}
                  </div>
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
