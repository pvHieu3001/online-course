import React from 'react';
import { DoubleRightOutlined  } from '@ant-design/icons';
import styles from './styles.module.css'
import { Menu } from 'antd';
const items = [
  {
    key: 'sub0',
    label: 'Danh mục sản phẩm',
  },
  {
    key: 'sub1',
    icon: <DoubleRightOutlined/>,
    label: 'Combo Giá Rẻ',
  },
  {
    key: 'sub2',
    icon: <DoubleRightOutlined/>,
    label: 'Khóa Học Lập Trình',
  },
  {
    key: 'sub3',
    icon: <DoubleRightOutlined/>,
    label: 'Thiết Kế Đồ Họa',
  },
   {
    key: 'sub4',
    icon: <DoubleRightOutlined/>,
    label: 'Ngoại Ngữ',
  },
  {
    key: 'sub5',
    icon: <DoubleRightOutlined/>,
    label: 'Kỹ Năng Mềm',
  },
  {
    key: 'sub6',
    label: 'Tiktok – Facebook - Youtube',
    icon: <DoubleRightOutlined />,
    
  },
   {
    key: 'sub7',
    icon: <DoubleRightOutlined/>,
    label: 'Đầu Tư - Kinh Doanh',
  },
  {
    key: 'sub8',
    icon: <DoubleRightOutlined/>,
    label: 'Âm nhạc',
  },
   {
    key: 'sub9',
    label: 'Kiếm từ',
    icon: <DoubleRightOutlined />,
    
  },
   {
    key: 'sub10',
    icon: <DoubleRightOutlined/>,
    label: 'Khoá học khác',
  },


];
const onClick = () => {
  console.log('click menu');
};
const TabDetail = () => <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />;
export default TabDetail;