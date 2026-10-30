import { blogActions } from '@/app/actions'
import { RootState } from '@/app/store'
import { ContextType, IBlog } from '@/common/types.interface'
import HandleLoading from '../components/util/HandleLoading'
import { getImageUrl } from '@/utils/getImageUrl'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Col, Divider, Layout, Row, Typography, List } from 'antd'

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

interface CategoryItem {
  key: string
  label: string
  path: string
  type: string
}

const CATEGORIES: CategoryItem[] = [
  { key: 'all', label: 'All Articles', path: '/blogs', type: 'all' },
  { key: 'technology', label: 'Technology', path: '/blogs/technology', type: 'technology' },
  { key: 'lifestyle', label: 'Lifestyle', path: '/blogs/lifestyle', type: 'lifestyle' },
  { key: 'travel', label: 'Travel', path: '/blogs/travel', type: 'travel' },
  { key: 'world', label: 'World News', path: '/blogs/world', type: 'world' },
  { key: 'education', label: 'Education', path: '/blogs/education', type: 'education' },
  { key: 'science', label: 'Science', path: '/blogs/science', type: 'science' }
]

const ALIAS_CATEGORY_MAP: Record<string, { type: string; title: string }> = {
  'san-pham-cong-nghe': { type: 'technology', title: 'Technology' }
}

