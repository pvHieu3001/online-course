import { Avatar, Button, Divider, Form, Input, message, Modal, Tag } from 'antd'
import {
  CalendarOutlined,
  EditOutlined,
  KeyOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { userActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import Loading from '@/page/Loading'
import LoadingPage from '../components/util/LoadingPage'

export default function AccountManagement() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

  const [editForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  useEffect(() => {
    dispatch(userActions.getLoginUser() as unknown as AnyAction)
  }, [dispatch])

  const handleLogout = () => {
    message.success('Signed out successfully!')
  }

  const handleEditFinish = (values) => {
    console.log('Updated profile data:', values)
    message.success('Profile updated successfully!')
    setIsEditModalVisible(false)
  }

  const handleChangePasswordFinish = (values) => {
    console.log('New password:', values)
    message.success('Password changed successfully!')
    setIsPasswordModalVisible(false)
    passwordForm.resetFields()
  }

  if (user.isLoading || !user.data) {
    console.log('user.isLoading', user)
    return <LoadingPage />
  }
  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
        <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
          <div className='flex flex-col items-center space-y-4'>
            <Avatar size={96} src='https://i.pravatar.cc/150?u=a042581f4e29026704d' icon={<UserOutlined />} />
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-gray-800'>{user.data?.firstname + ' ' + user.data?.lastname}</h2>
              <Tag color='blue' className='mt-2'>
                {user.data?.role}
              </Tag>
            </div>
          </div>

          <Divider />

          <div className='space-y-4'>
            <div className='flex items-center justify-between text-gray-700'>
              <span className='flex items-center font-semibold'>
                <UserOutlined className='mr-2 text-gray-500' />
                Username
              </span>
              <span>{user.data?.username}</span>
            </div>
            <div className='flex items-center justify-between text-gray-700'>
              <span className='flex items-center font-semibold'>
                <MailOutlined className='mr-2 text-gray-500' />
                Email
              </span>
              <span>{user.data?.email}</span>
            </div>
            <div className='flex items-center justify-between text-gray-700'>
              <span className='flex items-center font-semibold'>
                <CalendarOutlined className='mr-2 text-gray-500' />
                Last Login
              </span>
              <span>15/10/2025 16:30</span>
            </div>
          </div>

          <Divider />

          <div className='flex flex-col sm:flex-row sm:justify-center gap-3'>
            <Button icon={<EditOutlined />} size='large' className='flex-1' onClick={() => setIsEditModalVisible(true)}>
              Edit Profile
            </Button>
            <Button
              icon={<KeyOutlined />}
              size='large'
              className='flex-1'
              onClick={() => setIsPasswordModalVisible(true)}
            >
              Change Password
            </Button>
            <Button
              type='primary'
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size='large'
              className='flex-1'
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      <Modal
        title='Edit Profile Information'
        open={isEditModalVisible}
        onOk={() => editForm.submit()}
        onCancel={() => setIsEditModalVisible(false)}
        okText='Save Changes'
        cancelText='Cancel'
      >
        <Form form={editForm} layout='vertical' onFinish={handleEditFinish} initialValues={user}>
          <Form.Item name='fullName' label='Full Name' rules={[{ required: true, message: 'Please enter your full name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, type: 'email', message: 'Invalid email address!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* --- CHANGE PASSWORD MODAL --- */}
      <Modal
        title='Change Password'
        open={isPasswordModalVisible}
        onOk={() => passwordForm.submit()}
        onCancel={() => setIsPasswordModalVisible(false)}
        okText='Confirm'
        cancelText='Cancel'
      >
        <Form form={passwordForm} layout='vertical' onFinish={handleChangePasswordFinish}>
          <Form.Item
            name='oldPassword'
            label='Current Password'
            rules={[{ required: true, message: 'Please enter your current password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='newPassword'
            label='New Password'
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='Confirm New Password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Confirmation password does not match!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
