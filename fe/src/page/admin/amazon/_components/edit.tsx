import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Drawer, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import ErrorLoad from '../../components/util/ErrorLoad'
import { useDispatch, useSelector } from 'react-redux'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { IAmazon } from '@/common/types.interface'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Spin } from 'antd'
import { RootState } from '@/app/store'

export default function EditAmazon() {
  const params = useParams()
  const dispatch = useDispatch()
  const amazonStore = useSelector((state: RootState) => state.amazon)
  useEffect(() => {
    dispatch(amazonActions.getAmazonById(params.id ?? '0') as unknown as AnyAction)
    dispatch(amazonActions.getAdminAmazons('') as unknown as AnyAction)
  }, [dispatch, params.id])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (amazonStore.data) {
      const data = amazonStore.data as IAmazon

      form.setFieldsValue({
        sourceUrl: data.sourceUrl,
        caption: data.caption,
        amzUrl: data.amzUrl,
        isPublished: data.isPublished
      })
    }
  }, [amazonStore, form])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const handleCancel = () => {
    if (isDirty) {
      Modal.confirm({
        title: 'Are you sure you want to leave?',
        icon: <ExclamationCircleOutlined />,
        content: 'Unsaved changes will be lost.',
        onOk: () => navigate('..')
      })
    } else {
      navigate('..')
    }
  }

  const handleSubmit = async () => {
    const sourceUrl = form.getFieldValue('sourceUrl')
    const amzUrl = form.getFieldValue('amzUrl')
    const caption = form.getFieldValue('caption')
    const formData = new FormData()

    formData.append('sourceUrl', sourceUrl)
    formData.append('amzUrl', amzUrl ?? '')
    formData.append('caption', caption)

    try {
      await dispatch(amazonActions.updateAmazon(params.id, formData) as unknown as AnyAction)
      await dispatch(amazonActions.getAdminAmazons('') as unknown as AnyAction)
      popupSuccess('Affiliate link updated successfully')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      console.error('Error updating afiliate:', error)
      popupError('Failed to update affiliate link')
    }
  }

  // Đánh dấu form đã thay đổi
  const onValuesChange = () => setIsDirty(true)

  if (amazonStore.error_message) {
    return <ErrorLoad error_message={amazonStore.error_message} />
  }
  return (
    <Drawer
      width='100%'
      title={<span className='font-bold text-xl'>Edit Thread Post</span>}
      onClose={handleCancel}
      open={true}
      bodyStyle={{ padding: 24, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit' form='Amazon-form' loading={amazonStore.isLoading}>
            Update
          </Button>
        </div>
      }
    >
      <Spin spinning={amazonStore.isLoading} tip='Loading...'>
        {amazonStore.data && (
          <Form
            id='Amazon-form'
            form={form}
            name='Amazon'
            layout='vertical'
            onFinish={handleSubmit}
            onValuesChange={onValuesChange}
            initialValues={{}}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={24}>
                <div
                  className='border p-6 rounded-md bg-[#fafbfc]'
                  style={{ boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.03)' }}
                >
                  <h2 className='mb-5 font-bold text-[16px]'>Post Content</h2>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        name='sourceUrl'
                        label='Thread Post Link'
                        rules={[
                          { required: true, message: 'Please enter thread link!' },
                          { whitespace: true, message: 'Post link cannot be empty!' }
                        ]}
                      >
                        <Input disabled size='large' placeholder='Enter thread link...' />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='amzUrl'
                        label='Amazon Link'
                        rules={[{ message: 'Please enter affiliate link!' }]}
                      >
                        <Input size='large' placeholder='Enter affiliate link...' />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name='caption' label='Post Caption'>
                        <Input size='large' placeholder='Enter Caption...' />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Spin>
    </Drawer>
  )
}
