
import {   Popconfirm,  Table, Tag, Typography } from 'antd';
import type {    TableProps } from 'antd';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import HandleLoading from '../../components/util/HandleLoading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { popupSuccess } from '@/page/shared/Toast'
import { userActions } from '@/app/actions';

type User = {
  id: number | string;
  username: string;
  email: string;
  image?: string;
  role_id: string;
  is_active: number;
};

export default function ListUser(){
  const [id, setId] = useState<number | string>();
  const dispatch = useDispatch();
  const userStore = useSelector((state: any) => state.user);
  const { dataList, isLoading, error_message } = userStore;
  const isError = !!error_message;
  const isDeleting = isLoading; // hoặc tạo biến riêng nếu cần

  useEffect(() => {
    dispatch(userActions.getUsers() as any);
  }, [dispatch]);

  const confirm = async (id: number | string) => {
    setId(id);
    await dispatch(userActions.deleteUser(String(id)) as any);
    popupSuccess('Delete user success');
  };

  const dataItem = Array.isArray(dataList) && dataList.every(i => typeof i === 'object' && i !== null)
    ? (dataList as User[]).map((item, key) => ({ ...item, key }))
    : [];
    
    const columns: TableProps<User>['columns'] = [
        {
          title: 'Tên người dùng',
          dataIndex: 'username',
          key: 'username',
          showSorterTooltip: { target: 'full-header' },
          render: (text) => <a>{text}</a>,
          onFilter: (value : any, record : any) => record.username.indexOf(value as string) === 0,
          sorter: (a : any, b : any) => a.username.length - b.username.length,
          sortDirections: ['descend']
        },
        {
          title: 'Ảnh',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (image) => <img src={image} alt="" width={110} />
        },
        {
          title: 'Vai trò',
          key: 'role_id',
          dataIndex: 'role_id',
          render: (_, { role_id  }) => (
            <>
                  <Tag color={role_id == '1' ? 'geekblue' : 'green'} >
                      {role_id == '1' ? 'Admin' : 'Guest'}
                  </Tag>
            </>
          ),
          filters: [
            {
              text: 'Admin',
              value: '1',
            },
            {
              text: 'Guest',
              value: '2',
            },
          ],
          onFilter: (value, record) => record.role_id.startsWith(value as string),
          filterSearch: true,
        },
        {
          title: 'Trạng thái',
          key: 'is_active',
          dataIndex: 'is_active',
          render: (_, { is_active }) => (
            <>
                  <Tag color={is_active == 1 ? 'green' : 'red'} >
                      {is_active == 1 ? 'Đang hoạt động' : 'Không hoạt động'}
                  </Tag>
            </>
          )
        
        },
        {
          title: 'Hành động ',
          key: 'action',
          render: (data: User) => (
            <Flex wrap="wrap" gap="small">
               <Link to={"privilege/" + String(data?.id)}>   <Button danger  >
                  Privilege
                </Button> </Link>
               <Link to={String(data?.id)}>   <Button type="primary"  >
                  Edit
                </Button> </Link>
                <Popconfirm
                    disabled={isDeleting}
                    title="Delete the user"
                    description={`Are you sure to delete "${data.username}" ?`}
                    onConfirm={() => confirm(String(data.id))}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger loading={isDeleting && data.id == id} >Delete</Button>
                  </Popconfirm>
          </Flex>
          ),
        },
    ];


    return <>
      <HandleLoading isLoading={isLoading} isError={isError}>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          Danh sách người dùng
        </Typography.Title>
        <Table columns={columns} dataSource={dataItem} />
        <Flex wrap="wrap" gap="small">
          <Link to="add">
            <Button type="primary" danger>
              Thêm người dùng
            </Button>
          </Link>
        </Flex>
      </HandleLoading>
    </>
}