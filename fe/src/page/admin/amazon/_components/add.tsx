import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'

export default function AddAmazon() {
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
        title: 'Bạn có chắc muốn rời khỏi trang?',
        icon: <ExclamationCircleOutlined />,
        content: 'Các thay đổi chưa được lưu sẽ bị mất.',
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
      setIsLoading(true)
      await dispatch(amazonActions.createAmazon(formData) as unknown as AnyAction)
      await dispatch(amazonActions.getAdminAmazons('') as unknown as AnyAction)
      popupSuccess('Thêm link afiliate thành công')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      popupError('Thêm link afiliate thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const onValuesChange = () => setIsDirty(true)

  return (
    <Drawer
      width={'100%'}
      title={<span className='font-bold text-xl'>Tạo bài viết thread</span>}
      onClose={handleCancel}
      open={true}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' form='Amazon-form' loading={isLoading}>
            Lưu bài viết
          </Button>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Đang lưu...'>
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
                <h2 className='mb-5 font-bold text-[16px]'>Nội dung bài viết</h2>
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      name='sourceUrl'
                      label='Link bài viết thread'
                      rules={[
                        { required: true, message: 'Vui lòng nhập link thread!' },
                        { whitespace: true, message: 'Link bài viết không được để trống!' }
                      ]}
                    >
                      <Input size='large' placeholder='Nhập link thread...' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='amzUrl' label='Link Amazon' rules={[{ message: 'Vui lòng nhập link affiliate!' }]}>
                      <Input size='large' placeholder='Nhập link afiliate...' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='caption' label='Caption bài viết'>
                      <Input size='large' placeholder='Nhập Caption...' />
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
