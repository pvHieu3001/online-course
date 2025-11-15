import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts'

// Hàm giả lập giá cổ phiếu mới
const generateRandomPrice = (lastPrice) => {
  const change = (Math.random() - 0.45) * 5 // Tăng/giảm ngẫu nhiên
  const newPrice = lastPrice + change
  return newPrice < 10 ? 10 : newPrice // Không để giá quá thấp
}

const StockChart = () => {
  const [data, setData] = useState(() => {
    // Khởi tạo dữ liệu ban đầu
    const initialData = []
    let price = 100
    const startTime = new Date().getTime()
    for (let i = 0; i < 30; i++) {
      initialData.push({
        time: new Date(startTime - (30 - i) * 1000).toLocaleTimeString(),
        price: price
      })
      price = generateRandomPrice(price)
    }
    return initialData
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPrice = prevData.length > 0 ? prevData[prevData.length - 1].price : 100
        const newPrice = generateRandomPrice(lastPrice)
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          price: newPrice
        }

        const updatedData = [...prevData, newDataPoint]
        if (updatedData.length > 30) {
          updatedData.shift()
        }
        return updatedData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Cấu hình cho biểu đồ
  const config = {
    data: data,
    xField: 'time',
    yField: 'price',
    smooth: true, // Làm mượt đường line
    yAxis: {
      title: { text: 'Giá (USD)' },
      min: Math.min(...data.map((d) => d.price)) - 10 // Tự động điều chỉnh trục Y
    },
    xAxis: {
      title: { text: 'Thời gian' }
    },
    tooltip: {
      formatter: (datum) => ({
        name: 'Giá',
        value: `${datum.price.toFixed(2)} USD`
      })
    },
    lineStyle: {
      lineWidth: 3
    },
    point: {
      size: 4,
      shape: 'circle'
    }
  }

  return <Line {...config} />
}

export default StockChart
