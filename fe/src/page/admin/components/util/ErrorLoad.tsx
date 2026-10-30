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
        message={<span className='font-semibold text-base'>An Error Occurred</span>}
        description={
          <div>
            <p>Unable to load data from the server. Please check your network connection.</p>
            <p>If the problem persists, please try again in a few moments.</p>
            <p>{props.error_message}</p>
          </div>
        }
        type='error'
        showIcon
        className='w-full max-w-2xl'
        action={
          <Button size='small' danger icon={<ReloadOutlined />} onClick={handleRetry}>
            Try Again
          </Button>
        }
      />
    </div>
  )
}
