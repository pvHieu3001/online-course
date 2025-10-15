import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Button, Switch, Select, Drawer, Spin, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { blogActions, tagActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { typeOptions } from '@/common/constants'
import TextEditor from '../../components/TextEditor/QuillEditor'
import { RootState } from '@/app/store'

export default function AddBlog() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState<File>()
  const [selectedTags, setSelectedTags] = useState<string>('')
  const tagStore = useSelector((state: RootState) => state.tag)

  useEffect(() => {
    dispatch(tagActions.getTags() as unknown as AnyAction)
  }, [dispatch])

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
    formData.append('isDisplayHot', form.getFieldValue('isDisplayHot') || false)
    formData.append('content', content)
    formData.append('tagStr', selectedTags ?? null)
    if (imageUrl) {
      formData.append('imageFile', imageUrl)
    }

    try {
      setIsLoading(true)
      await dispatch(blogActions.createBlog(formData) as unknown as AnyAction)
      await dispatch(blogActions.getAdminBlogs('', '', '') as unknown as AnyAction)
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
              <Form.Item
                label={<span className='font-semibold'>Ảnh đại diện</span>}
                className='border-[1px] p-[24px] rounded-md border-[#F1F1F4] bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
                rules={[{ required: true, message: 'Vui lòng chọn ảnh bài viết!' }]}
              >
                <div className='flex flex-col items-center'>
                  <label
                    htmlFor='image-upload'
                    className='flex flex-col items-center justify-center w-[180px] h-[180px] border rounded-md cursor-pointer bg-white hover:bg-gray-100'
                  >
                    {imageUrl ? (
                      <div className='relative group w-[180px] h-[180px] mb-2'>
                        <img
                          src={URL.createObjectURL(imageUrl as Blob)}
                          alt='Ảnh danh mục'
                          className='object-cover w-full h-full rounded-md border border-gray-300 bg-white'
                        />
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined />}
                          className='absolute top-1 right-1 opacity-80 hover:opacity-100 bg-white/80 p-1'
                          onClick={() => {
                            setImageUrl(undefined)
                            setIsDirty(true)
                          }}
                        />
                      </div>
                    ) : (
                      <input
                        id='image-upload'
                        type='file'
                        accept='image/*'
                        name='image'
                        className='hidden'
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (!e.target.files || e.target.files.length === 0) return
                          const file = e.target.files[0]
                          setImageUrl(file)
                        }}
                      />
                    )}
                  </label>
                </div>
              </Form.Item>
              <div className='bg-white rounded-md shadow-sm p-4 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Cài đặt hiển thị</h2>
                <p className='text-xs text-gray-500'>Bật để bài viết hiển thị trên website.</p>
                <Form.Item label='Kích hoạt' name='status' valuePropName='checked'>
                  <Switch />
                </Form.Item>
                <Form.Item name='isDisplayHot' label='Bài viết nổi bật' valuePropName='checked'>
                  <Switch className='w-20' checkedChildren='Hiện' unCheckedChildren='Ẩn' />
                </Form.Item>
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
                <Form.Item name='tagStr' label='Tags'>
                  <Select
                    mode='tags'
                    placeholder='Nhập hoặc chọn tag'
                    size='large'
                    className='w-full'
                    options={tagStore.dataList?.map((tag) => ({
                      value: tag.id,
                      label: tag.name
                    }))}
                    onChange={(value) => setSelectedTags(value)}
                  />
                </Form.Item>
                <Form.Item name='content' label='Nội dung chi tiết'>
                  <TextEditor
                    content={content}
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
              <div
                className='text-xl leading-8 text-gray-800 
                [&_p]:mb-4 
                [&_p]:text-xl
                [&_h1]:text-4xl 
                [&_h2]:text-3xl 
                [&_h3]:text-2xl 
                [&_ul]:list-disc 
                [&_ul]:pl-6 
                [&_a]:text-blue-600 [&_a:hover]:underline'
                dangerouslySetInnerHTML={{ __html: content || '' }}
              />
            </div>
          </div>
        </Form>
      </Spin>
    </Drawer>
  )
}
