import { useNavigate, useParams } from 'react-router-dom'
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { Flex, Form, Input, Button, Switch, Select, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import ErrorLoad from '../../components/util/ErrorLoad'
import { useDispatch, useSelector } from 'react-redux'
import { categoryActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { ICategory } from '@/common/types.interface'
import { convertToSlug } from '@/utils/convertToSlug'
export default function EditCategory() {
  const params = useParams()
  const dispatch = useDispatch()
  const categoryStore = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(categoryActions.getCategoryById(params.id ?? '0') as unknown as AnyAction)
    dispatch(categoryActions.getCategories() as unknown as AnyAction)
  }, [])

  const navigate = useNavigate()
  const [form] = Form.useForm()

  const dataCategories = categoryStore.dataList
    ? categoryStore.dataList.map((item: ICategory) => {
        return {
          label: item.name,
          value: item.id
        }
      })
    : []

  const [imageUrl, setImageUrl] = useState<File>()
  const [DisplayPic, setDisplayPic] = useState<string>()

  useEffect(() => {
    if (categoryStore.data) {
      setDisplayPic(categoryStore.data.image)
    }
  }, [categoryStore])

  const handleCancel = () => {
    navigate('..')
  }

  const handleSubmit = async (values: any) => {
    const name = form.getFieldValue('name')
    const active = form.getFieldValue('active') ? 1 : 0
    const parent_id = form.getFieldValue('parent_id')
    const formData = new FormData()

    formData.append('name', name)
    formData.append('is_active', active as any)
    formData.append('parent_id', parent_id)

    if (imageUrl) {
      formData.append('image', imageUrl)
    }

    try {
      const payload = {
        ...values,
        id: params.id,
        slug: convertToSlug(name)
      }
      dispatch(categoryActions.updateCategory(params.id, payload) as unknown as AnyAction)
      popupSuccess('Update category success')
      navigate('/admin/categories?refresh=true')
    } catch (error) {
      popupError('Update category error')
    }
  }

  const selectedImg = (e) => {
    const types = ['jpeg', 'png', 'jpg', 'gif']

    const fileSelected = e.target.files[0]

    const size = fileSelected.size
    const type = types.includes(fileSelected.type.replace('image/', ''))

    if (size <= 1048576 && type) {
      setImageUrl(fileSelected)
      setDisplayPic(URL.createObjectURL(fileSelected))
    } else {
      e.target.value = ''
    }
  }
  if (categoryStore.error_message) {
    return <ErrorLoad />
  }
  return (
    <>
      <Drawer
        width={'70%'}
        loading={categoryStore.isLoading}
        title='Tạo danh mục mới'
        onClose={() => handleCancel()}
        open={true}
      >
        {categoryStore.data && (
          <Form
            form={form}
            name='category'
            layout='vertical'
            className='w-full p-6'
            onFinish={handleSubmit}
            initialValues={{
              parent_id: categoryStore?.data?.parent_id ? categoryStore?.data?.parent_id : '',
              is_active: categoryStore?.data?.is_active == 1 ? true : false,
              name: categoryStore?.data?.name
            }}
          >
            <Form.Item>
              <Flex justify='space-between' className='pb-4' align='center'>
                <h2 className=' font-bold text-[24px]'>Cập nhật danh mục "{categoryStore?.data?.name}"</h2>
                <Button
                  loading={categoryStore.isLoading}
                  disabled={categoryStore.isLoading}
                  type='primary'
                  htmlType='submit'
                  className=' w-[100px] p-5'
                >
                  cập nhật
                </Button>
              </Flex>
            </Form.Item>
            <Flex gap={100}>
              <Flex className='flex-[2] ' vertical gap={10}>
                <Flex vertical>
                  <Form.Item
                    name='upload'
                    className='border-[1px] p-[50px] rounded-md border-[#F1F1F4]'
                    style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
                  >
                    <div>
                      <h2 className='font-bold mb-2 text-[16px]'>Ảnh nhỏ</h2>
                      <div
                        style={{
                          flex: 5,
                          height: '200px',
                          overflow: 'hidden',
                          boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
                        }}
                        className='border-none rounded-[12px]  '
                      >
                        {DisplayPic ? (
                          <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                            <img
                              src={DisplayPic}
                              alt=''
                              className='object-cover h-[100%] object-center'
                              style={{ width: '100%' }}
                            />
                            <div
                              className=' absolute inset-0 z-1 opacity-0 group-hover:opacity-100 duration-1000'
                              style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}
                            ></div>
                            <button
                              style={{ zIndex: 999, fontSize: '20px', color: 'white' }}
                              onClick={() => setDisplayPic('')}
                            >
                              <DeleteOutlined className=' duration-1000 opacity-0 group-hover:opacity-100 absolute top-10 right-10' />
                            </button>
                          </div>
                        ) : (
                          <Flex
                            className='border-dashed border-2 relative hover:bg-gray-100 hover:border-solid hover:border'
                            vertical
                            gap={10}
                            justify='center'
                            align='center'
                            style={{ maxWidth: '100%', height: '100%', borderRadius: '12px' }}
                          >
                            <Flex vertical gap={10} style={{ width: '100%' }}>
                              <Flex vertical align='center' justify='center'>
                                <CloudUploadOutlined style={{ fontSize: '50px', color: 'gray' }} className='' />
                              </Flex>
                            </Flex>
                            <Flex style={{ width: '100%', color: 'gray' }} vertical justify='center' align='center'>
                              <span style={{ fontSize: '11px' }}>Kích thước tối đa: 50MB</span>
                              <span style={{ fontSize: '11px' }}>JPG, PNG, GIF, SVG</span>
                            </Flex>
                            <input
                              type='file'
                              accept='image/*'
                              name='image'
                              id='image'
                              multiple
                              className='opacity-0 absolute inset-0'
                              onChange={selectedImg}
                            />
                          </Flex>
                        )}
                      </div>
                    </div>
                  </Form.Item>
                </Flex>
                <div
                  className='border border-1 rounded-md overflow-hidden flex-1 '
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}
                >
                  <div className='p-2'>
                    <h2>Setting</h2>
                  </div>
                  <hr />
                  <div className='flex justify-between items-center p-2'>
                    <h2>active</h2>
                    <Form.Item className='m-0' label='' name='is_active' valuePropName='checked'>
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              </Flex>
              <Flex vertical className='flex-[6]'>
                <div
                  className='  border-[1px] p-[50px] rounded-md'
                  style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
                >
                  <h2 className='mb-5 font-bold text-[16px]'>Tổng quan</h2>
                  <Flex vertical gap={20}>
                    <Flex gap={30}>
                      <Form.Item
                        name='name'
                        label='Name'
                        className='w-full'
                        rules={[
                          { required: true, message: 'Vui lòng nhập tên danh mục!' },
                          { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                          {
                            whitespace: true,
                            message: 'Tên danh mục không được để trống!'
                          }
                        ]}
                      >
                        <Input size='large' placeholder='Nhập tên danh mục' />
                      </Form.Item>
                      <Form.Item name='parent_id' label='parent_id'>
                        <Select
                          loading={categoryStore.isLoading}
                          style={{ width: '200px', height: 40 }}
                          onChange={(v) => {
                            console.log(v)
                          }}
                          options={[{ value: '', label: 'none' }, ...dataCategories]}
                        />
                      </Form.Item>
                    </Flex>
                    <div></div>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Form>
        )}
      </Drawer>
    </>
  )
}
