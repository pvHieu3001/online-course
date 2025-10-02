import { Card, Col, Flex, Row, Typography } from 'antd'

import LineChart from './components/charts/lineChart'
import cart from './components/icon/Cart'
import heart from './components/icon/Heart'
import dollor from './components/icon/Dollor'
import profile from './components/icon/Profile'
import Overview from './components/Overview'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { dashboardActions } from '@/app/actions/dashboard.actions'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { Title } = Typography
  const { backgroundColor } = useSelector((state: RootState) => state.web)

  const dashboard = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    dispatch(dashboardActions.getDashboard() as unknown as AnyAction)
  }, [dispatch])

  const count = [
    {
      today: 'Tổng Số Khóa Học',
      title: `${dashboard.data?.numberCourse || 0}`,
      persent: '',
      icon: dollor,
      bnb: 'bnb2'
    },
    {
      today: 'Tổng Số Bài Viết',
      title: `${dashboard.data?.numberPost || 0}`,
      persent: '',
      icon: heart,
      bnb: 'bnb2'
    },
    {
      today: 'Tổng Số Người Dùng',
      title: `${dashboard.data?.numberUser || 0}`,
      persent: '',
      icon: profile,
      bnb: 'redtext'
    },
    {
      today: 'Lượt Tải Xuống',
      title: `${dashboard.data?.numberDownload || 0}`,
      persent: '',
      icon: cart,
      bnb: 'bnb2'
    }
  ]

  return (
    <>
      <div className='layout-content'>
        <Row className='rowgap-vbox' gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12} xxl={6} className='mb-24'>
              <Card bordered={false} className='criclebox'>
                <div className='number'>
                  <Row align='middle' gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={5} xl={2}>
                      <Flex
                        align='center'
                        justify='center'
                        className='w-[48px] h-[48px] text-[#ffff] rounded-[0.5rem]'
                        style={{ background: backgroundColor }}
                      >
                        {c.icon}
                      </Flex>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={15} className='mb-24'>
            <Overview />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={9} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <LineChart color={'#3a416f'} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
