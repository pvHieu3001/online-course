import { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import Joi from 'joi'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '../../shared/Toast'
import { userActions } from '@/app/actions'
import { IRegister, ContextType } from '@/common/types.interface'
import { AnyAction } from '@reduxjs/toolkit'
import { UserAddOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const validationSchema = Joi.object({
  firstname: Joi.string().required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name cannot be empty'
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty'
  }),
  username: Joi.string().min(6).required().messages({
    'string.min': 'Username must be at least 6 characters',
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'any.required': 'Email address is required',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required',
    'string.empty': 'Confirm password cannot be empty'
  })
})

const SignUp = () => {
  const [form] = Form.useForm()
  const [isLoadingSignUp, setLoadingSignUp] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  const handleFinish = async (values: any) => {
    const { error } = validationSchema.validate(values, { abortEarly: false })
    if (error) {
      const formattedErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message
        return acc
      }, {} as Record<string, string>)
      form.setFields(
        Object.keys(formattedErrors).map((fieldName) => ({
          name: fieldName,
          errors: [formattedErrors[fieldName]]
        }))
      )
      return
    }

    try {
      setLoadingSignUp(true)
      const data: IRegister = {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password
      }
      await dispatch(userActions.register(data) as unknown as AnyAction)
      popupSuccess('Registration successful!')
      navigate('/login')
    } catch (err) {
      popupError('Registration failed')
    } finally {
      setLoadingSignUp(false)
    }
  }

  return (
    <div className='bg-slate-50 min-h-[calc(100vh-220px)] py-10 sm:py-16'>
      <Helmet>
        <title>Sign Up - Wise Owl News</title>
        <meta name='description' content='Create your free Wise Owl News account.' />
      </Helmet>

      <div className='max-w-lg mx-auto px-4'>
        {/* Breadcrumb */}
        <nav aria-label='Breadcrumb' className='mb-6'>
          <ol className='flex items-center gap-2 text-sm text-slate-500 font-medium'>
            <li>
              <Link to='/' className='hover:text-blue-600 transition-colors'>
                Home
              </Link>
            </li>
            <li>/</li>
            <li className='text-slate-900 font-semibold'>Sign Up</li>
          </ol>
        </nav>

        {/* Auth Card */}
        <div className='bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 border border-blue-100 shadow-sm'>
              <UserAddOutlined style={{ fontSize: '22px' }} />
            </div>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Create Your Account
            </h1>
            <p className='text-slate-500 text-sm mt-2'>
              Join Wise Owl News to customize your feed, bookmark stories, and engage in thoughtful discussion.
            </p>
          </div>

          <Form form={form} layout='vertical' onFinish={handleFinish} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                  First Name <span className='text-rose-500'>*</span>
                </label>
                <Form.Item name='lastname' className='mb-0'>
                  <Input size='large' placeholder='John' className='rounded-xl' />
                </Form.Item>
              </div>

              <div>
                <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                  Last Name <span className='text-rose-500'>*</span>
                </label>
                <Form.Item name='firstname' className='mb-0'>
                  <Input size='large' placeholder='Doe' className='rounded-xl' />
                </Form.Item>
              </div>
            </div>

            <div>
              <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                Username <span className='text-rose-500'>*</span>
              </label>
              <Form.Item name='username' className='mb-0'>
                <Input
                  size='large'
                  prefix={<UserOutlined className='text-slate-400 mr-1' />}
                  placeholder='Enter username...'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div>
              <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                Email Address <span className='text-rose-500'>*</span>
              </label>
              <Form.Item name='email' className='mb-0'>
                <Input
                  size='large'
                  type='email'
                  prefix={<MailOutlined className='text-slate-400 mr-1' />}
                  placeholder='example@example.com'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div>
              <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                Password <span className='text-rose-500'>*</span>
              </label>
              <Form.Item name='password' className='mb-0'>
                <Input.Password
                  size='large'
                  prefix={<LockOutlined className='text-slate-400 mr-1' />}
                  placeholder='At least 6 characters...'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div>
              <label className='block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5'>
                Confirm Password <span className='text-rose-500'>*</span>
              </label>
              <Form.Item name='confirmPassword' className='mb-0'>
                <Input.Password
                  size='large'
                  prefix={<LockOutlined className='text-slate-400 mr-1' />}
                  placeholder='Re-enter your password...'
                  className='rounded-xl'
                />
              </Form.Item>
            </div>

            <div className='pt-2'>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoadingSignUp}
                block
                size='large'
                className='h-12 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200'
              >
                {isLoadingSignUp ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </Form>

          <p className='text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 font-semibold hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
