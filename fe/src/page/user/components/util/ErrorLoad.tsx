import { Alert, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

interface Props {
  error_message: string
}

export default function ErrorLoad(props: Props) {
  const handleRetry = () => {
    window.location.reload()
  }
  return (
    <div className='flex justify-center items-center my-8'>
      <Alert
        message={<span className='font-semibold text-base'>Đã Có Lỗi Xảy Ra</span>}
        description={
          <div>
            <p>Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra lại kết nối mạng của bạn.</p>
            <p>Nếu sự cố vẫn tiếp diễn, hãy thử lại sau ít phút.</p>
            <p>{props.error_message}</p>
          </div>
        }
        type='error'
        showIcon
        className='w-full max-w-2xl'
        action={
          <Button size='small' danger icon={<ReloadOutlined />} onClick={handleRetry}>
            Thử lại
          </Button>
        }
      />
    </div>
  )
}
