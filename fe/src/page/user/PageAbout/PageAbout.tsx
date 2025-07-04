import rightImg from '../../../assets/images/base/hero-right1.png'
import React, { FC } from 'react'
import SectionFounder from './SectionFounder'
import SectionStatistic from './SectionStatistic'
import { Helmet } from 'react-helmet-async'
import BgGlassmorphism from '../components/BgGlassmorphism/BgGlassmorphism'
import BackgroundSection from '../components/BackgroundSection/BackgroundSection'
import SectionHero from './SectionHero'
import SectionClientSay from '../components/SectionClientSay/SectionClientSay'
import SectionPromo3 from '../components/SectionPromo3'

export interface PageAboutProps {
  className?: string
}

const PageAbout: FC<PageAboutProps> = ({ className = '' }) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative ${className}`} data-nc-id='PageAbout'>
      <Helmet>
        <title>About || Đồ Gỗ Hiệp Hồng</title>
        <meta name='google-site-verification' content='T9IaRbRYVAYLaOMteD3gLMso6FUu62Kkyu7ORBpDrqw' />
      </Helmet>

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
  )
}

export default PageAbout
