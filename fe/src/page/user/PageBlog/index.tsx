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

  const seenSlugs = new Set([mainBlog?.slug, secondBlog?.slug, thirdBlog?.slug].filter(Boolean))
  const remainingBlogs: IBlog[] = []

  for (const b of [...(activeBlogs.length > 3 ? activeBlogs.slice(3) : []), ...activeRecommends]) {
    if (b && b.slug && !seenSlugs.has(b.slug)) {
      seenSlugs.add(b.slug)
      remainingBlogs.push(b)
    }
  }

  const displayList = remainingBlogs.length > 0 ? remainingBlogs : fallbackLatestNews

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
                    className='flex flex-row md:flex-col justify-between gap-3 sm:gap-4'
                    style={heroImageHeight ? { height: `${heroImageHeight}px` } : undefined}
                  >
                    {/* Secondary Article 1 */}
                    <div
                      className='flex-1 flex flex-col min-h-0 min-w-0 group cursor-pointer'
                      onClick={() => handleDetail(secondBlog?.slug || fallbackSecondary[0].slug)}
                    >
                      <div className='aspect-[16/10] md:aspect-auto md:flex-1 overflow-hidden rounded-md mb-2 bg-gray-100 shadow-sm min-h-0'>
                        <img
                          src={secondBlog?.image ? getImageUrl(secondBlog.image) : fallbackSecondary[0].image}
                          alt={secondBlog?.title || fallbackSecondary[0].title}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>
                      <h3 className='text-xs sm:text-sm md:text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-0 flex-shrink-0'>
                        {secondBlog?.title || fallbackSecondary[0].title}
                      </h3>
                    </div>

                    <Divider className='hidden md:block my-0' />

                    {/* Secondary Article 2 */}
                    <div
                      className='flex-1 flex flex-col min-h-0 min-w-0 group cursor-pointer'
                      onClick={() => handleDetail(thirdBlog?.slug || fallbackSecondary[1].slug)}
                    >
                      <div className='aspect-[16/10] md:aspect-auto md:flex-1 overflow-hidden rounded-md mb-2 bg-gray-100 shadow-sm min-h-0'>
                        <img
                          src={thirdBlog?.image ? getImageUrl(thirdBlog.image) : fallbackSecondary[1].image}
                          alt={thirdBlog?.title || fallbackSecondary[1].title}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>
                      <h3 className='text-xs sm:text-sm md:text-[15px] font-bold leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-0 flex-shrink-0'>
                        {thirdBlog?.title || fallbackSecondary[1].title}
                      </h3>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Two Column Layout: Latest Articles vs Spotlight */}
              <div className='w-full mt-10'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-1.5 h-6 bg-blue-600 rounded-sm'></div>
                  <h2 className='text-xl sm:text-2xl font-bold uppercase tracking-wide m-0 text-slate-900'>Latest News</h2>
                </div>
                <Divider className='mt-2 mb-6' />

                <Row gutter={[24, 32]}>
                  {displayList.map((item: any, idx: number) => {
                    const isRealBlog = Boolean(item.slug)
                    const title = item.title
                    const desc = item.description || item.desc || ''
                    const imgUrl = item.image
                      ? (isRealBlog ? getImageUrl(item.image) : item.image)
                      : `https://picsum.photos/seed/${item.slug || idx}/400/250`
                    const dateStr = item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString()
                      : (item.time || 'Published Recently')
                    const badge = item.type || categoryTitle

                    return (
                      <Col xs={24} sm={12} lg={6} key={item.id || idx}>
                        <div
                          className='flex flex-col group cursor-pointer h-full bg-transparent'
                          onClick={() => handleDetail(item.slug || '')}
                        >
                          <div className='w-full aspect-[16/10] overflow-hidden rounded-md bg-gray-100 mb-2.5'>
                            <img
                              src={imgUrl}
                              alt={title}
                              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>
                          <div className='flex flex-col flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1.5'>
                              <span className='px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-bold uppercase rounded'>
                                {badge}
                              </span>
                              <span className='text-gray-400 text-xs'>
                                {dateStr}
                              </span>
                            </div>
                            <h3 className='text-[15px] font-bold leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2'>
                              {title}
                            </h3>
                            <Paragraph className='text-gray-500 text-xs sm:text-sm line-clamp-2 mb-0 mt-1'>
                              {desc}
                            </Paragraph>
                          </div>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    </HandleLoading>
  )
}

export default PageBlog
