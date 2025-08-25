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
    const title = form.getFieldValue('title')
    const active = form.getFieldValue('status')
    const formData = new FormData()

    formData.append('title', title)
    formData.append('status', active.toString())
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
      width='70%'
      title={<span className='font-bold text-xl'>Chỉnh sửa bài viết</span>}
      onClose={handleCancel}
      open={true}
      bodyStyle={{ padding: 24, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' form='Blog-form' loading={blogStore.isLoading}>
            Cập nhật
          </Button>
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
            initialValues={{}}
          >
            <Row gutter={[24, 24]}>
              {/* Cột trái: Ảnh và Cài đặt */}
              <Col xs={24} md={8}>
                <div
                  className='border rounded-md bg-[#fafbfc] overflow-hidden'
                  style={{ boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.05)' }}
                >
                  <div className='p-2'>
                    <h2 className='font-semibold'>Cài đặt</h2>
                  </div>
                  <hr />
                  <div className='flex justify-between items-center p-2'>
                    <span>Kích hoạt hiển thị</span>
                    <Form.Item className='m-0' label='' name='status' valuePropName='checked'>
                      <Switch />
                    </Form.Item>
                  </div>
                  <div className='text-xs text-gray-400 px-2 pb-2'>Bật để bài viết này hiển thị trên website.</div>
                </div>
              </Col>

              {/* Cột phải: Tổng quan */}
              <Col xs={24} md={16}>
                <div
                  className='border p-6 rounded-md bg-[#fafbfc]'
                  style={{ boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.03)' }}
                >
                  <h2 className='mb-5 font-bold text-[16px]'>Tổng quan</h2>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name='name'
                        label='Tiêu đề bài viết'
                        rules={[
                          { required: true, message: 'Vui lòng nhập tiêu đề bài viết!' },
                          { max: 120, message: 'Tiêu đề không vượt quá 120 ký tự' },
                          { whitespace: true, message: 'Tiêu đề bài viết không được để trống!' }
                        ]}
                      >
                        <Input size='large' placeholder='Nhập tiêu đề bài viết...' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name='type' label='Loại bài viết' className='w-full max-w-[250px]'>
                        <Select
                          showSearch
                          style={{ width: '100%', height: 40 }}
                          placeholder='Chọn bài viết cha (nếu có)'
                          optionFilterProp='label'
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={[{ value: '', label: 'Không có' }, [{ value: 'news', label: 'Không có' }]]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name='content' label='Nội dung chi tiết'>
                        <Input.TextArea rows={6} placeholder='Nhập nội dung chi tiết...' size='large' />
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
