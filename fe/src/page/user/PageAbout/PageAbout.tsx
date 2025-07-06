import rightImg from '../../../assets/images/base/hero-right1.png'
import React, { FC } from 'react'
import SectionFounder from './SectionFounder'
import SectionStatistic from './SectionStatistic'
import SEOComponent from '../../../components/SEO/SEOComponent'
import BgGlassmorphism from '../components/BgGlassmorphism/BgGlassmorphism'
import BackgroundSection from '../components/BackgroundSection/BackgroundSection'
import SectionHero from './SectionHero'
import SectionClientSay from '../components/SectionClientSay/SectionClientSay'
import SectionPromo3 from '../components/SectionPromo3'

export interface PageAboutProps {
  className?: string
}

const PageAbout: FC<PageAboutProps> = ({ className = '' }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Đồ Gỗ Hiệp Hồng",
    "url": "https://dogohiephong.com",
    "logo": "https://khoahocgiasieure.com/storage/concungusi-011.png",
    "description": "Thương hiệu đồ gỗ Việt Nam uy tín, chất lượng cao với nhiều năm kinh nghiệm trong lĩnh vực sản xuất và cung cấp đồ gỗ nội thất.",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <SEOComponent 
        title="Về Chúng Tôi - Đồ Gỗ Hiệp Hồng"
        description="Tìm hiểu về Đồ Gỗ Hiệp Hồng - Thương hiệu đồ gỗ Việt Nam uy tín với nhiều năm kinh nghiệm trong lĩnh vực sản xuất và cung cấp đồ gỗ nội thất chất lượng cao."
        keywords="về chúng tôi, đồ gỗ hiệp hồng, thương hiệu đồ gỗ, đồ gỗ việt nam, lịch sử công ty"
        url="/about"
        structuredData={structuredData}
      />
      
      <div className={`nc-PageAbout overflow-hidden relative ${className}`} data-nc-id='PageAbout'>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className='container py-16 lg:py-28 space-y-16 lg:space-y-28'>
        <SectionHero
          rightImg={rightImg}
          heading='👋 About Us.'
          btnText=''
          subHeading='We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world.'
        />

        <SectionFounder />
        <div className='relative py-16'>
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionPromo3 />
      </div>
    </div>
    </>
  )
}

export default PageAbout
