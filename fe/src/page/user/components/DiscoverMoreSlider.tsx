import React, { useEffect, useId } from 'react'
import Heading from './Heading/Heading'
import img1 from '../../../../assets/images/base/collections/1.png'
import img2 from '../../../../assets/images/base/collections/5.png'
import img3 from '../../../../assets/images/base/collections/4.png'
import img4 from '../../../../assets/images/base/collections/3.png'
import CardCategory3, { CardCategory3Props } from './CardCategories/CardCategory3'
import Glide from '@glidejs/glide'
import { useGetValueAttributeQuery } from '../../attribute/_components/value_attribute/ValueAttributeEndPoints'
import { useGetVouchersQuery } from '../../voucher/VoucherEndpoint'
import { Item } from 'rc-menu'

export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: 'Explore new arrivals',
    desc: 'Shop the latest <br /> from top brands',
    featuredImage: img1,
    color: 'bg-yellow-50'
  },
  {
    name: 'Digital gift cards',
    desc: 'Give the gift <br /> of choice',
    featuredImage: img2,
    color: 'bg-red-50'
  },
  {
    name: 'Sale collection',
    desc: 'Up to <br /> 80% off retail',
    featuredImage: img3,
    color: 'bg-blue-50'
  },
  {
    name: 'Sale collection',
    desc: 'Up to <br /> 80% off retail',
    featuredImage: img4,
    color: 'bg-green-50'
  }
]

const DiscoverMoreSlider = () => {
  const id = useId()
  const UNIQUE_CLASS = 'glidejs' + id.replace(/:/g, '_')
  const { data, isLoading } = useGetVouchersQuery({})
  useEffect(() => {
    const OPTIONS: any = {
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5
        },
        1279: {
          gap: 20,
          perView: 2.15
        },
        1023: {
          gap: 20,
          perView: 1.6
        },
        768: {
          gap: 20,
          perView: 1.2
        },
        500: {
          gap: 20,
          perView: 1
        }
      }
    }

    const slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS)
    slider.mount()
    return () => {
      slider.destroy()
    }
  }, [UNIQUE_CLASS, isLoading])

  return (
    <div className={`nc-DiscoverMoreSlider nc-p-l-container ${UNIQUE_CLASS} `}>
      <Heading
        className='mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container '
        desc=''
        rightDescText=''
        hasNextPrev
      >
        Phiếu mua hàng
      </Heading>
      <div className='' data-glide-el='track'>
        <ul className='glide__slides'>
          {data?.data.map((item: any, index: any) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3 item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DiscoverMoreSlider
