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
    message.success('Logged out successfully!')
  }

  const handleEditFinish = (values: any) => {
    console.log('New data:', values)
    message.success('Information updated successfully!')
    setIsEditModalVisible(false)
  }

  const handleChangePasswordFinish = (values: any) => {
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
                Last login
              </span>
              <span>15/10/2025 16:30</span>
            </div>
          </div>

          <Divider />

          <div className='flex flex-col sm:flex-row sm:justify-center gap-3'>
            <Button icon={<EditOutlined />} size='large' className='flex-1' onClick={() => setIsEditModalVisible(true)}>
              Edit
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
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* --- MODAL CHỈNH SỬA THÔNG TIN --- */}
      <Modal
        title='Edit Profile'
        open={isEditModalVisible}
        onOk={() => editForm.submit()}
        onCancel={() => setIsEditModalVisible(false)}
        okText='Save changes'
        cancelText='Cancel'
      >
        <Form form={editForm} layout='vertical' onFinish={handleEditFinish} initialValues={user}>
          <Form.Item name='fullName' label='Full name' rules={[{ required: true, message: 'Please enter your full name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, type: 'email', message: 'Invalid email!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* --- MODAL ĐỔI MẬT KHẨU --- */}
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
            label='Old Password'
            rules={[{ required: true, message: 'Please enter old password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='newPassword'
            label='New Password'
            rules={[
              { required: true, message: 'Please enter new password!' },
              { min: 8, message: 'Password must have at least 8 characters!' }
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
              { required: true, message: 'Please confirm new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
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
