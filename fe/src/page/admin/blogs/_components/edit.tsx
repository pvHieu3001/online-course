import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Switch, Drawer, Col, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import ErrorLoad from '../../components/util/ErrorLoad'
import { useDispatch, useSelector } from 'react-redux'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { IBlog } from '@/common/types.interface'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Spin } from 'antd'
import { RootState } from '@/app/store'
import TextEditor from '../../components/TextEditor/QuillEditor'
import { typeOptions } from '@/common/constants'

export default function EditBlog() {
  const params = useParams()
  const dispatch = useDispatch()
  const blogStore = useSelector((state: RootState) => state.blog)
  useEffect(() => {
    dispatch(blogActions.getBlogById(params.id ?? '0') as unknown as AnyAction)
    dispatch(blogActions.getAdminBlogs('') as unknown as AnyAction)
  }, [])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (blogStore.data) {
      const data = blogStore.data as IBlog

      form.setFieldsValue({
        status: data.status,
        description: data.description,
        name: data.title,
        type: data.type,
        content: data.content
      })
    }
  }, [blogStore])

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
    formData.append('status', form.getFieldValue('status').toString())
    formData.append('content', form.getFieldValue('content'))
    formData.append('type', form.getFieldValue('type'))

    try {
      await dispatch(blogActions.updateBlog(params.id, formData) as unknown as AnyAction)
      await dispatch(blogActions.getAdminBlogs('') as unknown as AnyAction)
      popupSuccess('Cập nhật bài viết thành công')
      setIsDirty(false)
      navigate('..')
    } catch (error) {
      console.error('Error updating Blog:', error)
      popupError('Cập nhật bài viết thất bại')
    }
  }

  // Đánh dấu form đã thay đổi
  const onValuesChange = () => setIsDirty(true)

  if (blogStore.error_message) {
    return <ErrorLoad />
  }
  return (
    <Drawer
      width='80%'
      title={<div className='text-center font-bold text-2xl'>Chỉnh sửa bài viết</div>}
      onClose={handleCancel}
      open={true}
      bodyStyle={{ padding: 24, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
      footer={
        <div className='flex justify-between items-center px-4 py-2 border-t'>
          <span className='text-sm text-gray-500'>* Kiểm tra kỹ nội dung trước khi cập nhật</span>
          <div className='space-x-2'>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type='primary' htmlType='submit' form='Blog-form' loading={blogStore.isLoading}>
              Cập nhật
            </Button>
          </div>
        </div>
      }
    >
      <Spin spinning={blogStore.isLoading} tip='Đang tải...'>
        {blogStore.data && (
          <Form
            id='Blog-form'
            form={form}
            name='Blog'
            layout='vertical'
            onFinish={handleSubmit}
            onValuesChange={onValuesChange}
            initialValues={blogStore.data}
          >
            <Row gutter={[24, 24]}>
              {/* Cài đặt hiển thị */}
              <Col xs={24} md={8}>
                <div className='bg-white rounded-md shadow-sm p-4 space-y-4'>
                  <h2 className='text-lg font-semibold text-gray-700'>Cài đặt hiển thị</h2>
                  <Form.Item label='Kích hoạt' name='status' valuePropName='checked'>
                    <Switch />
                  </Form.Item>
                  <p className='text-xs text-gray-500'>Bật để bài viết này hiển thị trên website.</p>
                </div>
              </Col>

              {/* Thông tin bài viết */}
              <Col xs={24} md={16}>
                <div className='bg-white rounded-md shadow-sm p-6 space-y-4'>
                  <h2 className='text-lg font-semibold text-gray-700'>Thông tin bài viết</h2>
                  <Form.Item
                    name='title'
                    label='Tiêu đề bài viết'
                    rules={[
                      { required: true, message: 'Vui lòng nhập tiêu đề bài viết!' },
                      { max: 120, message: 'Tiêu đề không vượt quá 120 ký tự' },
                      { whitespace: true, message: 'Tiêu đề bài viết không được để trống!' }
                    ]}
                  >
                    <Input size='large' placeholder='Nhập tiêu đề bài viết...' />
                  </Form.Item>
                  <Form.Item name='description' label='Mô tả bài viết'>
                    <Input size='large' placeholder='Nhập mô tả bài viết...' />
                  </Form.Item>

                  <Form.Item name='type' label='Loại bài viết'>
                    <Select
                      showSearch
                      placeholder='Chọn loại bài viết'
                      optionFilterProp='label'
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={typeOptions}
                    />
                  </Form.Item>

                  <Form.Item name='content' label='Nội dung chi tiết'>
                    <TextEditor
                      content={form.getFieldValue('content') ?? ''}
                      onHandleChange={(value) => form.setFieldValue('content', value)}
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
                <h1>{form.getFieldValue('name')}</h1>
                <div dangerouslySetInnerHTML={{ __html: form.getFieldValue('content') || '' }} />
              </div>
            </div>
          </Form>
        )}
      </Spin>
    </Drawer>
  )
}
