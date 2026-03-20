import type { TableProps } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ErrorLoad from '../../components/util/ErrorLoad'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { IAmazon } from '@/common/types.interface'
import { RootState } from '@/app/store'

export default function ListAmazon() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const amazons = useSelector((state: RootState) => state.amazon)

  useEffect(() => {
    dispatch(amazonActions.getAdminAmazons(searchValue) as unknown as AnyAction)
  }, [dispatch, searchValue])

  const handlerDistableAmazon = async (id: string) => {
    try {
      dispatch(amazonActions.deleteAmazon(id) as unknown as AnyAction)
      dispatch(amazonActions.getAdminAmazons('') as unknown as AnyAction)
      message.success('Amazon item disabled successfully!')
    } catch (error) {
      message.error('Failed to disable Amazon item!')
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const columns: TableProps<IAmazon>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 50,
      align: 'center',
      fixed: 'left',
      responsive: ['sm']
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
      width: 110,
      align: 'center',
      render: (status) => {
        const color = !status ? 'volcano' : 'green'
        const text = !status ? 'Unpublished' : 'Published'
        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
      width: 150,
      ellipsis: true,
      render: (text) => <span className='line-clamp-2'>{text ?? 'N/A'}</span>
    },
    {
      title: 'Link clone',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      width: 300,
      render: (text) => (
        <a href={text} target='_blank' className='block w-40 truncate text-blue-600 hover:underline'>
          {text}
        </a>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 50,
      align: 'center',
      fixed: 'right',
      render: (record) => (
        <Space size={0}>
          <Link to={'' + record.id}>
            <Button type='text' size='small' icon={<EditOutlined style={{ color: '#1677ff', fontSize: '16px' }} />} />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Confirm deletion?'
            onConfirm={() => handlerDistableAmazon(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='text' danger size='small' icon={<DeleteOutlined style={{ fontSize: '16px' }} />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  if (amazons.error_message) {
    return <ErrorLoad error_message={amazons.error_message} />
  }

  return (
    <div className='p-2 sm:p-4'>
      {/* Header section: Chuyển từ hàng ngang sang hàng dọc trên Mobile */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4'>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Amazon List
        </Typography.Title>
        <Link to='add' className='w-full sm:w-auto'>
          <Button type='primary' block>
            Add Amazon Item
          </Button>
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        {/* Thanh tìm kiếm: Co giãn theo màn hình */}
        <div className='p-4'>
          <Input
            className='w-full sm:w-[300px]'
            prefix={<SearchRoundedIcon className='text-gray-400' />}
            value={searchValue}
            allowClear
            onChange={handleChangeSearch}
            placeholder='Search articles...'
            style={{ borderRadius: '1rem' }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={amazons?.dataList?.map((item: IAmazon, index: number) => ({
            ...item,
            key: index + 1
          }))}
          loading={amazons.isLoading}
          scroll={{ x: 800 }}
          pagination={{
            size: 'small',
            showSizeChanger: false
          }}
          className='responsive-table'
        />
      </div>
    </div>
  )
}
