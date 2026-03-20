import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import Joi from 'joi'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '../../shared/Toast'
import { userActions } from '@/app/actions'
import bgSignup from '../../../assets/images/hero-bg.png'
import { IRegister } from '@/common/types.interface'
import { AnyAction } from '@reduxjs/toolkit'

const validationSchema = Joi.object({
  firstname: Joi.string().required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty'
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name cannot be empty'
  }),
  username: Joi.string().min(6).required().messages({
    'string.min': 'Username must have at least 6 characters',
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
    'string.min': 'Password must have at least 6 characters',
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password does not match',
    'any.required': 'Confirm password is required',
    'string.empty': 'Confirm password cannot be empty'
  })
})

const SignUp = () => {
  const [form] = Form.useForm()
  const [isLoadingSignUp, setLoadingSignUp] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFinish = async (values: any) => {
    const { error } = validationSchema.validate(values, { abortEarly: false })
    if (error) {
      const formattedErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message
        return acc
      }, {} as Record<string, string>)
      form.setFields(
        Object.entries(formattedErrors).map(([name, message]) => ({
          name,
          errors: [message]
        }))
      )
      return
    }

    const payload: IRegister = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname
    }

    try {
      setLoadingSignUp(true)
      await dispatch(userActions.signup(payload) as unknown as AnyAction)
      popupSuccess('Registration successful!')
      navigate('/login')
    } catch (err) {
      popupError('Registration failed')
    } finally {
      setLoadingSignUp(false)
    }
  }

  return (
    <div
      className='nc-PageLogin relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${bgSignup})` }}
    >
      <Helmet>
        <title>Sign Up || Hocfree</title>
      </Helmet>

      <div className='w-full max-w-md space-y-8 bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg'>
        <h2 className='text-center text-3xl font-bold text-neutral-800 dark:text-neutral-100'>Sign Up</h2>

        <Form form={form} layout='vertical' onFinish={handleFinish}>
          <Form.Item label='First Name' name='firstname'>
            <Input placeholder='Nguyễn' />
          </Form.Item>

          <Form.Item label='Last Name' name='lastname'>
            <Input placeholder='Văn A' />
          </Form.Item>

          <Form.Item label='Username' name='username'>
            <Input placeholder='Enter username' />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input placeholder='example@example.com' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input.Password placeholder='*******' />
          </Form.Item>

          <Form.Item label='Confirm Password' name='confirmPassword'>
            <Input.Password placeholder='*******' />
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            loading={isLoadingSignUp}
            block
            className='bg-green-600 hover:bg-green-700'
          >
            {isLoadingSignUp ? 'Processing...' : 'Sign Up'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
