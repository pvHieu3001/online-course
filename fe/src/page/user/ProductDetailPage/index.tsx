import { useLocation } from 'react-router-dom'

function ProductDetailPage() {
  const location = useLocation()
  const course = location.state
  return (
    <div>
      <header className='max-w-4xl mx-auto mt-8 px-4'>
        <p className='text-sm uppercase tracking-wide text-blue-500'>100% OFF UDEMY COUPON</p>
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
        <h2 className='text-2xl font-semibold mb-4'>What You Will Learn</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>Competitive analysis & budgeting for ads</li>
          <li>Account linking and mobile campaign launch</li>
          <li>Using Ads Manager and ad types</li>
          <li>Analyzing results and attribution models</li>
          <li>Retargeting and product interaction tracking</li>
        </ul>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4'>
        <h2 className='text-2xl font-semibold mb-4'>Course Description</h2>
        <p className='mb-4'>
          Looking to level up your marketing career or switch jobs? Facebook Ads is your gateway. With over 2 billion
          users, Meta’s advertising platform spans Facebook, Instagram, Audience Network, and Oculus.
        </p>
        <p className='mb-4'>
          Created with renowned SMM expert <strong>Vlad Bogutskiy</strong>, this course teaches you how to launch
          successful campaigns, identify audiences, create engaging creatives, and use analytics tools.
        </p>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4 bg-white p-6 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>Why Choose This Course?</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>Learn from top internet marketing professionals</li>
          <li>Over 1,500 successful campaigns launched</li>
          <li>700,000+ marketers trained globally</li>
          <li>Lifetime access and Udemy certificate</li>
        </ul>
      </section>

      <section className='max-w-4xl mx-auto mt-10 px-4 text-center'>
        <a
          href='https://www.udemy.com/course/facebook-ads-launch-pro-advertising-campaigns/?couponCode=21JULY2025'
          target='_blank'
          className='inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition'
        >
          DOWNLOAD HERE
        </a>
        <p className='mt-4 text-sm text-gray-600'>30-day money-back guarantee</p>
      </section>
    </div>
  )
}

export default ProductDetailPage
