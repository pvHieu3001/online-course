import { Button, Flex, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd'
import type { TableProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { popupSuccess } from '@/page/shared/Toast'
import { userActions } from '@/app/actions'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { AnyAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { IUser } from '@/common/types.interface'
import { SwapOutlined } from '@ant-design/icons'

export default function ListUser() {
  const navigator = useNavigate()
  const [id, setId] = useState<number | string>()
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const userStore = useSelector((state: RootState) => state.user)
  const [dataTable, setDataTable] = useState<(IUser & { key: number })[]>([])

  useEffect(() => {
    dispatch(userActions.getUsers() as unknown as AnyAction)
  }, [dispatch])

  useEffect(() => {
    setDataTable(userStore.dataList?.map((item: IUser, index: number) => ({ ...item, key: index + 1 })))
  }, [userStore])

  const confirm = async (id: number | string) => {
    setId(id)
    await dispatch(userActions.deleteUser(String(id)) as unknown as AnyAction)
    dispatch(userActions.getUsers() as unknown as AnyAction)
    popupSuccess('Delete user success')
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!value.startsWith(' ')) {
      setSearchValue(value)
    }
  }

  const handleSwitchUser = async (username: string) => {
    await dispatch(userActions.switchUser(username) as unknown as AnyAction)
    navigator('/')
  }

  const columns: TableProps<IUser>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      minWidth: 150,
      render: (text) => <a className='font-medium'>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      responsive: ['md']
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 280,
      fixed: 'right',
      render: (data: IUser) => (
        <Space size='small' wrap>
          {' '}
          <Tooltip title='Nhập vai'>
            <Button size='small' icon={<SwapOutlined />} onClick={() => handleSwitchUser(data.username)}>
              Nhập vai
            </Button>
          </Tooltip>
          <Link to={String(data?.id)}>
            <Button size='small' type='primary'>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            disabled={userStore.isLoading}
            title='Xóa người dùng'
            description={`Bạn có chắc muốn xóa "${data.username}"?`}
            onConfirm={() => confirm(String(data.id))}
            okText='Đồng ý'
            cancelText='Hủy bỏ'
          >
            <Button size='small' danger loading={userStore.isLoading && data.id == id}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className='p-2 md:p-4'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-2'>
        <Typography.Title level={2} style={{ margin: 0, fontSize: 'clamp(1.2rem, 5vw, 1.8rem)' }}>
          Danh sách người dùng
        </Typography.Title>

        <Link to='add' className='w-full sm:w-auto'>
          <Button type='primary' className='w-full'>
            Thêm người dùng
          </Button>
        </Link>
      </div>

      <Flex wrap='wrap' gap='small' className='my-5' align='center'>
        <Input
          className='header-search w-full sm:w-[300px]'
          prefix={
            <div className='px-2'>
              <SearchRoundedIcon />
            </div>
          }
          value={searchValue}
          spellCheck={false}
          allowClear
          onChange={handleChangeSearch}
          size='middle' // Tăng size cho dễ chạm trên mobile
          placeholder={'Tìm kiếm'}
          style={{ borderRadius: '2rem' }}
        />
      </Flex>

      <div className='overflow-hidden bg-white rounded-[10px] shadow-[rgba(0,0,0,0.05)_0rem_1.25rem_1.6875rem_0rem]'>
        <Table
          columns={columns}
          dataSource={dataTable}
          loading={userStore.isLoading}
          sticky={{ offsetHeader: 0 }}
          scroll={{ x: 800 }}
          pagination={{
            size: 'small',
            responsive: true,
            showSizeChanger: true
          }}
        />
      </div>
    </div>
  )
}
