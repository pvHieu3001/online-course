import { Col, Flex, Row, Button, Form, Input, Drawer, InputNumber, Card, Divider, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '@/app/actions/course.actions'
import { categoryActions } from '@/app/actions/category.actions'
import { AnyAction } from '@reduxjs/toolkit'
import TextEditor from './TextEditor/TextEditor'

function AddProduct() {
  const dispatch = useDispatch()
  const categoryStore = useSelector((state: any) => state.category)
  const courseStore = useSelector((state: any) => state.course)
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<Blob>()
  const [displayPic, setDisplayPic] = useState<string>()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<string>('')

  useEffect(() => {
    dispatch(categoryActions.getCategories() as any)
  }, [dispatch])

  const onFinish = async () => {
    const name = form.getFieldValue('name')
    const category_id = form.getFieldValue('category_id')
    const language = form.getFieldValue('language')
    const level = form.getFieldValue('level')
    const price = form.getFieldValue('price')
    const source_url = form.getFieldValue('source_url')
    const status = form.getFieldValue('status')

    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('category_id', category_id)
    formdata.append('description', detail)
    formdata.append('imageFile', imageUrl as Blob)
    formdata.append('language', language)
    formdata.append('level', level)
    formdata.append('price', price ?? 0)
    formdata.append('source_url', source_url)
    formdata.append('status', status)

    try {
      await dispatch(courseActions.createCourse(formdata) as unknown as AnyAction)
      popupSuccess('Thêm sản phẩm thành công')
      navigate('..')
    } catch (error) {
      popupError('Thêm sản phẩm thất bại')
    }
  }

  const handleCancel = () => {
    navigate('..')
  }

  // Xử lý chọn ảnh đại diện (giống bên edit)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    if (file.size > 2 * 1024 * 1024) {
      popupError('Ảnh phải nhỏ hơn 2MB')
      return
    }
    setImageUrl(file)
    setDisplayPic(URL.createObjectURL(file))
  }

  // Xử lý xóa ảnh đã chọn
  const handleDeleteImage = () => {
    setImageUrl(undefined)
    setDisplayPic(undefined)
  }

  return (
    <>
      <Drawer
        open={true}
        title={<h2 className=' font-bold text-[24px]'>Tạo sản phẩm mới</h2>}
        width={'85%'}
        styles={{
          header: { height: 60 },
          body: { paddingBottom: 80 }
        }}
        onClose={handleCancel}
      >
        <Form layout='vertical' form={form} name='nest-messages' onFinish={onFinish} className='p-10 relative'>
          <Card title='Thông tin khoá học' size='small' style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='name'
                  label='Tên khoá học'
                  rules={[{ required: true, message: 'Vui lòng nhập tên khoá học!' }]}
                >
                  <Input placeholder='Nhập tên khoá học' size='large' />
                </Form.Item>
                <Form.Item name='category_id' label='Danh mục'>
                  <Select
                    placeholder='Chọn danh mục'
                    loading={categoryStore.isLoading}
                    allowClear
                    showSearch
                    optionFilterProp='children'
                    size='large'
                  >
                    {categoryStore.dataList?.map((cat: any) => (
                      <Select.Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name='source_url' label='Nguồn video'>
                  <Input placeholder='Nhập URL nguồn video' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='language' label='Ngôn ngữ'>
                  <Select placeholder='Chọn ngôn ngữ'>
                    <Select.Option value='vi'>Tiếng Việt</Select.Option>
                    <Select.Option value='en'>English</Select.Option>
                    <Select.Option value='jp'>日本語</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name='level' label='Trình độ'>
                  <Select placeholder='Chọn trình độ'>
                    <Select.Option value='beginner'>Beginner</Select.Option>
                    <Select.Option value='intermediate'>Intermediate</Select.Option>
                    <Select.Option value='advanced'>Advanced</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name='price' label='Giá'>
                  <InputNumber className='w-full' min={0} placeholder='Nhập giá' />
                </Form.Item>
                <Form.Item name='status' label='Trạng thái'>
                  <Select placeholder='Chọn trạng thái'>
                    <Select.Option value='active'>Hoạt động</Select.Option>
                    <Select.Option value='inactive'>Không hoạt động</Select.Option>
                    <Select.Option value='draft'>Bản nháp</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card size='small' style={{ marginBottom: 24 }}>
            <Form.Item name='description' label='Nhập mô tả' required>
              <TextEditor content={detail} onHandleChange={(val) => setDetail(val)} />
            </Form.Item>
          </Card>
          <Card size='small' style={{ marginBottom: 24 }}>
            <Form.Item
              name='imageFile'
              className='p-[30px] sm:rounded-lg border-[#F1F1F4] m-0'
              style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 1rem' }}
            >
              <Flex vertical gap={20}>
                <h2 className='font-bold text-[16px]'>Ảnh đại diện</h2>
                <div
                  style={{
                    flex: 5,
                    overflow: 'hidden',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
                  }}
                  className='border-none rounded-[12px] relative'
                >
                  <Flex
                    className='border-dashed border-2 p-5 relative hover:bg-gray-100 hover:border-solid'
                    vertical
                    gap={10}
                    justify='center'
                    align='center'
                    style={{ width: '100%', minHeight: '120px', borderRadius: '12px' }}
                  >
                    {/* Hiển thị preview ảnh nếu đã chọn */}
                    {displayPic ? (
                      <div className='h-[100px] w-[120px] rounded-lg overflow-hidden relative'>
                        <img
                          src={displayPic}
                          alt='Preview'
                          className='object-cover h-full w-full object-center rounded-lg border border-gray-300 bg-white'
                        />
                        <Button
                          type='text'
                          danger
                          size='small'
                          style={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
                          onClick={handleDeleteImage}
                        >
                          Xóa
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor='image-upload'
                        className='flex flex-col items-center justify-center w-[120px] h-[100px] border rounded-md cursor-pointer bg-white hover:bg-gray-100'
                      >
                        <CloudUploadOutlined style={{ fontSize: 24, color: '#aaa' }} />
                        <span className='text-xs text-gray-400'>Chọn ảnh</span>
                        <input
                          id='image-upload'
                          type='file'
                          accept='image/*'
                          name='imageFile'
                          className='hidden'
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </Flex>
                </div>
              </Flex>
            </Form.Item>
          </Card>
          {/* Nếu muốn giữ gallery, có thể thêm lại logic gallery ở dưới */}
          <Flex className='fixed z-[10000000] top-[15px] right-10' gap={20}>
            <Button loading={courseStore.isLoading} disabled={courseStore.isLoading} htmlType='submit' type='primary'>
              Tạo
            </Button>
            <Button type='dashed'>Đặt lại</Button>
          </Flex>
        </Form>
      </Drawer>
    </>
  )
}

export default AddProduct
