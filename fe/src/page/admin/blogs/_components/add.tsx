import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Switch, Select, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { blogActions } from '@/app/actions'
import { IBlog } from '@/common/types.interface'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export default function AddBlog() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // giả lập loading nếu chưa có biến
  const dispatch = useDispatch()
  const blogStore = useSelector((state: RootState) => state.blog)

  // Lấy danh sách Blog cha khi mount
  useEffect(() => {
    dispatch(blogActions.getAdminBlogs('') as unknown as AnyAction)
  }, [dispatch])

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
    const name = form.getFieldValue('name')
    const active = form.getFieldValue('status')
    const formData = new FormData()

    formData.append('name', name)
    formData.append('status', active.toString())

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
      width={'70%'}
      title={<span className='font-bold text-xl'>Tạo bài viết mới</span>}
      onClose={handleCancel}
      open={true}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' form='Blog-form' loading={isLoading}>
            Lưu bài viết
          </Button>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Đang lưu...'>
        <Form
          id='Blog-form'
          form={form}
          name='Blog'
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
              <div
                className='border rounded-md overflow-hidden flex-1 bg-[#fafbfc]'
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}
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
                className='border-[1px] p-[24px] rounded-md bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
              >
                <h2 className='mb-5 font-bold text-[16px]'>Tổng quan</h2>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name='name'
                      label='Tiêu đề bài viết'
                      className='w-full max-w-[350px]'
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
                        options={[{ value: '', label: 'Không có' },{ value: 'news', label: 'Tin Tức' }]}
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
      </Spin>
    </Drawer>
  )
}
