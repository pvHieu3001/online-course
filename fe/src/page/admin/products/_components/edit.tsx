/* eslint-disable react-refresh/only-export-components */
import { Col, Flex, Row, Button, Form, Input, Drawer, InputNumber, Card, Select, Switch } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { popupError, popupSuccess } from '@/page/shared/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { courseActions } from '@/app/actions/course.actions'
import { categoryActions } from '@/app/actions/category.actions'
import { AnyAction } from '@reduxjs/toolkit'
import { formatDate } from '@/utils/formatDate'
import TextEditor from '../../components/TextEditor/QuillEditor'
import { RootState } from '@/app/store'
import { ICategory, IUrl } from '@/common/types.interface'
import { getImageUrl } from '@/utils/getImageUrl'
import { useQuery } from '@/utils/useQuery'
import { tagActions } from '@/app/actions'
import { ReactSortable } from 'react-sortablejs'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

function EditProduct() {
  const navigator = useNavigate()
  const query = useQuery()
  const { flug } = useParams()
  const dispatch = useDispatch()
  const courseStore = useSelector((state: RootState) => state.course)
  const categoryStore = useSelector((state: RootState) => state.category)
  const tagStore = useSelector((state: RootState) => state.tag)
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<Blob>()
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [courseBenefits, setCourseBenefits] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string>('')
  const [displayPic, setDisplayPic] = useState<string>()

  useEffect(() => {
    if (flug) {
      dispatch(courseActions.getCourseById(flug) as unknown as AnyAction)
    }
    dispatch(categoryActions.getAdminCategories('') as unknown as AnyAction)
    dispatch(tagActions.getTags() as unknown as AnyAction)
  }, [dispatch, flug])

  useEffect(() => {
    if (courseStore.data && !courseStore.isLoading) {
      const dataUrl =
        courseStore.data.urls?.map((item) => ({
          id: item.id,
          link: item.link,
          seqNo: item.seqNo
        })) || []

      dataUrl.sort((a, b) => a.seqNo - b.seqNo)

      form.resetFields()
      form.setFieldsValue({
        createdAt: formatDate(courseStore.data.createdAt ? new Date(courseStore.data?.createdAt) : new Date()),
        createdBy: courseStore.data.createdBy,
        updatedAt: formatDate(courseStore.data?.updatedAt ? new Date(courseStore.data?.updatedAt) : new Date()),
        updatedBy: courseStore.data.updatedBy,
        categoryId: courseStore.data.category?.id,
        content: courseStore.data.content,
        description: courseStore.data.description,
        courseBenefits: courseStore.data.courseBenefits,
        language: courseStore.data.language,
        level: courseStore.data.level,
        name: courseStore.data.name,
        price: courseStore.data.price,
        rating: courseStore.data.rating,
        slug: courseStore.data.slug,
        sourceUrl: courseStore.data.sourceUrl,
        status: courseStore.data.status === 'active',
        isDisplayHot: courseStore.data.isDisplayHot ?? false,
        totalRating: courseStore.data.totalRating,
        totalStudents: courseStore.data.totalStudents,
        tagStr: courseStore.data.tags?.flatMap((item) => item.id),
        urls: dataUrl.map((item) => ({ id: item.id, link: item.link, seqNo: item.seqNo }))
      })
      setDescription(courseStore.data.description ?? '')
      setContent(courseStore.data.content ?? '')
      setCourseBenefits(courseStore.data.courseBenefits ?? '')
      setSelectedTags(courseStore.data?.tags?.map((tag) => tag.id).join(',') || '')
      if (courseStore.data?.imageUrl) {
        setDisplayPic(getImageUrl(courseStore.data.imageUrl))
      }
    }
  }, [courseStore.data, courseStore.isLoading, form])

  const onFinish = async () => {
    const id = courseStore.data?.id
    const name = form.getFieldValue('name')
    const categoryId = form.getFieldValue('categoryId')
    const language = form.getFieldValue('language')
    const level = form.getFieldValue('level')
    const price = form.getFieldValue('price')
    const sourceUrl = form.getFieldValue('sourceUrl')
    const status = form.getFieldValue('status')
    const isDisplayHot = form.getFieldValue('isDisplayHot')

    const urlForms = form.getFieldValue('urls') || []
    const urls = urlForms
      .map((item: IUrl, index: number) => ({
        id: item.id || null,
        link: item.link || '',
        seqNo: index + 1
      }))
      .filter((item: IUrl) => item.link && item.link.trim() !== '')

    const formdata = new FormData()
    formdata.append('id', id as string)
    formdata.append('name', name)
    formdata.append('categoryId', categoryId)
    formdata.append('content', content)
    formdata.append('description', description)
    formdata.append('courseBenefits', courseBenefits)
    if (imageUrl) {
      formdata.append('imageFile', imageUrl as Blob)
    }
    formdata.append('sourceUrl', sourceUrl)
    formdata.append('language', language)
    formdata.append('level', level)
    formdata.append('price', price ?? 0)
    formdata.append('status', status ? 'active' : 'inactive')
    formdata.append('isDisplayHot', isDisplayHot ?? false)
    formdata.append('tagStr', selectedTags)
    formdata.append('urlsJson', JSON.stringify(urls))

    try {
      await dispatch(courseActions.updateCourse(id as string, formdata) as unknown as AnyAction)
      await dispatch(
        courseActions.getAdminCourses(
          query.get('status') ?? '',
          query.get('search') ?? '',
          query.get('isHot') ?? '',
          Number.parseInt(query.get('page') ?? '0'),
          10
        ) as unknown as AnyAction
      )
      popupSuccess('Course updated successfully')
      navigator('..')
    } catch (error) {
      popupError('Failed to update course')
    }
  }

  const handleCancel = async () => {
    dispatch(courseActions.resetCourse() as unknown as AnyAction)
    await dispatch(
      courseActions.getAdminCourses(
        query.get('status') ?? '',
        query.get('search') ?? '',
        query.get('isHot') ?? '',
        Number.parseInt(query.get('page') ?? '0'),
        10
      ) as unknown as AnyAction
    )
    navigator('..')
  }

  return (
    <>
      {courseStore.data && !courseStore.isLoading && (
        <Drawer
          key={courseStore.data?.id}
          open={true}
          title={
            <>
              <h2 className=' font-bold text-[24px]'>Update Course</h2>
            </>
          }
          width={'85%'}
          styles={{
            header: {
              height: 60
            },
            body: {
              paddingBottom: 80
            }
          }}
          onClose={handleCancel}
        >
          <Form
            layout='vertical'
            form={form}
            name='nest-messages'
            onFinish={onFinish}
            className='p-10 relative'
            initialValues={{
              id: courseStore.data?.id
            }}
          >
            <Card title='System Information' size='small' style={{ marginBottom: 24, background: '#fafafa' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='slug' label='Slug'>
                    <Input disabled placeholder='Enter slug' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='total_students' label='Total Students'>
                    <InputNumber disabled className='w-full' min={0} placeholder='Enter total students' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='total_rating' label='Total Ratings'>
                    <InputNumber disabled className='w-full' min={0} placeholder='Enter total ratings' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='rating' label='Rating'>
                    <InputNumber
                      disabled
                      className='w-full'
                      min={0}
                      max={5}
                      step={0.1}
                      placeholder='Enter rating score'
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='createdAt' label='Created At'>
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name='updatedAt' label='Updated At'>
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title='Course Information' size='small' style={{ marginBottom: 24 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name='name'
                    label='Course Name'
                    rules={[{ required: true, message: 'Please enter course name!' }]}
                  >
                    <Input placeholder='Enter course name' size='large' />
                  </Form.Item>
                  {categoryStore.dataList?.length > 0 && (
                    <Form.Item
                      name='categoryId'
                      label='Category'
                      rules={[{ required: true, message: 'Please select category!' }]}
                    >
                      <Select
                        placeholder='Select category'
                        loading={categoryStore.isLoading}
                        allowClear
                        showSearch
                        optionFilterProp='children'
                        size='large'
                      >
                        {categoryStore.dataList?.map((cat: ICategory) => (
                          <Select.Option key={cat.id} value={cat.id}>
                            {cat.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  <Form.Item name='tagStr' label='Tags'>
                    <Select
                      mode='tags'
                      placeholder='Enter or select tag'
                      size='large'
                      className='w-full'
                      options={tagStore.dataList?.map((tag) => ({
                        value: tag.id,
                        label: tag.name
                      }))}
                      onChange={(value) => setSelectedTags(value)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name='language' label='Language'>
                    <Select placeholder='Select language' size='large'>
                      <Select.Option value='vi'>Vietnamese</Select.Option>
                      <Select.Option value='en'>English</Select.Option>
                      <Select.Option value='jp'>日本語</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name='level' label='Level'>
                    <Select placeholder='Select level' size='large'>
                      <Select.Option value='beginner'>Beginner</Select.Option>
                      <Select.Option value='intermediate'>Intermediate</Select.Option>
                      <Select.Option value='advanced'>Advanced</Select.Option>
                    </Select>
                  </Form.Item>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name='price' label='Price'>
                        <InputNumber className='w-full' min={0} placeholder='Enter price' size='large' />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name='status' label='Status' valuePropName='checked'>
                        <Switch className='w-20' checkedChildren='Show' unCheckedChildren='Hide' />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name='isDisplayHot' label='Featured Course' valuePropName='checked'>
                        <Switch className='w-20' checkedChildren='Show' unCheckedChildren='Hide' />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Card size='small' style={{ marginBottom: 24 }}>
              <Form.Item label='Resource Source'>
                <Form.List name='urls'>
                  {(fields, { add, remove, move }) => (
                    <>
                      <ReactSortable
                        list={fields}
                        setList={() => {}}
                        onEnd={(evt) => {
                          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
                            move(evt.oldIndex, evt.newIndex)
                          }
                        }}
                        animation={200}
                      >
                        {fields.map((field, index) => (
                          <Row
                            key={field.key}
                            gutter={[8, 8]}
                            justify='center'
                            align='middle'
                            style={{ marginBottom: 8, cursor: 'grab' }}
                          >
                            <Col xs={24} sm={4} style={{ textAlign: 'center' }}>
                              <span>Part {index + 1}</span>
                            </Col>

                            <Col xs={24} sm={18} style={{ textAlign: 'center' }}>
                              <Form.Item
                                {...field}
                                name={[field.name, 'link']}
                                fieldKey={[field.fieldKey, 'link']}
                                rules={[{ required: true, message: 'Please enter URL' }]}
                                noStyle
                              >
                                <Input size='large' placeholder={`Part ${index + 1} URL`} />
                              </Form.Item>
                              <Form.Item {...field} name={[field.name, 'id']} noStyle hidden>
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col xs={24} sm={2} style={{ textAlign: 'center' }}>
                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                                style={{ fontSize: 20, color: '#ff4d4f', cursor: 'pointer' }}
                              />
                            </Col>
                          </Row>
                        ))}
                      </ReactSortable>

                      <Form.Item>
                        <Button type='dashed' onClick={() => add({ id: '', link: '' })} icon={<PlusOutlined />} block>
                          Add URL
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Card>
            <Card size='small' style={{ marginBottom: 24 }}>
              <Form.Item name='content' className='m-0' label={'Course Content'}>
                <TextEditor
                  content={content ?? ''}
                  onHandleChange={(value) => {
                    setContent(value)
                  }}
                  height={400}
                />
              </Form.Item>
            </Card>
            <Card size='small' style={{ marginBottom: 24 }}>
              <Form.Item
                name='gallery'
                className='p-[30px] sm:rounded-lg border-[#F1F1F4] m-0'
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 1rem' }}
              >
                <Flex vertical gap={20}>
                  <h2 className='font-bold text-[16px]'>Thumbnail</h2>
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
                      <label
                        htmlFor='image-upload'
                        className='flex flex-col items-center justify-center w-[120px] h-[100px] border rounded-md cursor-pointer bg-white hover:bg-gray-100'
                      >
                        {/* Hiển thị ảnh hiện tại từ DB nếu chưa chọn ảnh mới */}
                        {!imageUrl && displayPic && (
                          <div className='h-[100px] w-[120px] rounded-lg overflow-hidden relative'>
                            <img
                              src={displayPic}
                              alt='Current image'
                              className='object-cover h-full w-full object-center rounded-lg border border-gray-300 bg-white'
                            />
                          </div>
                        )}
                        {/* Nếu đã chọn ảnh mới thì hiển thị preview ảnh mới */}
                        {imageUrl ? (
                          <div className='h-[100px] w-[120px] rounded-lg overflow-hidden relative'>
                            <img
                              src={URL.createObjectURL(imageUrl as Blob)}
                              alt='Preview'
                              className='object-cover h-full w-full object-center rounded-lg border border-gray-300 bg-white'
                            />
                            <Button
                              type='text'
                              danger
                              size='small'
                              style={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
                              onClick={() => setImageUrl(undefined)}
                            >
                              Delete
                            </Button>
                          </div>
                        ) : (
                          <input
                            id='image-upload'
                            type='file'
                            accept='image/*'
                            name='imageFile'
                            className='hidden'
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              if (!e.target.files || e.target.files.length === 0) return
                              const file = e.target.files[0]
                              if (file.size > 2 * 1024 * 1024) {
                                popupError('Image must be smaller than 2MB')
                                return
                              }
                              setImageUrl(file)
                            }}
                          />
                        )}
                      </label>
                    </Flex>
                  </div>
                </Flex>
              </Form.Item>
            </Card>
            <Flex className='fixed z-[10000000] top-[15px] right-10' gap={20}>
              <Button
                loading={courseStore.isLoading}
                disabled={courseStore.isLoading}
                htmlType='submit'
                type='primary'
                className=' '
              >
                Update
              </Button>
            </Flex>
          </Form>
        </Drawer>
      )}
    </>
  )
}

export default EditProduct
