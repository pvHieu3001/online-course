import React from 'react'
import { Line } from '@ant-design/charts'

// Component này giờ rất đơn giản, chỉ nhận 'chartData' và vẽ
// Nó không còn tự tạo state hay dùng useEffect để giả lập data nữa
const StockChart = ({ chartData }) => {
  // Cấu hình cho biểu đồ
  const config = {
    data: chartData, // 1. Dùng thẳng prop 'chartData' được truyền vào
    xField: 'time', // Tên các trường dữ liệu phải khớp với
    yField: 'price', // data mà component 'App.js' truyền vào
    smooth: true,
    padding: 'auto',

    yAxis: {
      title: { text: 'Điểm số' },
      // Tự động tính toán trục Y
      minLimit: chartData.length > 0 ? Math.min(...chartData.map((d) => d.price)) * 0.98 : 0
    },
    xAxis: {
      title: { text: 'Thời gian' },
      // Ẩn bớt label nếu có quá nhiều
      label: {
        autoHide: true,
        autoRotate: true
      }
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      formatter: (datum) => ({
        name: 'Giá trị', // Bạn có thể truyền tên (ví dụ: VNINDEX) làm prop
        value: `${datum.price.toFixed(2)}`
      })
    },
    lineStyle: {
      lineWidth: 2
    },
    point: {
      size: 3,
      shape: 'circle'
    }
  }

  return <Line {...config} />
}

export default StockChart
