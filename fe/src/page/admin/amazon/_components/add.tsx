import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import TextEditor from '../../components/TextEditor/QuillEditor'

export default function AddAmazon() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const dispatch = useDispatch()

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
    const formData = new FormData()

    const captionWithNewlines = caption.replace(/<\/p>/g, '\n')
    const finalCaption = captionWithNewlines.replace(/<[^>]*>/g, '').trim()

    formData.append('sourceUrl', sourceUrl)
    formData.append('amzUrl', amzUrl ?? '')
    formData.append('caption', finalCaption)

    try {
      setIsLoading(true)
      await dispatch(amazonActions.createAmazon(formData) as unknown as AnyAction)
      await dispatch(amazonActions.getAdminAmazons('', '', '', '', 0, 10) as unknown as AnyAction)
      popupSuccess('Affiliate link created successfully')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      popupError('Failed to create affiliate link')
    } finally {
      setIsLoading(false)
    }
  }

  const onValuesChange = () => setIsDirty(true)

  return (
    <Drawer
      width={'100%'}
      title={<span className='font-bold text-xl'>Create Thread Post</span>}
      onClose={handleCancel}
      open={true}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit' form='Amazon-form' loading={isLoading}>
            Save Post
          </Button>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Saving...'>
        <Form
          id='Amazon-form'
          form={form}
          name='Amazon'
          layout='vertical'
          className='w-full p-6'
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
          initialValues={{
            parent_id: '',
            status: true
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={24}>
              <div
                className='border-[1px] p-[24px] rounded-md bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
              >
                <h2 className='mb-5 font-bold text-[16px]'>Post Content</h2>
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      name='sourceUrl'
                      label='Thread Post URL'
                      rules={[
                        { required: true, message: 'Please enter thread link!' },
                        { whitespace: true, message: 'Thread post link cannot be empty!' }
                      ]}
                    >
                      <Input size='large' placeholder='Enter thread link...' allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='amzUrl' label='Link Amazon' rules={[{ message: 'Please enter affiliate link!' }]}>
                      <Input size='large' placeholder='Enter affiliate link...' allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='caption' className='m-0' label={'Caption...'}>
                      <TextEditor
                        content={caption ?? ''}
                        onHandleChange={(value) => {
                          setCaption(value)
                        }}
                        height={400}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  )
}
