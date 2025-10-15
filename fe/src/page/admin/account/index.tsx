import { Avatar, Button, Divider, Form, Input, message, Modal, Tag } from 'antd'
import {
  CalendarOutlined,
  EditOutlined,
  KeyOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useState } from 'react';

export default function AccountManagement() {
  const [user, setUser] = useState({
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    fullName: 'Admin User',
    role: 'Quản trị viên',
    email: 'admin@example.com',
    username: 'admin_user',
    lastLogin: '15/10/2025 16:30',
  });
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleLogout = () => {
    message.success('Đăng xuất thành công!');
  };

  const handleEditFinish = (values) => {
    console.log('Dữ liệu mới:', values);
    setUser(prevUser => ({ ...prevUser, ...values }));
    message.success('Cập nhật thông tin thành công!');
    setIsEditModalVisible(false);
  };

  const handleChangePasswordFinish = (values) => {
    console.log('Mật khẩu mới:', values);
    message.success('Đổi mật khẩu thành công!');
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Avatar size={96} src={user.avatarUrl} icon={<UserOutlined />} />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
              <Tag color="blue" className="mt-2">{user.role}</Tag>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center font-semibold"><UserOutlined className="mr-2 text-gray-500" />Tên đăng nhập</span>
              <span>{user.username}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center font-semibold"><MailOutlined className="mr-2 text-gray-500" />Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center font-semibold"><CalendarOutlined className="mr-2 text-gray-500" />Đăng nhập lần cuối</span>
              <span>{user.lastLogin}</span>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
            <Button icon={<EditOutlined />} size="large" className="flex-1" onClick={() => setIsEditModalVisible(true)}>
              Chỉnh sửa
            </Button>
            <Button icon={<KeyOutlined />} size="large" className="flex-1" onClick={() => setIsPasswordModalVisible(true)}>
              Đổi mật khẩu
            </Button>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout} size="large" className="flex-1">
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      {/* --- MODAL CHỈNH SỬA THÔNG TIN --- */}
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isEditModalVisible}
        onOk={() => editForm.submit()}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditFinish} initialValues={user}>
          <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* --- MODAL ĐỔI MẬT KHẨU --- */}
      <Modal
        title="Đổi mật khẩu"
        open={isPasswordModalVisible}
        onOk={() => passwordForm.submit()}
        onCancel={() => setIsPasswordModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={passwordForm} layout="vertical" onFinish={handleChangePasswordFinish}>
          <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }, { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!'}]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
