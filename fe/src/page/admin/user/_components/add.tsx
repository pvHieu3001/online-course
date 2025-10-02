import { Modal } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import ErrorLoad from '../../components/util/ErrorLoad'
import { useState } from 'react'
import { popupSuccess, popupError } from '@/page/shared/Toast'
import Loading from '@/page/Loading'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

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
/* eslint-enable no-template-curly-in-string */

export default function AddUser() {
  const [file, setFile] = useState({
    data: {},
    loading: false
  })
  const handleUpload = async (options: any) => {
    const { onSuccess, file } = options
    setFile({
      data: file,
      loading: false
    })
    onSuccess('Upload successful', file)
  }

  const [form] = Form.useForm()

  const onFinish = async (values: Iuser | any) => {
    const formData = new FormData()
    for (const key in values) {
      if (String(key) == 'image') {
        formData.append(key, values[key][0].originFileObj)
        continue
      }
      if (String(key) == 'is_active') {
        if (values[key]) {
          formData.append(key, '1')
        } else {
          formData.append(key, '0')
        }
        continue
      }
      formData.append(key, values[key])
    }
    try {
      await createUser(formData).unwrap()
      popupSuccess('Add user success')
      handleCancel()
    } catch (error) {
      popupError('Add user error')
    }
  }

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }

  if (isLoading) return <Loading />
  if (isError) return <ErrorLoad />
  return (
    <>
      <Modal okButtonProps={{ hidden: true }} title='Add user' open={true} onCancel={handleCancel}>
        <Form
          form={form}
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name='username' label='Username' rules={[{ required: true }]}>
            <Input type='text' placeholder='Enter your username' />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
            <Input type='email' placeholder='Enter your email' />
          </Form.Item>

          <Form.Item name='password' label='Password' rules={[{ required: true, min: 8, max: 30 }]}>
            <Input type='password' placeholder='*******' />
          </Form.Item>

          <Form.Item className='mt-3' wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              loading={loadingCreateUser || file.loading}
              disabled={loadingCreateUser}
              type='primary'
              htmlType='submit'
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
