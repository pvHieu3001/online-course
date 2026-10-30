import { blogActions } from '@/app/actions'
import { RootState } from '@/app/store'
import { ContextType } from '@/common/types.interface'
import HandleLoading from '../components/util/HandleLoading'
import { getImageUrl } from '@/utils/getImageUrl'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Col, Divider, Layout, Menu, Row, Typography, List } from 'antd'

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

function PageBlog() {
  const location = useLocation()
  const prevContent = useRef('')
  const [title, setTitle] = useState('Tech Culture')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    dataList: dataList,
    recommendList: recommendList,
    isLoading,
    error_message
  } = useSelector((state: RootState) => state.blog)

  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()
  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  useEffect(() => {
    const path = location.pathname.replace(/^\/|\/$/g, '')

    let type = 'technology'
    let title = 'Tech Culture'

    switch (path) {
      case 'game':
        type = 'game'
        title = 'Hot Games'
        break
      case 'san-pham-cong-nghe':
        type = 'technology'
        title = 'Tech Products'
        break
      case 'crypto':
        type = 'crypto'
        title = 'Crypto'
        break
      case 'chung-khoan':
        type = 'stock'
        title = 'Stock'
        break
      case 'thu-thuat-huu-ich':
        type = 'tips'
        title = 'Useful Tips'
        break
      case 'suu-tam':
        type = 'archive'
        title = 'Collections'
        break
    }

    setTitle(title)

    if (prevContent.current !== type) {
      prevContent.current = type
      dispatch(blogActions.getBlogByType(type, '') as unknown as AnyAction)
    }
  }, [location.pathname, dispatch])

  useEffect(() => {
    dispatch(blogActions.getBlogByType(prevContent.current, '') as unknown as AnyAction)
  }, [location.pathname, dispatch])

  const handleDetail = (slug: string) => {
    navigate(`/blog/${slug}`)
  }

  const subNews = [
    { id: 1, title: 'Catalysts Driving the Decline in Global Oil Prices', img: 'https://picsum.photos/seed/oil/400/250' },
    {
      id: 2,
      title: 'The Golden Era of London Coffee Houses Returns',
      img: 'https://picsum.photos/seed/coffee/400/250'
    },
    { id: 3, title: '5 Strategic Milestones for Public Broadcast Quality', img: 'https://picsum.photos/seed/radio/400/250' },
    { id: 4, title: 'Igniting Innovation Across Contemporary Publishing', img: 'https://picsum.photos/seed/book/400/250' }
  ]

  const menuItems = [
    { key: '1', label: 'Trending Content' },
  ]

  const newsList = [
    {
      id: 1,
      title: 'Why Daily Physical Exercise Sharpens Cognitive Performance',
      time: '23:51 11/4/2026',
      desc: 'At the molecular level, cognitive researchers uncover how mental exertion and physical vitality converge.',
      image: 'https://picsum.photos/seed/brain/300/200'
    },
    {
      id: 2,
      title: 'When Artificial Intelligence Becomes an Essential Life Skill',
      time: '23:08 11/4/2026',
      desc: 'AI is no longer a distant theoretical vision; it is actively transforming everyday workflows, decisions, and creative endeavors...',
      image: 'https://picsum.photos/seed/ai-skill/300/200'
    },
    {
      id: 3,
      title: 'Preserving Ancient Inscriptions and Epigraphic Heritage',
      time: '22:58 11/4/2026',
      desc: 'In an era of relentless digital acceleration, dedicated archivists rescue invaluable cultural manuscripts from obscurity...',
      image: 'https://picsum.photos/seed/champa/300/200'
    },
    {
      id: 4,
      title: 'Navigating Power Dynamics and Rebuilding Trust in Modern Relationships',
      time: '14:12 11/4/2026',
      desc: 'Clinical psychologists unpack the emotional consequences, negotiations, and therapeutic paths following infidelity...',
      image: 'https://picsum.photos/seed/marriage/300/200'
    }
  ]

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='bg-gray-100 min-h-screen'>
        <Helmet>
          <title>Global Times || {title}</title>
          <meta
            name='description'
            content={`Read the latest coverage on "${title}" at Global Times to discover new insights.`}
          />
        </Helmet>
        <div className='bg-gray-100 min-h-screen pb-16'>
          <Layout className='min-h-screen bg-white'>
            <Header className='bg-white h-auto py-8 text-center border-none'>
              <h1 className='text-5xl font-black tracking-[0.2em] uppercase m-0 text-black'>Blogs</h1>
            </Header>
            <div className='max-w-[1200px] mx-auto w-full border-t border-b border-gray-200'>
              <Menu
                mode='horizontal'
                items={menuItems}
                className='justify-center border-none font-bold text-[13px] uppercase tracking-wider'
                disabledOverflow
              />
            </div>

            <Content className='max-w-[1200px] mx-auto p-6 md:p-10 w-full'>
              <Row gutter={[32, 32]} className='mb-12'>
                <Col xs={24} md={16}>
                  <div className='group cursor-pointer'>
                    <div className='overflow-hidden mb-4'>
                      <img
                        src='https://picsum.photos/seed/skincare/800/500'
                        alt='Main article'
                        className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    </div>
                    <Title
                      level={2}
                      className='!text-sky-800 !text-2xl !mb-4 group-hover:!text-sky-600 transition-colors'
                    >
                      The Natural Laws of Survival and Resource Partitioning
                    </Title>
                    <Paragraph className='text-gray-600 text-base leading-relaxed'>
                      When species compete for the same scarce resources, subtle evolutionary adaptations enable unexpected coexistence.
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className='flex flex-col gap-8'>
                    <div className='group cursor-pointer'>
                      <img
                        src='https://picsum.photos/seed/industry/400/250'
                        className='w-full aspect-[16/10] object-cover mb-3'
                        alt='Industry'
                      />
                      <h3 className='text-lg font-bold leading-tight group-hover:text-sky-800'>
                        The Most Disruptive Industrial Revolution in Modern History
                      </h3>
                    </div>

                    <Divider className='m-0 md:hidden' />

                    <div className='group cursor-pointer'>
                      <img
                        src='https://picsum.photos/seed/king/400/250'
                        className='w-full aspect-[16/10] object-cover mb-3'
                        alt='History'
                      />
                      <h3 className='text-lg font-bold leading-tight group-hover:text-sky-800'>
                        Historic Artifact Restoration Projects Enter Next Phase of Conservation
                      </h3>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                {subNews.map((item) => (
                  <Col xs={24} sm={12} lg={6} key={item.id}>
                    <div className='group cursor-pointer'>
                      <div className='overflow-hidden mb-3 shadow-sm'>
                        <img
                          src={item.img}
                          alt={item.title}
                          className='w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-110'
                        />
                      </div>
                      <h4 className='text-[15px] font-bold leading-snug group-hover:text-sky-700'>{item.title}</h4>
                    </div>
                  </Col>
                ))}
              </Row>
            </Content>
            <div className='max-w-[1200px] mx-auto p-4 bg-white'>
              <Row gutter={[32, 0]}>
                {/* --- LEFT COLUMN: LATEST NEWS --- */}
                <Col xs={24} lg={16}>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-1.5 h-6 bg-purple-600'></div>
                    <h2 className='text-xl font-bold uppercase m-0'>Latest News</h2>
                  </div>
                  <Divider className='mt-2 mb-6' />

                  <List
                    itemLayout='horizontal'
                    dataSource={newsList}
                    renderItem={(item) => (
                      <div className='flex flex-col sm:flex-row gap-4 mb-8 group cursor-pointer'>
                        {/* News Image */}
                        <div className='w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-sm'>
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105'
                          />
                        </div>
                        {/* News Content */}
                        <div className='flex-1'>
                          <h3 className='text-lg font-bold leading-tight mb-1 group-hover:text-blue-700 transition-colors'>
                            {item.title}
                          </h3>
                          <div className='text-gray-400 text-xs mb-2'>{item.time}</div>
                          <Paragraph className='text-gray-500 text-sm line-clamp-3'>{item.desc}</Paragraph>
                        </div>
                      </div>
                    )}
                  />
                </Col>

                {/* --- RIGHT COLUMN: SPOTLIGHT --- */}
                <Col xs={24} lg={8}>
                  <div className='bg-sky-50 p-6 rounded-sm relative overflow-hidden'>
                    {/* "SPOTLIGHT" Watermark background */}
                    <div className='absolute right-[-20px] top-1/2 -translate-y-1/2 rotate-90 text-6xl font-black text-sky-100 pointer-events-none select-none'>
                      SPOTLIGHT
                    </div>

                    <div className='relative z-10'>
                      <div className='border-l-2 border-blue-500 pl-3 mb-4'>
                        <Text className='text-xs text-gray-500 uppercase block leading-tight'>
                          Special Retrospective: Five Decades of Cultural Archive
                        </Text>
                      </div>

                      <Title level={3} className='!text-xl !font-bold !leading-tight !mb-4'>
                        Architectural Heritage Captured Through Rare Archival Imagery
                      </Title>

                      <div className='mb-6 shadow-md'>
                        <img
                          src='https://picsum.photos/seed/saigon/400/300'
                          alt='Heritage Book'
                          className='w-full h-auto block'
                        />
                      </div>

                      <ul className='space-y-4 list-none p-0'>
                        <li className='flex gap-3 items-start group cursor-pointer'>
                          <span className='text-blue-500 text-xl font-bold mt-[-4px]'>•</span>
                          <Text className='font-semibold text-[15px] group-hover:text-blue-600 transition-colors'>
                            Five Decades of Independent Publishing and Literary Curation
                          </Text>
                        </li>
                        <Divider className='my-2' />
                        <li className='flex gap-3 items-start group cursor-pointer'>
                          <span className='text-blue-500 text-xl font-bold mt-[-4px]'>•</span>
                          <Text className='font-semibold text-[15px] group-hover:text-blue-600 transition-colors'>
                            Visualizing Decades of Urban Transformation and Economic Growth
                          </Text>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Layout>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageBlog
