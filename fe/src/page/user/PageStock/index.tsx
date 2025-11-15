import React, { useState, useEffect } from 'react'
import { Card, Typography, Spin } from 'antd'
import StockChart from './StockChart'
import { RiseOutlined } from '@ant-design/icons'

const { Title } = Typography

function PageStock() {
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStockData = async () => {
      // 1. Tính toán thời gian (90 ngày trước đến hiện tại)
      const toTimestamp = Math.floor(Date.now() / 1000) // Unix timestamp (giây)
      const fromTimestamp = toTimestamp - 90 * 24 * 60 * 60 // 90 ngày trước

      const API_URL = `https://bgapidatafeed.vps.com.vn/tradingview/history?symbol=VNINDEX&resolution=1D&from=${fromTimestamp}&to=${toTimestamp}&countback=330`

      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (data && data.t && data.c) {
          const formattedData = data.t.map((timestamp, index) => ({
            time: new Date(timestamp * 1000).toLocaleDateString('vi-VN'),
            price: data.c[index] // Lấy giá đóng cửa
          }))
          setChartData(formattedData)
        } else {
          console.error('Cấu trúc data trả về không như mong đợi:', data)
        }
      } catch (error) {
        console.error('Lỗi khi fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStockData()
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <Card
        title={
          <div className='flex items-center space-x-2'>
            <RiseOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
            <Title level={3} className='!mb-0'>
              Biểu đồ Lịch sử VNINDEX (90 ngày)
            </Title>
          </div>
        }
        bordered={false}
        className='w-full max-w-4xl shadow-lg'
      >
        <div className='h-96'>
          {isLoading ? (
            <div className='flex justify-center items-center h-full'>
              <Spin size='large' />
            </div>
          ) : (
            <StockChart chartData={chartData} />
          )}
        </div>
      </Card>
    </div>
  )
}

export default PageStock
