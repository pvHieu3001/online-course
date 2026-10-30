import { Spin } from 'antd'

export default function LoadingPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='flex flex-col items-center space-y-4 rounded-lg p-8 '>
        <Spin size='large' />
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-gray-700'>Loading data...</h3>
          <p className='mt-1 text-sm text-gray-500'>Please wait a moment.</p>
        </div>
      </div>
    </div>
  )
}
