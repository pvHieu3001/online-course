import React from 'react'
import { Line } from '@ant-design/charts'

const StockChart = ({ chartData }) => {
  const config = {
    data: chartData,
    xField: 'time',
    yField: 'price',
    smooth: true,
    padding: 'auto',

    yAxis: {
      title: { text: 'Điểm số' },
      minLimit: chartData.length > 0 ? Math.min(...chartData.map((d) => d.price)) * 0.98 : 0
    },
    xAxis: {
      title: { text: 'Thời gian' },
      label: {
        autoHide: true,
        autoRotate: true
      }
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      formatter: (datum) => ({
        name: 'Giá trị',
        value: `${datum.price}`
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
