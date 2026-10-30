import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { userActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { ContextType } from '@/common/types.interface'

const loginSocials = [
  {
    name: 'Google',
    icon: (
      <svg viewBox='0 0 533.5 544.3' fill='currentColor' width='1.1em' height='1.1em'>
        <path
          d='M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.3h146.9c-6.3 34.1-25.1 62.9-53.5 82.2v68.2h86.4c50.6-46.6 81.7-115.3 81.7-195.3z'
          fill='#4285F4'
        />
        <path
          d='M272 544.3c73.8 0 135.6-24.4 180.8-66.3l-86.4-68.2c-24.1 16.2-55 25.7-94.4 25.7-72.6 0-134.1-49-156.1-114.8H28.1v71.9C73.9 475.1 166.6 544.3 272 544.3z'
          fill='#34A853'
        />
        <path
          d='M115.9 320.7c-10.5-31.4-10.5-65.2 0-96.6V152.2H28.1c-42.3 83.9-42.3 182.1 0 266l87.8-67.5z'
          fill='#FBBC05'
        />
        <path
          d='M272 107.7c39.9-.6 78.4 14.3 107.8 41.3l80.4-80.4C407.6 24.4 345.8 0 272 0 166.6 0 73.9 69.2 28.1 152.2l87.8 71.9C137.9 156.7 199.4 107.7 272 107.7z'
          fill='#EA4335'
        />
      </svg>
    )
  },
  {
    name: 'Facebook',
    icon: (
      <svg viewBox='0 0 1024 1024' fill='#1877F2' width='1.1em' height='1.1em'>
        <path d='M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zm93.09 512h-62.18v248.73h-103.64V512h-51.82v-85.45h51.82v-54.55c0-42.91 20.36-109.09 109.09-109.09l80 0v85.45h-58.18c-9.09 0-21.82 4.36-21.82 23.64v54.55h80l-10.91 85.45z' />
      </svg>
    )
  },
  {
    name: 'Twitter (X)',
    icon: (
      <svg viewBox='0 0 1024 1024' fill='#0f172a' width='1.1em' height='1.1em'>
        <path d='M1024 194.6c-37.7 16.7-78.2 28-120.8 33.1 43.4-26 76.7-67.2 92.4-116.4-40.6 24.1-85.6 41.6-133.4 51-38.3-40.8-92.9-66.3-153.3-66.3-116 0-210.1 94-210.1 210.1 0 16.5 1.9 32.6 5.5 48-174.6-8.8-329.4-92.4-433.1-219.5-18.1 31-28.5 67-28.5 105.4 0 72.7 37 136.9 93.2 174.6-34.3-1.1-66.6-10.5-94.9-26.2v2.6c0 101.6 72.3 186.4 168.2 205.7-17.6 4.8-36.1 7.4-55.2 7.4-13.5 0-26.6-1.3-39.4-3.8 26.6 83.1 103.9 143.6 195.5 145.2-71.6 56.1-161.9 89.5-260 89.5-16.9 0-33.6-1-50-2.9 92.6 59.4 202.6 94 320.7 94 384.9 0 595.7-318.9 595.7-595.7 0-9.1-0.2-18.2-0.6-27.2 40.9-29.5 76.3-66.4 104.3-108.5z' />
      </svg>
    )
  }
]

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  const handleSubmit = async () => {
    const data = {
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password')
    }
    setLoading(true)
    try {
      await dispatch(userActions.login(data) as unknown as AnyAction)
      popupSuccess('Login successful')
      navigate('/admin/amazon')
    } catch (error) {
      popupError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-slate-50 min-h-[calc(100vh-220px)] py-10 sm:py-16'>
      <Helmet>
        <title>Sign In - Wise Owl News</title>
        <meta name='description' content='Sign in to access your Wise Owl News dashboard and personalized reading feed.' />
      </Helmet>

      <div className='max-w-md mx-auto px-4'>
        {/* Breadcrumb */}
        <nav aria-label='Breadcrumb' className='mb-6'>
          <ol className='flex items-center gap-2 text-sm text-slate-500 font-medium'>
            <li>
              <Link to='/' className='hover:text-blue-600 transition-colors'>
                Home
              </Link>
            </li>
            <li>/</li>
            <li className='text-slate-900 font-semibold'>Sign In</li>
          </ol>
        </nav>

        {/* Authentication Card */}
        <div className='bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 border border-blue-100 shadow-sm'>
              <LockOutlined style={{ fontSize: '22px' }} />
            </div>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Welcome Back
            </h1>
            <p className='text-slate-500 text-sm mt-2'>
              Sign in to manage your reading list, preferences, and account dashboard.
            </p>
          </div>

          {/* Social Sign-in Buttons */}
          <div className='grid grid-cols-3 gap-3 mb-6'>
            {loginSocials.map((item, index) => (
              <button
                key={index}
                type='button'
                className='flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition duration-150 text-xs font-semibold text-slate-700 shadow-xs'
              >
                <span>{item.icon}</span>
                <span className='hidden sm:inline'>{item.name}</span>
              </button>
            ))}
          </div>

          <div className='relative text-center my-6'>
            <span className='relative z-10 bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-medium'>
              Or sign in with account
            </span>
            <div className='absolute top-1/2 left-0 w-full border-t border-slate-200 transform -translate-y-1/2'></div>
          </div>

          {/* Login Form */}
          <Form
            id='login-form'
            form={form}
            name='loginForm'
            layout='vertical'
            className='space-y-4'
            onFinish={handleSubmit}
          >
            <div>
              <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                Username or Email <span className='text-rose-500'>*</span>
              </label>
              <Form.Item
                name='username'
                className='mb-4'
                rules={[
                  { required: true, message: 'Please enter your username!' },
                  { whitespace: true, message: 'Username cannot be empty!' }
                ]}
              >
                <Input
                  size='large'
                  prefix={<UserOutlined className='text-slate-400 mr-1' />}
                  placeholder='Enter username or email...'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div>
              <div className='flex justify-between items-center mb-1.5'>
                <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider'>
                  Password <span className='text-rose-500'>*</span>
                </label>
                <Link to='/forgot-pass' className='text-xs font-medium text-blue-600 hover:underline'>
                  Forgot password?
                </Link>
              </div>
              <Form.Item
                name='password'
                className='mb-4'
                rules={[
                  { required: true, message: 'Please enter your password!' },
                  { whitespace: true, message: 'Password cannot be empty!' }
                ]}
              >
                <Input.Password
                  size='large'
                  prefix={<LockOutlined className='text-slate-400 mr-1' />}
                  placeholder='Enter password...'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div className='flex items-center justify-between mb-4'>
              <Checkbox className='text-xs text-slate-600 font-medium'>Remember me</Checkbox>
            </div>

            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              block
              size='large'
              className='h-12 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200'
            >
              Sign In
            </Button>
          </Form>

          <p className='text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='text-blue-600 font-semibold hover:underline'>
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
