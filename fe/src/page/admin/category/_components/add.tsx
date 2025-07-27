
import { useNavigate } from 'react-router-dom';
import { CloudUploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Flex, Form, Input, Modal, Button, Switch, Select, Drawer, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popupError, popupSuccess } from '@/page/shared/Toast';
import { categoryActions } from '@/app/actions';
import { ICategory } from '@/common/types.interface';

export default function AddCategory() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // giả lập loading nếu chưa có biến
  const dispatch = useDispatch();
  const categoryStore = useSelector((state: any) => state.category);

  const dataCategories = Array.isArray(categoryStore.dataList)
    ? (categoryStore.dataList as ICategory[]).map((item) => ({
        label: item.name,
        value: item.id
      }))
    : [];

  const [imageUrl, setImageUrl] = useState<File>();
  const [DisplayPic, setDisplayPic] = useState<string>();

  // Lấy danh sách category cha khi mount
  useEffect(() => {
    dispatch(categoryActions.getCategories() as any);
  }, [dispatch]);

  // Xác nhận khi rời nếu có thay đổi
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleCancel = () => {
    if (isDirty) {
      Modal.confirm({
        title: 'Bạn có chắc muốn rời khỏi trang?',
        icon: <ExclamationCircleOutlined />,
        content: 'Các thay đổi chưa được lưu sẽ bị mất.',
        onOk: () => navigate('..')
      });
    } else {
      navigate('..');
    }
  }

  const handleSubmit = async (values: any) => {
    const name = form.getFieldValue('name');
    const active = form.getFieldValue('status');
    const parent_id = form.getFieldValue('parent_id');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', active);
    formData.append('parent_id', parent_id);
    if (imageUrl) {
      formData.append('image', imageUrl);
    }
    try {
      setIsLoading(true);
      await dispatch(categoryActions.createCategory(formData) as any);
      popupSuccess('Thêm danh mục thành công');
      setIsDirty(false);
      navigate('..');
    } catch (error) {
      popupError('Thêm danh mục thất bại');
    } finally {
      setIsLoading(false);
    }
  }

  const selectedImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const types = ['jpeg', 'png', 'jpg', 'gif', 'webp'];
    if (!e.target.files || e.target.files.length === 0) return;
    const fileSelected = e.target.files[0];
    const size = fileSelected.size;
    const type = types.includes(fileSelected.type.replace('image/', ''));
    if (size <= 1048576 && type) {
      setImageUrl(fileSelected);
      setDisplayPic(URL.createObjectURL(fileSelected));
      setIsDirty(true);
    } else {
      e.target.value = '';
    }
  };

  const onValuesChange = () => setIsDirty(true);

  return (
    <Drawer
      width={'70%'}
      title={<span className='font-bold text-xl'>Tạo danh mục mới</span>}
      onClose={handleCancel}
      open={true}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>Hủy</Button>
          <Button type='primary' htmlType='submit' form='category-form' loading={isLoading}>
            Lưu danh mục
          </Button>
        </div>
      }
    >
      <Spin spinning={isLoading} tip='Đang lưu...'>
        <Form
          id='category-form'
          form={form}
          name='category'
          layout='vertical'
          className='w-full p-6'
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
          initialValues={{
            parent_id: '',
            status: true
          }}
        >
          <Flex gap={32} wrap='wrap'>
            <Flex className='flex-[2] min-w-[300px]' vertical gap={16}>
              <Form.Item
                label={<span className='font-semibold'>Ảnh đại diện</span>}
                className='border-[1px] p-[24px] rounded-md border-[#F1F1F4] bg-[#fafbfc]'
                style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}
              >
                <div className='flex flex-col items-center'>
                  {DisplayPic ? (
                    <div className='relative group w-[180px] h-[180px] mb-2'>
                      <img
                        src={DisplayPic}
                        alt='Ảnh danh mục'
                        className='object-cover w-full h-full rounded-lg border shadow'
                      />
                      <Button
                        type='text'
                        danger
                        icon={<DeleteOutlined />}
                        className='absolute top-2 right-2 opacity-80 hover:opacity-100 bg-white/80'
                        onClick={() => { setDisplayPic(''); setImageUrl(undefined); setIsDirty(true); }}
                      >Xóa</Button>
                    </div>
                  ) : (
                    <label htmlFor='image-upload' className='flex flex-col items-center justify-center w-[180px] h-[180px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100'>
                      <CloudUploadOutlined style={{ fontSize: 40, color: '#aaa' }} />
                      <span className='text-xs text-gray-500 mt-2'>Chọn ảnh (JPG, PNG, GIF, SVG, tối đa 1MB)</span>
                      <input
                        id='image-upload'
                        type='file'
                        accept='image/*'
                        name='image'
                        className='hidden'
                        style={{ display: 'none' }}
                        onChange={selectedImg}
                      />
                    </label>
                  )}
                </div>
              </Form.Item>
              <div className='border rounded-md overflow-hidden flex-1 bg-[#fafbfc]' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }}>
                <div className='p-2'><h2 className='font-semibold'>Cài đặt</h2></div>
                <hr />
                <div className='flex justify-between items-center p-2'>
                  <span>Kích hoạt hiển thị</span>
                  <Form.Item className='m-0' label='' name='status' valuePropName='checked'>
                    <Switch />
                  </Form.Item>
                </div>
                <div className='text-xs text-gray-400 px-2 pb-2'>Bật để danh mục này hiển thị trên website.</div>
              </div>
            </Flex>
            <Flex vertical className='flex-[6] min-w-[300px]'>
              <div className='border-[1px] p-[24px] rounded-md bg-[#fafbfc]' style={{ boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)' }}>
                <h2 className='mb-5 font-bold text-[16px]'>Tổng quan</h2>
                <Flex vertical gap={20}>
                  <Flex gap={30} wrap='wrap'>
                    <Form.Item
                      name='name'
                      label='Tên danh mục'
                      className='w-full max-w-[350px]'
                      rules={[
                        { required: true, message: 'Vui lòng nhập tên danh mục!' },
                        { max: 120, message: 'Tên không vượt quá 120 ký tự' },
                        { whitespace: true, message: 'Tên danh mục không được để trống!' }
                      ]}
                    >
                      <Input size='large' placeholder='Nhập tên danh mục...' />
                    </Form.Item>
                    <Form.Item name='parent_id' label='Danh mục cha' className='w-full max-w-[250px]'>
                      <Select
                        showSearch
                        style={{ width: '100%', height: 40 }}
                        placeholder='Chọn danh mục cha (nếu có)'
                        optionFilterProp='label'
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={[{ value: '', label: 'Không có' }, ...dataCategories]}
                      />
                    </Form.Item>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </Form>
      </Spin>
    </Drawer>
  )
}
