import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Switch, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { affiliateActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'

export default function AddAffiliate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    const name = form.getFieldValue('name')
    const active = form.getFieldValue('status')
    const targetUrl = form.getFieldValue('targetUrl')
    const formData = new FormData()

    formData.append('name', name)
    formData.append('status', active.toString())
    formData.append('targetUrl', targetUrl)
    formData.append('image', form.getFieldValue('image'))
    formData.append('price', form.getFieldValue('price'))
    formData.append('originalPrice', form.getFieldValue('originalPrice'))

    try {
      setIsLoading(true)
      await dispatch(affiliateActions.createAffiliate(formData) as unknown as AnyAction)
      await dispatch(affiliateActions.getAdminAffiliates('') as unknown as AnyAction)
      popupSuccess('Affiliate link added successfully')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      popupError('Failed to add affiliate link')
    } finally {
      setIsLoading(false)
    }
  }

  const onValuesChange = () => setIsDirty(true)

  return (
    <Drawer
      width={'70%'}
      title={<span className='font-bold text-xl'>Create New Affiliate Link</span>}
      onClose={handleCancel}
      open={true}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit' form='affiliate-form' loading={isLoading}>
            Save Affiliate Link
          </Button>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Saving...'>
        <Form
          id='affiliate-form'
          form={form}
          name='affiliate'
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
            {/* Cột trái: Ảnh và Cài đặt */}
            <Col xs={24} md={8}>
              <Form.Item
                label={<span className='font-semibold'>Product Image Link</span>}
                className='border-[1px] p-[24px] rounded-md border-[#F1F1F4] bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
                name='image'
              >
                <Input size='large' placeholder='Enter affiliate image link...' />
              </Form.Item>
              <div
                className='border rounded-md overflow-hidden flex-1 bg-[#fafbfc]'
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}
              >
                <div className='p-2'>
                  <h2 className='font-semibold'>Settings</h2>
                </div>
                <hr />
                <div className='flex justify-between items-center p-2'>
                  <span>Active</span>
                  <Form.Item className='m-0' label='' name='status' valuePropName='checked'>
                    <Switch />
                  </Form.Item>
                </div>
                <div className='text-xs text-gray-400 px-2 pb-2'>Enable to display this affiliate link on the website.</div>
              </div>
            </Col>

            {/* Cột phải: Tổng quan */}
            <Col xs={24} md={16}>
              <div
                className='border-[1px] p-[24px] rounded-md bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
              >
                <h2 className='mb-5 font-bold text-[16px]'>Overview</h2>
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      name='name'
                      label='Affiliate Link Name'
                      rules={[
                        { required: true, message: 'Please enter affiliate link name!' },
                        { max: 120, message: 'Name cannot exceed 120 characters' },
                        { whitespace: true, message: 'Affiliate link name cannot be empty!' }
                      ]}
                    >
                      <Input size='large' placeholder='Enter affiliate link name...' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name='targetUrl'
                      label='Affiliate Link'
                      rules={[{ max: 120, message: 'URL cannot exceed 120 characters' }]}
                    >
                      <Input size='large' placeholder='Enter affiliate link...' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='price' label='Discounted Price'>
                      <Input size='large' placeholder='Enter discounted price...' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='originalPrice' label='Original Price'>
                      <Input size='large' placeholder='Enter original price...' />
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
