import type { TableProps } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table, Tag, Tooltip, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ErrorLoad from '../../components/util/ErrorLoad'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { IAmazon } from '@/common/types.interface'
import { RootState } from '@/app/store'
import dayjs from 'dayjs'

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
      message.success('Vô hiệu hoá danh mục thành công!')
    } catch (error) {
      message.error('Vô hiệu hoá danh mục thất bại!')
    }
  }

  const handlePublish = async (id: string, amzUrl: string) => {
    const isShortened = /^(https?:\/\/)?(amzn\.to|bit\.ly|tinyurl\.com)\/.*$/.test(amzUrl)
    if (!isShortened) {
      message.warning('Vui lòng sử dụng link rút gọn (amzn.to) để tránh bị khóa bài!')
      return
    }
    try {
      dispatch(amazonActions.publishPost(id) as unknown as AnyAction)
      dispatch(amazonActions.getAdminAmazons('') as unknown as AnyAction)
      message.success('Đang đăng!')
    } catch (error) {
      message.error('Đăng bài thất bại!')
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      align: 'center',
      render: (status) => {
        let color
        let text

        switch (status) {
          case 'SUCCESS':
            color = 'green'
            text = 'Thành công'
            break
          case 'FAILED':
            color = 'volcano'
            text = 'Thất bại'
            break
          case 'PROCESSING':
            color = 'blue'
            text = 'Đang xử lý'
            break
          default:
            color = 'default'
            text = 'Chưa đăng'
        }
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
      title: 'Lỗi cuối',
      dataIndex: 'lastError',
      key: 'lastError',
      width: 250,
      render: (error) => {
        if (!error) return <span style={{ color: '#bfbfbf' }}>-</span>

        return (
          <Tooltip title={error}>
            <span
              style={{
                color: '#ff4d4f',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                maxWidth: '240px'
              }}
            >
              {error}
            </span>
          </Tooltip>
        )
      }
    },
    {
      title: 'Published Time',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      width: 150,
      ellipsis: true,
      render: (text) => <span className='line-clamp-2'>{text ? dayjs(text).format('DD/MM/YYYY HH:mm') : '_'}</span>
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (record) => (
        <Space size={0}>
          <Popconfirm
            placement='topRight'
            title='Xác nhận đăng?'
            onConfirm={() => handlePublish(record.id, record.amzUrl)}
            okText='Có'
            cancelText='Không'
          >
            <Button
              type='text'
              danger
              size='small'
              icon={<SendOutlined style={{ color: '#52c41a', fontSize: '16px' }} />}
            />
          </Popconfirm>
          <Link to={'' + record.id}>
            <Button type='text' size='small' icon={<EditOutlined style={{ color: '#1677ff', fontSize: '16px' }} />} />
          </Link>
          <Popconfirm
            placement='topRight'
            title='Xác nhận xóa?'
            onConfirm={() => handlerDistableAmazon(record.id)}
            okText='Có'
            cancelText='Không'
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
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4'>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Danh sách Amazon
        </Typography.Title>
        <Link to='add' className='w-full sm:w-auto'>
          <Button type='primary' block>
            Thêm danh mục
          </Button>
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-4'>
          <Input
            className='w-full sm:w-[300px]'
            prefix={<SearchRoundedIcon className='text-gray-400' />}
            value={searchValue}
            allowClear
            onChange={handleChangeSearch}
            placeholder='Tìm kiếm bài viết...'
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
