import { Layout} from 'antd'

function Footer() {
  const { Footer: AntFooter } = Layout

  return (
    <AntFooter style={{ background: '#fafafa', padding: '20px 0' }}>
      <div className='text-center text-gray-600 text-sm'>
        Copyright © {new Date().getFullYear()}. Created by &nbsp;
        <a href='https://wiseowlnews.com' target='_blank' rel='noopener noreferrer' className='font-semibold'>
          Wise Owl News
        </a>
        .
      </div>
    </AntFooter>
  )
}

export default Footer
