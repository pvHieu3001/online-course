import { Modal, Select } from 'antd'
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { popupSuccess, popupError } from '@/page/shared/Toast'
import { useDispatch } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { userActions } from '@/app/actions'
import { roleOptions } from '@/common/constants'

const validateMessages = {
  required: '${label} là bắt buộc!',
  types: {
    email: '${label} không phải là 1 email hợp lệ!',
    number: '${label} không phải là 1 số hợp lệ!'
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
      title='Thêm người dùng'
      open={true}
      onCancel={handleCancel}
      width={620}
      okText='Tạo'
      cancelText='Hủy'
      onOk={() => form.submit()}
    >
      <Form form={form} name='add-user-form' layout='vertical' onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name='firstname' label='Tên' rules={[{ required: true }]}>
          <Input type='text' placeholder='Nhập tên' />
        </Form.Item>

        <Form.Item name='lastname' label='Họ' rules={[{ required: true }]}>
          <Input type='text' placeholder='Nhập họ' />
        </Form.Item>

        <Form.Item name='username' label='Tên đăng nhập' rules={[{ required: true }]}>
          <Input type='text' placeholder='Nhập tên đăng nhập' />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
          <Input type='email' placeholder='Nhập email' />
        </Form.Item>

        <Form.Item name='password' label='Mật khẩu' rules={[{ required: true, min: 8, max: 30 }]}>
          <Input.Password placeholder='Nhập mật khẩu' />
        </Form.Item>

        <Form.Item name='role' label='Vai trò' rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
          <Select placeholder='Chọn vai trò' options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
