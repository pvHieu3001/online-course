import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Switch, Select, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import TextEditor from '../../components/TextEditor/QuillEditor'
import { typeOptions } from '@/common/constants'

export default function AddBlog() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false) // giả lập loading nếu chưa có biến
  const dispatch = useDispatch()

  // Xác nhận khi rời nếu có thay đổi
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
    const formData = new FormData()

    formData.append('title', form.getFieldValue('title'))
    formData.append('description', form.getFieldValue('description'))
    formData.append('type', form.getFieldValue('type'))
    formData.append('status', form.getFieldValue('status').toString())
    formData.append('content', content)

    try {
      setIsLoading(true)
      await dispatch(blogActions.createBlog(formData) as unknown as AnyAction)
      await dispatch(blogActions.getAdminBlogs('') as unknown as AnyAction)
      popupSuccess('Thêm bài viết thành công')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      popupError('Thêm bài viết thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const onValuesChange = () => setIsDirty(true)

  return (
    <Drawer
      width='80%'
      title={<div className='text-center font-bold text-2xl'>Tạo bài viết mới</div>}
      onClose={handleCancel}
      open={true}
      footer={
        <div className='flex justify-between items-center px-4 py-2 border-t'>
          <span className='text-sm text-gray-500'>* Kiểm tra kỹ nội dung trước khi lưu</span>
          <div className='space-x-2'>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type='primary' htmlType='submit' form='Blog-form' loading={isLoading}>
              Lưu bài viết
            </Button>
          </div>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Đang lưu...'>
        <Form
          id='Blog-form'
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
          initialValues={{ status: true }}
        >
          <Row gutter={[24, 24]}>
            {/* Cài đặt */}
            <Col xs={24} lg={8}>
              <div className='bg-white rounded-md shadow-sm p-4 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Cài đặt hiển thị</h2>
                <Form.Item label='Kích hoạt' name='status' valuePropName='checked'>
                  <Switch />
                </Form.Item>
                <p className='text-xs text-gray-500'>Bật để bài viết hiển thị trên website.</p>
              </div>
            </Col>

            {/* Thông tin bài viết */}
            <Col xs={24} lg={16}>
              <div className='bg-white rounded-md shadow-sm p-6 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Thông tin bài viết</h2>
                <Form.Item name='title' label='Tiêu đề' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                  <Input size='large' placeholder='Nhập tiêu đề...' />
                </Form.Item>
                <Form.Item name='description' label='Mô tả bài viết'>
                  <Input size='large' placeholder='Nhập mô tả bài viết...' />
                </Form.Item>
                <Form.Item name='type' label='Loại bài viết'>
                  <Select placeholder='Chọn loại' options={typeOptions} />
                </Form.Item>
                <Form.Item name='content' label='Nội dung chi tiết'>
                  <TextEditor
                    content={content ?? ''}
                    onHandleChange={(value) => {
                      setContent(value)
                    }}
                    height={400}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>

          {/* Xem trước nội dung */}
          <div className='mt-6 bg-gray-50 rounded-md p-4 border'>
            <h3 className='text-lg font-semibold mb-2'>Xem trước bài viết</h3>
            <div className='prose max-w-none'>
              <h1>{form.getFieldValue('title')}</h1>
              <div dangerouslySetInnerHTML={{ __html: content || '' }} />
            </div>
          </div>
        </Form>
      </Spin>
    </Drawer>
  )
}
