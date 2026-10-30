import { Modal } from 'antd'
import { Form, Input } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
import { useEffect } from 'react'
import { popupSuccess, popupError } from '@/page/shared/Toast'
import { userActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { useDispatch, useSelector } from 'react-redux'
import { roleOptions } from '@/common/constants'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

export default function EditUser() {
  const navigator = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const userStore = useSelector((state: RootState) => state.user)
  const [form] = Form.useForm()

  useEffect(() => {
    if (id) {
      dispatch(userActions.getUserById(id) as unknown as AnyAction)
    }
  }, [dispatch, id])

  useEffect(() => {
    if (userStore.data && !userStore.isLoading) {
      console.log('userStore.data', userStore.data)
      form.resetFields()
      form.setFieldsValue({
        firstname: userStore.data.firstname,
        lastname: userStore.data.lastname,
        username: userStore.data.username,
        email: userStore.data.email,
        password: userStore.data.password,
        role: userStore.data.role
      })
    }
  }, [userStore.data, userStore.isLoading, form])

  const onFinish = async () => {
    const id = userStore.data?.id

    const formdata = new FormData()
    formdata.append('firstname', form.getFieldValue('firstname'))
    formdata.append('lastname', form.getFieldValue('lastname'))
    formdata.append('username', form.getFieldValue('username'))
    formdata.append('email', form.getFieldValue('email'))
    formdata.append('password', form.getFieldValue('password'))
    formdata.append('role', form.getFieldValue('role'))

    try {
      dispatch(userActions.updateUser(id as unknown as string, formdata) as unknown as AnyAction)
      await dispatch(userActions.getUsers() as unknown as AnyAction)
      popupSuccess('User updated successfully')
      navigator('..')
    } catch (error) {
      popupError('Failed to update user')
    }
  }

  const handleCancel = () => {
    dispatch(userActions.getUsers() as unknown as AnyAction)
    navigator('..')
  }
  return (
    <Modal
      title='Update User'
      open={true}
      onCancel={handleCancel}
      width={620}
      okText='Update'
      cancelText='Cancel'
      onOk={() => form.submit()}
    >
      <Form form={form} name='add-user-form' layout='vertical' onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name='firstname' label='First Name' rules={[{ required: true }]}>
          <Input type='text' placeholder='Enter first name' />
        </Form.Item>

        <Form.Item name='lastname' label='Last Name' rules={[{ required: true }]}>
          <Input type='text' placeholder='Enter last name' />
        </Form.Item>

        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
          <Input type='text' placeholder='Enter username' />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
          <Input type='email' placeholder='Enter email' />
        </Form.Item>

        <Form.Item name='password' label='Password'>
          <Input.Password placeholder='Enter password' />
        </Form.Item>

        <Form.Item name='role' label='Role' rules={[{ required: true, message: 'Please select a role!' }]}>
          <Select placeholder='Select role' options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
