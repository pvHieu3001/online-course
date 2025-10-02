import { Modal } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
import ErrorLoad from '../../components/util/ErrorLoad'
import { useState } from 'react'
import { popupSuccess, popupError } from '@/page/shared/Toast'
import Loading from '@/page/Loading'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} không phải là một email hợp lệ!',
    number: '${label} không phải là 1 số hợp lệ!'
  },
  number: {
    range: '${label} phải ở giữa ${min} và ${max}'
  }
}

export default function EditUser() {
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
  const params = useParams()

  const [form] = Form.useForm()

  const onFinish = async (values: Iuser | any) => {
    const formData = new FormData()
    for (const key in values) {
      if (String(key) == 'upload') {
        if (values[key]) {
          formData.append('image', values[key][0].originFileObj)
        }

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
      const payload = {
        id: params.id,
        data: formData
      }
      await updateUser(payload).unwrap()
      popupSuccess('Update user success')
      handleCancel()
    } catch (error) {
      popupError('Update user error')
    }
  }

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }

  if (isLoading || dataLoading) return <Loading />
  if (isError) return <ErrorLoad />
  return (
    <>
      <Modal okButtonProps={{ hidden: true }} title='Edit user' open={true} onCancel={handleCancel}>
        <Form
          initialValues={dataItem.data}
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

          <Form.Item name='password' label='Password' rules={[{ required: true }]}>
            <Input type='password' placeholder='*******' />
          </Form.Item>

          <Form.Item name='role_id' label='Role' rules={[{ required: true }]}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 1, label: 'Admin' },
                { value: 2, label: 'Guest' }
              ]}
            />
          </Form.Item>

          <Form.Item className='mt-3' wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              loading={loadingUpdateUser || file.loading}
              disabled={loadingUpdateUser || file.loading}
              type='primary'
              htmlType='submit'
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
