import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Drawer, Col, Row, Space } from 'antd'
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
import TextEditor from '../../components/TextEditor/QuillEditor'

export default function EditAmazon() {
  const params = useParams()
  const dispatch = useDispatch()
  const amazonStore = useSelector((state: RootState) => state.amazon)
  const [caption, setCaption] = useState('')
  const [amzUrl, setAmzUrl] = useState('')

  useEffect(() => {
    dispatch(amazonActions.getAmazonById(params.id ?? '0') as unknown as AnyAction)
    dispatch(amazonActions.getAdminAmazons('', '', '', '', 0, 10) as unknown as AnyAction)
    setCaption('')
    setAmzUrl('')
  }, [dispatch, params.id])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (amazonStore.data) {
      const data = amazonStore.data as IAmazon
      setCaption(data.caption)
      if (data?.amzUrl) {
        setAmzUrl(data.amzUrl)
      } else {
        const linkRegex = /(https?:\/\/[^\s]+)/g
        const match = data?.caption?.match(linkRegex)
        const link = match?.[0] ?? ''
        setAmzUrl(link)
      }
      form.setFieldsValue({
        productName: data.productName,
        sourceUrl: data.sourceUrl,
        caption: data.caption,
        amzUrl: amzUrl,
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
    const productName = form.getFieldValue('productName')
    const formData = new FormData()

    const captionWithNewlines = caption.replace(/<\/p>/g, '\n')
    const finalCaption = captionWithNewlines.replace(/<[^>]*>/g, '').trim()

    formData.append('sourceUrl', sourceUrl)
    formData.append('amzUrl', amzUrl ?? '')
    formData.append('caption', finalCaption)
    formData.append('productName', productName)

    try {
      await dispatch(amazonActions.updateAmazon(params.id, formData) as unknown as AnyAction)
      await dispatch(amazonActions.getAdminAmazons('', '', '', '', 0, 10) as unknown as AnyAction)
      popupSuccess('Cập nhật link afiliate thành công')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      console.error('Error updating afiliate:', error)
      popupError('Cập nhật link afiliate thất bại')
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
      title={<span className='font-bold text-xl'>Chỉnh sửa viết thread</span>}
      onClose={handleCancel}
      open={true}
      bodyStyle={{ padding: 24, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' form='Amazon-form' loading={amazonStore.isLoading}>
            Cập nhật
          </Button>
        </div>
      }
    >
      <Spin spinning={amazonStore.isLoading} tip='Đang tải...'>
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
                  <h2 className='mb-5 font-bold text-[16px]'>Nội dung bài viết</h2>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        name='productName'
                        label='Tên sản phẩm'
                        rules={[
                          { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                          { whitespace: true, message: 'Tên sản phẩm không được để trống!' }
                        ]}
                      >
                        <Input size='large' placeholder='Nhập tên sản phẩm...' allowClear />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name='sourceUrl'
                        label='Link bài viết thread'
                        rules={[
                          { required: true, message: 'Vui lòng nhập link thread!' },
                          { whitespace: true, message: 'Link bài viết không được để trống!' }
                        ]}
                      >
                        <Input size='large' placeholder='Nhập tên link thread...' allowClear />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label='Link Amazon'>
                        <Space.Compact style={{ width: '100%' }}>
                          <Form.Item name='amzUrl' noStyle rules={[{ message: 'Vui lòng nhập link affiliate!' }]}>
                            <Input size='large' placeholder='Nhập link affiliate...' allowClear />
                          </Form.Item>
                          <Button size='large' type='primary' href={amzUrl} target='_blank'>
                            Rút gọn
                          </Button>
                        </Space.Compact>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name='caption' className='m-0' label={'Caption bài viết'}>
                        <TextEditor
                          content={caption ?? ''}
                          onHandleChange={(value) => {
                            setCaption(value)
                          }}
                          height={200}
                        />
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