function PageBlog() {
  const { slug } = useParams<{ slug?: string }>()
  const prevCategory = useRef('')
  const [activeKey, setActiveKey] = useState('all')
  const [categoryTitle, setCategoryTitle] = useState('All Articles')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    dataList = [],
    recommendList = [],
    trendingBlogs = [],
    newBlogs = [],
    isLoading,
    error_message
  } = useSelector((state: RootState) => state.blog)

  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  const heroImageRef = useRef<HTMLDivElement>(null)
  const [heroImageHeight, setHeroImageHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const el = heroImageRef.current
    if (!el) return

    const updateHeight = () => {
      if (window.innerWidth >= 768) {
        setHeroImageHeight(el.clientHeight)
      } else {
        setHeroImageHeight(undefined)
      }
    }

    updateHeight()

    const observer = new ResizeObserver(() => {
      updateHeight()
    })
    observer.observe(el)
    window.addEventListener('resize', updateHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])


  // Resolve category from slug
  useEffect(() => {
    const rawSlug = slug ? slug.trim().toLowerCase() : 'all'

    let resolvedType = 'all'
    let resolvedTitle = 'All Articles'
    let matchedKey = 'all'

    if (rawSlug === 'all' || !slug) {
      resolvedType = 'all'
      resolvedTitle = 'All Articles'
      matchedKey = 'all'
    } else if (ALIAS_CATEGORY_MAP[rawSlug]) {
      resolvedType = ALIAS_CATEGORY_MAP[rawSlug].type
      resolvedTitle = ALIAS_CATEGORY_MAP[rawSlug].title
      matchedKey = resolvedType
    } else {
      const found = CATEGORIES.find((cat) => cat.key === rawSlug)
      if (found) {
        resolvedType = found.type
        resolvedTitle = found.label
        matchedKey = found.key
      } else {
        // Fallback for custom slug
        resolvedType = rawSlug
        resolvedTitle = rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1)
        matchedKey = rawSlug
      }
    }

    setActiveKey(matchedKey)
    setCategoryTitle(resolvedTitle)

    if (prevCategory.current !== resolvedType) {
      prevCategory.current = resolvedType
      if (resolvedType === 'all') {
        dispatch(blogActions.getBlogs('', '') as unknown as AnyAction)
        dispatch(blogActions.getBlogByType('technology', '') as unknown as AnyAction)
      } else {
        dispatch(blogActions.getBlogByType(resolvedType, '') as unknown as AnyAction)
      }
    }
  }, [slug, dispatch])

  const handleCategoryClick = (category: CategoryItem) => {
    navigate(category.path)
  }

  const handleDetail = (articleSlug: string) => {
    if (articleSlug) {
      navigate(`/blog/${articleSlug}`)
    }
  }

  // Combine dynamic blogs from dataList or trending/new
  const activeBlogs: IBlog[] =
    Array.isArray(dataList) && dataList.length > 0
      ? dataList
      : Array.isArray(trendingBlogs) && trendingBlogs.length > 0
      ? trendingBlogs
      : []

  const activeRecommends: IBlog[] =
    Array.isArray(recommendList) && recommendList.length > 0
      ? recommendList
      : Array.isArray(newBlogs) && newBlogs.length > 0
      ? newBlogs
      : []

  // Fallback curated content when no blogs in DB yet
  const fallbackMain = {
    title: 'The Natural Laws of Survival and Resource Partitioning in Modern Ecosystems',
    desc: 'When organizations and species compete for the same scarce resources, subtle adaptive strategies enable unexpected coexistence and sustainable growth.',
    image: 'https://picsum.photos/seed/survival/800/500',
    slug: ''
  }

  const fallbackSecondary = [
    {
      title: 'The Most Disruptive Technological Transformations in Modern Industry',
      image: 'https://picsum.photos/seed/industry/400/250',
      slug: ''
    },
    {
      title: 'Historic Preservation and Archival Restoration Enter Next Phase',
      image: 'https://picsum.photos/seed/archival/400/250',
      slug: ''
    }
  ]

  const fallbackSubNews = [
    { id: 1, title: 'Catalysts Driving Strategic Energy Shifts in Global Markets', img: 'https://picsum.photos/seed/oil/400/250' },
    { id: 2, title: 'The Golden Era of Urban Culture and Collaborative Workspaces', img: 'https://picsum.photos/seed/coffee/400/250' },
    { id: 3, title: 'Five Strategic Milestones for High-Impact Editorial Broadcasting', img: 'https://picsum.photos/seed/radio/400/250' },
    { id: 4, title: 'Igniting Creative Innovation Across Contemporary Publishing', img: 'https://picsum.photos/seed/book/400/250' }
  ]

  const fallbackLatestNews = [
    {
      id: 1,
      title: 'Why Regular Physical Exercise Sharpens Cognitive Performance and Focus',
      time: 'Published Recently',
      desc: 'At the molecular level, cognitive researchers uncover how mental exertion and vitality converge to boost long-term retention.',
      image: 'https://picsum.photos/seed/brain/300/200'
    },
    {
      id: 2,
      title: 'When Artificial Intelligence Becomes an Essential Professional Workflow',
      time: 'Published Recently',
      desc: 'AI has transitioned from speculative vision to essential daily infrastructure, shaping decision making and creative productivity.',
      image: 'https://picsum.photos/seed/ai-skill/300/200'
    },
    {
      id: 3,
      title: 'Preserving Ancient Inscriptions and Epigraphic Heritage in Digital Era',
      time: 'Published Recently',
      desc: 'Dedicated archival curators utilize cutting-edge photogrammetry to safeguard fragile manuscripts and historic architectural records.',
      image: 'https://picsum.photos/seed/champa/300/200'
    },
    {
      id: 4,
      title: 'Navigating Communication Dynamics and Cultivating Trust in Teams',
      time: 'Published Recently',
      desc: 'Organizational psychologists break down the key ingredients to effective collaboration, constructive feedback, and mutual respect.',
      image: 'https://picsum.photos/seed/marriage/300/200'
    }
  ]

  const mainBlog = activeBlogs[0]
  const secondBlog = activeBlogs[1]
  const thirdBlog = activeBlogs[2]
  const gridBlogs = activeBlogs.length > 3 ? activeBlogs.slice(3, 7) : []
  const latestList = activeBlogs.length > 7 ? activeBlogs.slice(7) : (activeRecommends.length > 0 ? activeRecommends : [])

  return (
    <HandleLoading isLoading={isLoading} error_message={error_message}>
      <div className='bg-gray-100 min-h-screen'>
        <Helmet>
          <title>Global Times || {categoryTitle}</title>
          <meta
            name='description'
            content={`Read the latest coverage on ${categoryTitle} at Global Times to discover new insights.`}
          />
        </Helmet>
        <div className='bg-gray-100 min-h-screen pb-16'>
          <Layout className='min-h-screen bg-white'>
            {/* Header Title */}
            <Header className='bg-white h-auto py-8 text-center border-none'>
              <h1 className='text-4xl sm:text-5xl font-black tracking-[0.2em] uppercase m-0 text-slate-900'>
                {categoryTitle}
              </h1>
              <p className='text-gray-500 text-sm mt-2 max-w-xl mx-auto'>
                Explore curated editorial articles, investigative stories, and industry perspectives.
              </p>
            </Header>

            {/* Category Navigation Pills */}
            <div className='max-w-[1240px] mx-auto w-full border-t border-b border-gray-200 px-4'>
              <nav
                aria-label='Blog Categories'
                className='flex items-center justify-start sm:justify-center gap-1 sm:gap-2 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide'
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeKey === category.key
                  return (
                    <button
                      key={category.key}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-black'
                      }`}
                    >
                      {category.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content Area */}
            <Content className='max-w-[1240px] mx-auto p-4 sm:p-6 md:p-10 w-full'>
              {/* Hero Section: 1 Main + 2 Side Articles */}
              <Row gutter={[32, 32]} className='mb-12' align='top'>
                {/* Main Hero Card */}
                <Col xs={24} md={16}>
                  <div
                    className='group cursor-pointer'
                    onClick={() => handleDetail(mainBlog?.slug || fallbackMain.slug)}
                  >
                    <div ref={heroImageRef} className='overflow-hidden rounded-md mb-4 aspect-[16/10] bg-gray-100 shadow-sm'>
                      <img
                        src={mainBlog?.image ? getImageUrl(mainBlog.image) : fallbackMain.image}
                        alt={mainBlog?.title || fallbackMain.title}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    </div>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase rounded'>
                        {mainBlog?.type || categoryTitle}
                      </span>
                      {mainBlog?.updatedAt && (
                        <span className='text-gray-400 text-xs'>
                          {new Date(mainBlog.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <Title
                      level={2}
                      className='!text-slate-900 !text-2xl sm:!text-3xl !font-bold !mb-3 group-hover:!text-blue-700 transition-colors'
                    >
                      {mainBlog?.title || fallbackMain.title}
                    </Title>
                    <Paragraph className='text-gray-600 text-base leading-relaxed line-clamp-3'>
                      {mainBlog?.description || fallbackMain.desc}
                    </Paragraph>
                  </div>
                </Col>

                {/* Secondary Cards */}
                <Col xs={24} md={8}>
                  <div
                    className='flex flex-col justify-between gap-4'
                    style={heroImageHeight ? { height: `${heroImageHeight}px` } : undefined}
                  >
                    {/* Secondary Article 1 */}
                    <div
                      className='flex-1 flex flex-col min-h-0 group cursor-pointer'
                      onClick={() => handleDetail(secondBlog?.slug || fallbackSecondary[0].slug)}
                    >
                      <div className='aspect-[16/10] md:aspect-auto flex-1 overflow-hidden rounded-md mb-2 bg-gray-100 shadow-sm min-h-0'>
                        <img
                          src={secondBlog?.image ? getImageUrl(secondBlog.image) : fallbackSecondary[0].image}
                          alt={secondBlog?.title || fallbackSecondary[0].title}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>
                      <h3 className='text-sm sm:text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-0 flex-shrink-0'>
                        {secondBlog?.title || fallbackSecondary[0].title}
                      </h3>
                    </div>

                    <Divider className='my-0' />

                    {/* Secondary Article 2 */}
                    <div
                      className='flex-1 flex flex-col min-h-0 group cursor-pointer'
                      onClick={() => handleDetail(thirdBlog?.slug || fallbackSecondary[1].slug)}
                    >
                      <div className='aspect-[16/10] md:aspect-auto flex-1 overflow-hidden rounded-md mb-2 bg-gray-100 shadow-sm min-h-0'>
                        <img
                          src={thirdBlog?.image ? getImageUrl(thirdBlog.image) : fallbackSecondary[1].image}
                          alt={thirdBlog?.title || fallbackSecondary[1].title}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>
                      <h3 className='text-sm sm:text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-0 flex-shrink-0'>
                        {thirdBlog?.title || fallbackSecondary[1].title}
                      </h3>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* 4-Item Grid */}
              <div className='mb-12'>
                <Row gutter={[24, 24]}>
                  {gridBlogs.length > 0
                    ? gridBlogs.map((item) => (
                        <Col xs={24} sm={12} lg={6} key={item.id}>
                          <div className='group cursor-pointer' onClick={() => handleDetail(item.slug)}>
                            <div className='overflow-hidden rounded-md mb-3 aspect-[16/10] bg-gray-100 shadow-sm'>
                              <img
                                src={item.image ? getImageUrl(item.image) : 'https://picsum.photos/seed/' + item.slug + '/400/250'}
                                alt={item.title}
                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                              />
                            </div>
                            <h4 className='text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2'>
                              {item.title}
                            </h4>
                          </div>
                        </Col>
                      ))
                    : fallbackSubNews.map((item) => (
                        <Col xs={24} sm={12} lg={6} key={item.id}>
                          <div className='group cursor-pointer'>
                            <div className='overflow-hidden rounded-md mb-3 aspect-[16/10] bg-gray-100 shadow-sm'>
                              <img
                                src={item.img}
                                alt={item.title}
                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                              />
                            </div>
                            <h4 className='text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2'>
                              {item.title}
                            </h4>
                          </div>
                        </Col>
                      ))}
                </Row>
              </div>

              {/* Two Column Layout: Latest Articles vs Spotlight */}
              <Row gutter={[32, 32]}>
                {/* Left Column: Latest News List */}
                <Col xs={24} lg={16}>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-1.5 h-6 bg-blue-600 rounded-sm'></div>
                    <h2 className='text-xl font-bold uppercase tracking-wide m-0 text-slate-900'>Latest News</h2>
                  </div>
                  <Divider className='mt-2 mb-6' />

                  {latestList.length > 0 ? (
                    <List
                      itemLayout='horizontal'
                      dataSource={latestList}
                      renderItem={(item) => (
                        <div
                          key={item.id}
                          className='flex flex-col sm:flex-row gap-4 mb-8 group cursor-pointer border-b border-gray-100 pb-6'
                          onClick={() => handleDetail(item.slug)}
                        >
                          <div className='w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-md aspect-[16/10] bg-gray-100 shadow-sm'>
                            <img
                              src={item.image ? getImageUrl(item.image) : 'https://picsum.photos/seed/' + item.slug + '/300/200'}
                              alt={item.title}
                              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <span className='px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold uppercase rounded'>
                                {item.type || categoryTitle}
                              </span>
                              {item.updatedAt && (
                                <span className='text-gray-400 text-xs'>
                                  {new Date(item.updatedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <h3 className='text-lg font-bold leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2'>
                              {item.title}
                            </h3>
                            <Paragraph className='text-gray-500 text-sm line-clamp-2 mb-0'>
                              {item.description}
                            </Paragraph>
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <List
                      itemLayout='horizontal'
                      dataSource={fallbackLatestNews}
                      renderItem={(item) => (
                        <div
                          key={item.id}
                          className='flex flex-col sm:flex-row gap-4 mb-8 group cursor-pointer border-b border-gray-100 pb-6'
                        >
                          <div className='w-full sm:w-1/3 flex-shrink-0 overflow-hidden rounded-md aspect-[16/10] bg-gray-100 shadow-sm'>
                            <img
                              src={item.image}
                              alt={item.title}
                              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='text-gray-400 text-xs mb-1'>{item.time}</div>
                            <h3 className='text-lg font-bold leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2'>
                              {item.title}
                            </h3>
                            <Paragraph className='text-gray-500 text-sm line-clamp-2 mb-0'>
                              {item.desc}
                            </Paragraph>
                          </div>
                        </div>
                      )}
                    />
                  )}
                </Col>

                {/* Right Column: Spotlight Box */}
                <Col xs={24} lg={8}>
                  <div className='bg-sky-50/70 p-6 rounded-lg border border-sky-100 relative overflow-hidden'>
                    <div className='absolute right-[-20px] top-1/2 -translate-y-1/2 rotate-90 text-6xl font-black text-sky-100/60 pointer-events-none select-none'>
                      SPOTLIGHT
                    </div>

                    <div className='relative z-10'>
                      <div className='border-l-3 border-blue-600 pl-3 mb-4'>
                        <Text className='text-xs font-bold text-blue-600 uppercase block tracking-wider'>
                          Editor's Selection
                        </Text>
                      </div>

                      <Title level={3} className='!text-xl !font-bold !leading-tight !mb-4 !text-slate-900'>
                        In-Depth Explorations & Cultural Retrospectives
                      </Title>

                      <div className='mb-6 overflow-hidden rounded-md shadow-sm aspect-[16/10] bg-white'>
                        <img
                          src={
                            activeRecommends[0]?.image
                              ? getImageUrl(activeRecommends[0].image)
                              : 'https://picsum.photos/seed/spotlight/400/250'
                          }
                          alt='Featured Spotlight'
                          className='w-full h-full object-cover'
                        />
                      </div>

                      <ul className='space-y-4 list-none p-0 m-0'>
                        {activeRecommends.length > 0 ? (
                          activeRecommends.slice(0, 4).map((rec) => (
                            <li
                              key={rec.id}
                              className='flex gap-3 items-start group cursor-pointer'
                              onClick={() => handleDetail(rec.slug)}
                            >
                              <span className='text-blue-600 text-lg font-bold leading-none mt-0.5'>•</span>
                              <Text className='font-semibold text-[14px] group-hover:text-blue-600 transition-colors line-clamp-2'>
                                {rec.title}
                              </Text>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className='flex gap-3 items-start group cursor-pointer'>
                              <span className='text-blue-600 text-lg font-bold leading-none mt-0.5'>•</span>
                              <Text className='font-semibold text-[14px] group-hover:text-blue-600 transition-colors'>
                                Five Decades of Independent Publishing and Literary Curation
                              </Text>
                            </li>
                            <Divider className='my-2' />
                            <li className='flex gap-3 items-start group cursor-pointer'>
                              <span className='text-blue-600 text-lg font-bold leading-none mt-0.5'>•</span>
                              <Text className='font-semibold text-[14px] group-hover:text-blue-600 transition-colors'>
                                Visualizing Decades of Urban Transformation and Economic Growth
                              </Text>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageBlog
