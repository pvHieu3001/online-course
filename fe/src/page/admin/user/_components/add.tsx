import { Modal, Select } from 'antd'
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { popupSuccess, popupError } from '@/page/shared/Toast'
import { useDispatch } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { userActions } from '@/app/actions'
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

export default function AddUser() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async () => {
    const formdata = new FormData()
    formdata.append('firstname', form.getFieldValue('firstname'))
    formdata.append('lastname', form.getFieldValue('lastname'))
    formdata.append('username', form.getFieldValue('username'))
    formdata.append('email', form.getFieldValue('email'))
    formdata.append('password', form.getFieldValue('password'))
    formdata.append('role', form.getFieldValue('role'))

    try {
      await dispatch(userActions.createUser(formdata) as unknown as AnyAction)
      await dispatch(userActions.getUsers() as unknown as AnyAction)
      popupSuccess('Add user success')
      handleCancel()
    } catch (error) {
      popupError('Add user error')
    }
  }

  const handleCancel = () => {
    navigate('..')
  }

  return (
    <Modal
      title='Add User'
      open={true}
      onCancel={handleCancel}
      width={620}
      okText='Create'
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

        <Form.Item name='password' label='Password' rules={[{ required: true, min: 8, max: 30 }]}>
          <Input.Password placeholder='Enter password' />
        </Form.Item>

        <Form.Item name='role' label='Role' rules={[{ required: true, message: 'Please select a role!' }]}>
          <Select placeholder='Select role' options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
