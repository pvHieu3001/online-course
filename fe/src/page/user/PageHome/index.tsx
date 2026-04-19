import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import HandleLoading from '../components/util/HandleLoading'
import { Helmet } from 'react-helmet-async'
import { Card, Carousel, Col, Divider, Row, Tag, Typography } from 'antd'
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

  const posts = Array(5).fill({
    title: 'Tech Giants Announce Breakthroughs in Next-Gen AI Models',
    date: 'April 11, 2026',
    img: 'https://picsum.photos/400/400'
  })

  // Category Mock Data
  const categories = [
    {
      name: 'Technology',
      mainPost: { title: 'New MacBook Neo Sells Out Instantly in Stores', img: 'https://picsum.photos/400/250?tech' },
      subPosts: ['Tech Giants Pioneer 6G Networks Ahead of Schedule', 'Artemis II Crew Shares Heartwarming Updates']
    },
    {
      name: 'Lifestyle',
      mainPost: { title: 'Major Cities Grapple with Unprecedented Heatwaves', img: 'https://picsum.photos/400/250?life' },
      subPosts: ['The Hidden Costs of Modern Dating Revealed', 'Viral Video Sparks Debate on Work-Life Balance']
    },
    {
      name: 'Travel',
      mainPost: {
        title: 'New Regulations Aim to Protect Vulnerable Tourist Hotspots',
        img: 'https://picsum.photos/400/250?travel'
      },
      subPosts: ['Averting the Holiday Booking Chaos: Tips & Tricks', 'Famous Water Festivals Return with Record Crowds']
    },
    {
      name: 'World',
      mainPost: {
        title: 'Global Leaders Gather for High-Stakes Geopolitical Summit',
        img: 'https://picsum.photos/400/250?world'
      },
      subPosts: ['New Trade Agreements Signal Economic Shifts', 'Historic Meeting Held Between East Asian Leaders']
    },
    {
      name: 'Education',
      mainPost: { title: 'Top 50 Universities Announce Sweeping Tuition Changes', img: 'https://picsum.photos/400/250?edu' },
      subPosts: ['Leading AI Researcher Leaves Ivy League for Startup', 'Education Board Introduces Flexible Learning Hours']
    },
    {
      name: 'Science',
      mainPost: { title: 'Recent Space Probe Discovers Water on Distant Exoplanet', img: 'https://picsum.photos/400/250?science' },
      subPosts: ['Breakthrough in Renewable Energy Storage', 'Climate Scientists Warn of Tipping Points']
    }
  ]

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <Helmet>
        <title>Wise Owl News - International News & Learning</title>
        <meta
          name='description'
          content='Wise Owl News shares global news, profound insights, and learning materials across multiple fields — keeping you informed and educated.'
        />
      </Helmet>
      <div className='bg-gray-100 min-h-screen pb-16'>
        <main className='flex flex-col gap-6 max-w-[1300px] mx-auto'>
          <div className='bg-white p-4'>
            <div className='flex flex-wrap gap-2 ml-2 mt-4 mb-4'>
              <Tag color='error' className='rounded-full p-1'>
                # Middle East Tensions
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Global Economic Summit
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Global Economic Summit
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Global Economic Summit
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Global Economic Summit
              </Tag>
              <Tag color='default' className='rounded-full p-1'>
                # Global Economic Summit
              </Tag>
            </div>

            <Row gutter={[24, 24]}>
              <Col xs={{ span: 24, order: 2 }} lg={{ span: 6, order: 1 }}>
                <div className='flex flex-col gap-4'>
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-4 py-3 border-b border-gray-50 last:border-none group cursor-pointer'
                    >
                      {/* Thumbnail: Fix cứng size, bo góc nhẹ */}
                      <div className='w-24 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100'>
                        <img
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                          src={post.img}
                          alt='Thumbnail'
                        />
                      </div>

                      <div className='flex flex-col justify-center min-w-0'>
                        <Title
                          level={5}
                          className='!m-0 group-hover:text-blue-600 transition-colors line-clamp-2'
                          style={{ fontSize: '0.8rem', lineHeight: '1.3', fontWeight: '500' }}
                        >
                          {post.title}
                        </Title>
                        <span className='text-gray-400 text-[9px] mt-1 font-medium'>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
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
                      Global Markets Rally as Tech Stocks Hit New Record Highs
                    </Title>
                    <Text className='text-red-600 font-bold block'>
                      • Analysts predict continued sustained growth into the next quarter of 2026.
                    </Text>
                  </div>
                </div>
              </Col>

              <Col xs={{ span: 24, order: 3 }} lg={{ span: 6, order: 3 }}>
                <div className='flex flex-col gap-5 h-[500px]'>
                  {[1, 2].map((_, index) => (
                    <div
                      key={index}
                      className='flex-1 flex flex-col rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 bg-white border border-gray-100'
                    >
                      <div className='w-full flex-1 overflow-hidden'>
                        <img
                          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                          src={`https://picsum.photos/800/600?random=${index + 10}`}
                          alt='news'
                        />
                      </div>

                      <div className='p-4 flex-shrink-0 bg-white'>
                        <Text
                          className='font-bold group-hover:text-blue-600 transition-colors line-clamp-2'
                          style={{ fontSize: '1rem', lineHeight: '1.4' }}
                        >
                          UN calls for immediate ceasefire in ongoing international conflict zones...
                        </Text>
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-gray-400 text-[10px] uppercase font-medium tracking-wider'>
                            Politics
                          </span>
                          <span className='text-gray-300 text-[10px]'>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Section Books phía dưới */}
            <div className='mt-12'>
              <Title level={3} className='border-l-4 border-purple-600 pl-3 mb-6'>
                BOOKS
              </Title>

              <div 
                className='flex overflow-x-auto gap-4 pb-4 snap-x [&::-webkit-scrollbar]:hidden'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className='w-[150px] md:w-[180px] lg:w-[200px] flex-shrink-0 snap-start'>
                    <Card
                      hoverable
                      className='h-full'
                      bodyStyle={{ padding: '12px' }}
                      cover={
                        <div className='h-48 md:h-56 overflow-hidden rounded-t-lg border-b border-gray-100'>
                          <img
                            src={`book${item}.png`}
                            className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                            alt='book cover'
                          />
                        </div>
                      }
                    >
                      <Text strong className='line-clamp-2' style={{ fontSize: '0.85rem' }}>
                        The Future of Quantum Computing and AI...
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
                    <Title level={3} className='border-l-4 border-purple-600 pl-3 mb-6'>
                      BUSINESS
                    </Title>
                    <div className='hidden sm:flex gap-4 text-gray-500 text-xs font-medium uppercase'>
                      <span>Entrepreneurs</span>
                      <span>Real Estate</span>
                      <span>Finance & Stocks</span>
                      <span>Markets</span>
                    </div>
                  </div>
                  <Row gutter={[24, 24]} className='mb-8'>
                    <Col xs={24} md={10}>
                      <Title level={2} className='!mb-4 hover:text-blue-700 cursor-pointer transition-colors'>
                        Major Banks Slash Interest Rates Following Central Bank Mandate
                      </Title>
                      <Text className='text-gray-500 leading-relaxed'>
                        Immediately following the urgent policy meeting on April 9th, several commercial banks have reduced their deposit and lending rates, with top-tier financial institutions pioneering the deployment just hours later.
                      </Text>
                    </Col>
                    <Col xs={24} md={14}>
                      <div className='rounded-lg overflow-hidden h-auto md:h-[350px] aspect-video md:aspect-auto'>
                        <img
                          src='https://picsum.photos/800/500'
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                          alt='Main News'
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* 4 sub-articles row */}
                  <Row gutter={[16, 16]}>
                    {[1, 2, 3, 4].map((item) => (
                      <Col xs={24} sm={12} md={6} key={item}>
                        <div className='group cursor-pointer'>
                          <div className='h-32 rounded-lg overflow-hidden mb-3'>
                            <img
                              src={`https://picsum.photos/400/250?random=${item}`}
                              className='w-full h-full object-cover group-hover:scale-110 transition-transform'
                              alt='sub'
                            />
                          </div>
                          <Title level={5} className='!text-[0.9rem] line-clamp-3 group-hover:text-blue-600'>
                            {item === 1 && 'Profile: The New CEO Leading Digital Transformation at AlphaBank'}
                            {item === 2 && 'European Dairy Giant Unveils $100M Investment Plan in Southeast Asia'}
                            {item === 3 && 'Experts Highlight Trillions in Untapped Infrastructure Funds'}
                            {item === 4 && 'Oil Prices See Steepest Weekly Decline Since Early 2022'}
                          </Title>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <Divider type='horizontal' className='h-1 hidden md:block' />

                  <Row gutter={[32, 16]} align='middle'>
                    <Col xs={24} md={6}>
                      <div className='flex flex-col'>
                        <Text className='text-[10px] text-blue-600 font-bold tracking-wider uppercase mb-2'>
                          GOLD PRICES
                        </Text>
                        <div className='flex gap-8'>
                          <div>
                            <div className='text-gray-500 text-[11px]'>BUY</div>
                            <div className='font-bold text-sm'>$2,450.00</div>
                          </div>
                          <div>
                            <div className='text-gray-500 text-[11px]'>SELL</div>
                            <div className='font-bold text-sm'>$2,465.00</div>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Divider type='vertical' className='h-12 hidden md:block' />

                    {/* Tỷ Giá */}
                    <Col xs={24} md={6}>
                      <div className='flex flex-col'>
                        <Text className='text-[10px] text-blue-600 font-bold tracking-wider uppercase mb-2'>
                          EXCHANGE RATES
                        </Text>
                        <div className='space-y-1'>
                          <div className='flex justify-between max-w-[150px]'>
                            <Text className='font-bold text-xs'>EUR/USD</Text>
                            <Text className='text-gray-400 text-[10px]'>
                              BUY <span className='text-black font-medium'>1.0850</span>
                            </Text>
                            <Text className='text-gray-400 text-[10px]'>
                              SELL <span className='text-black font-medium'>1.0855</span>
                            </Text>
                          </div>
                          <div className='flex justify-between max-w-[150px]'>
                            <Text className='font-bold text-xs'>GBP/USD</Text>
                            <Text className='text-gray-400 text-[10px]'>
                              BUY <span className='text-black font-medium'>1.2640</span>
                            </Text>
                            <Text className='text-gray-400 text-[10px]'>
                              SELL <span className='text-black font-medium'>1.2645</span>
                            </Text>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Divider type='vertical' className='h-12 hidden md:block' />

                    {/* Chứng Khoán */}
                    <Col xs={24} md={10}>
                      <div className='flex flex-col'>
                        <Text className='text-[10px] text-blue-600 font-bold tracking-wider uppercase mb-2'>
                          STOCK MARKET
                        </Text>
                        <div className='flex flex-wrap gap-8'>
                          <div className='flex flex-col'>
                            <div className='flex items-center gap-1'>
                              <span className='font-bold text-sm'>S&P 500</span>
                              <span className='text-green-500 text-xs'>▲</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='font-bold text-sm'>5,240.21</span>
                              <span className='text-green-500 text-[11px]'>0.77%</span>
                            </div>
                          </div>

                          <div className='flex flex-col'>
                            <div className='flex items-center gap-1'>
                              <span className='font-bold text-sm'>NASDAQ</span>
                              <span className='text-green-500 text-xs'>▲</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='font-bold text-sm'>16,832.92</span>
                              <span className='text-green-500 text-[11px]'>0.37%</span>
                            </div>
                          </div>

                          <div className='flex flex-col'>
                            <div className='flex items-center gap-1'>
                              <span className='font-bold text-sm'>DOW JONES</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='font-bold text-sm'>39,127.30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                {/* CỘT PHẢI: CHIẾM 6/24 (Banner Quảng cáo / Podcast) */}
                <Col xs={24} xl={6}>
                  <div className='sticky top-4 mt-8 xl:mt-0'>
                    {/* Banner Podcast giống ảnh */}
                    <div className='bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl text-white'>
                      <div className='p-4 bg-gradient-to-b from-red-900/50 to-transparent'>
                        <div className='flex justify-center mb-4'>
                          <span className='bg-white text-black px-3 py-1 rounded-full text-[10px] font-black italic tracking-widest'>
                            PODCAST
                          </span>
                        </div>
                        <div className='relative h-48 rounded-lg overflow-hidden mb-4 border border-gray-800'>
                          <img
                            src='https://picsum.photos/300/400?grayscale'
                            className='w-full h-full object-cover'
                            alt='Podcast'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3'>
                            <Text className='text-white font-bold text-xs'>What Would You Do With $10 Million?</Text>
                          </div>
                        </div>

                        {/* List tin nhỏ trong Banner */}
                        <div className='space-y-4'>
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className='flex gap-3 items-start group cursor-pointer border-b border-gray-800 pb-3 last:border-none'
                            >
                              <img
                                src={`https://picsum.photos/100/100?sig=${i}`}
                                className='w-12 h-12 rounded object-cover'
                                alt='thumb'
                              />
                              <Text className='text-gray-300 text-[11px] font-medium group-hover:text-white line-clamp-2'>
                                {i === 1 && 'Football Legend Shares His Monthly Investment Strategy'}
                                {i === 2 && 'Google CEO Talks AI Over Traditional Iced Coffee'}
                                {i === 3 && 'The Biggest Modern Challenge for Small Business Owners'}
                              </Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quảng cáo phụ bên dưới nếu cần */}
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
                {categories.map((cat, idx) => (
                  <Col key={idx} xs={12} sm={8} lg={4}>
                    {' '}
                    {/* Responsive cột */}
                    {/* Tên chuyên mục */}
                    <div className='flex items-center gap-2 mb-3 border-b border-gray-100 pb-2'>
                      <span className='w-1 h-4 bg-red-600 inline-block'></span>
                      <Text className='uppercase font-bold text-[13px] tracking-tight hover:text-red-600 cursor-pointer'>
                        {cat.name}
                      </Text>
                    </div>
                    {/* Bài viết chính có ảnh */}
                    <div className='group cursor-pointer mb-4'>
                      <div className='aspect-video overflow-hidden rounded-sm mb-3'>
                        <img
                          src={cat.mainPost.img}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                          alt={cat.name}
                        />
                      </div>
                      <Title
                        level={5}
                        className='!text-[14px] !leading-snug font-bold line-clamp-3 group-hover:text-blue-700'
                      >
                        {cat.mainPost.title}
                      </Title>
                    </div>
                    {/* Danh sách tin phụ */}
                    <div className='flex flex-col gap-3'>
                      {cat.subPosts.map((sub, sIdx) => (
                        <div key={sIdx} className='border-t border-gray-100 pt-3'>
                          <Text className='text-[13px] leading-tight text-gray-700 hover:text-blue-600 cursor-pointer line-clamp-2'>
                            {sub}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </main>
      </div>
    </HandleLoading>
  )
}

export default PageHome
