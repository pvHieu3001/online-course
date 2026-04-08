import type { TableProps } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ErrorLoad from '../../components/util/ErrorLoad'
import { amazonActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { IAmazon, IThreadAccount } from '@/common/types.interface'
import { RootState } from '@/app/store'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function ListAmazon() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState('')
  const amazons = useSelector((state: RootState) => state.amazon)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [isCaptionLink, setIsCaptionLink] = useState('false')
  const [isCapLink, setIsCapLink] = useState('')

  useEffect(() => {
    dispatch(amazonActions.getAdminAmazons(searchValue, status, isCapLink, 0, 10) as unknown as AnyAction)
    dispatch(amazonActions.getThreadAccount() as unknown as AnyAction)
  }, [dispatch, searchValue, status, isCapLink])

  useEffect(() => {
    if (amazons?.dataThreadAccount && amazons?.dataThreadAccount.length > 0) {
      const optionData = amazons.dataThreadAccount.map((item: IThreadAccount) => ({
        label: item.accountName,
        value: item.threadId
      }))
      setAccounts(optionData)
    }
  }, [amazons])

  const handlerDistableAmazon = async (id: string) => {
    try {
      dispatch(amazonActions.deleteAmazon(id) as unknown as AnyAction)
      dispatch(amazonActions.getAdminAmazons('', '', '', 0, 10) as unknown as AnyAction)
      message.success('Vô hiệu hoá danh mục thành công!')
    } catch (error) {
      message.error('Vô hiệu hoá danh mục thất bại!')
    }
  }

  const handlePublish = async (id: string, selectedAccount: string, isCaptionLink: string) => {
    const formData = new FormData()

    formData.append('id', id)
    formData.append('threadId', selectedAccount)
    formData.append('isCaptionLink', isCaptionLink)
    try {
      dispatch(amazonActions.publishPost(formData) as unknown as AnyAction)
      dispatch(amazonActions.getAdminAmazons('', '', '', 0, 10) as unknown as AnyAction)
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
      width: 30,
      align: 'center',
      fixed: 'left',
      responsive: ['sm']
    },
    {
      title: 'Status',
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
            text = 'SUCCESS'
            break
          case 'FAILED':
            color = 'volcano'
            text = 'FAILED'
            break
          case 'PROCESSING':
            color = 'blue'
            text = 'PROCESSING'
            break
          default:
            color = 'default'
            text = 'default'
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Published At',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      width: 130,
      ellipsis: true,
      render: (text, record) => (
        <span
          className='line-clamp-2'
          style={{
            color: record.isCaptionLink ? '#ff4d4f' : 'inherit',
            fontWeight: record.isCaptionLink ? '500' : 'normal'
          }}
        >
          {text ? dayjs.utc(text).local().format('DD/MM/YY HH:mm') : '_'}
        </span>
      )
    },
    {
      title: 'Account',
      dataIndex: 'accountThread',
      key: 'accountThread',
      width: 100,
      ellipsis: true,
      render: (text, record) => (
        <span
          className='line-clamp-2'
          style={{
            color: record.isCaptionLink ? '#ff4d4f' : 'inherit',
            fontWeight: record.isCaptionLink ? '500' : 'normal'
          }}
        >
          {text ?? '_'}
        </span>
      )
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
      width: 200,
      ellipsis: true,
      render: (text, record) => {
        return (
          <span
            className='line-clamp-2'
            style={{
              color: record.isCaptionLink ? '#ff4d4f' : 'inherit',
              fontWeight: record.isCaptionLink ? '500' : 'normal'
            }}
          >
            {text ?? '_'}
          </span>
        )
      }
    },
    {
      title: 'Link clone',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      width: 100,
      render: (text) => (
        <a href={text} target='_blank' className='block w-40 truncate text-blue-600 hover:underline'>
          link
        </a>
      )
    },
    {
      title: 'Error',
      dataIndex: 'lastError',
      key: 'lastError',
      width: 100,
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
      title: 'Action',
      key: 'action',
      width: 90,
      align: 'center',
      fixed: 'right',
      render: (record) => (
        <Space size={0}>
          <Popconfirm
            placement='topRight'
            title={
              <div style={{ width: 220 }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Cấu hình đăng bài:</div>
                <div style={{ marginBottom: 4 }}>Tài khoản:</div>
                <Select
                  placeholder='Chọn tài khoản'
                  style={{ width: '100%', marginBottom: 12 }}
                  onChange={(val) => setSelectedAccount(val)}
                  options={accounts}
                />

                <div style={{ marginBottom: 4 }}>Nơi gắn link:</div>
                <Select
                  defaultValue='false'
                  style={{ width: '100%' }}
                  onChange={(val: string) => setIsCaptionLink(val)}
                  options={[
                    { label: 'Gắn ở Comment', value: 'false' },
                    { label: 'Gắn ở Caption', value: 'true' }
                  ]}
                />
              </div>
            }
            onConfirm={() => {
              if (!selectedAccount) {
                return message.warning('Vui lòng chọn tài khoản trước!')
              }
              handlePublish(record.id, selectedAccount, isCaptionLink)

              setSelectedAccount(null)
              setIsCaptionLink('false')
            }}
            onCancel={() => {
              setSelectedAccount(null)
              setIsCaptionLink('false')
            }}
            okText='Đăng ngay'
            cancelText='Hủy'
          >
            <Button type='text' size='small' icon={<SendOutlined style={{ color: '#52c41a', fontSize: '16px' }} />} />
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
          Danh sách bài viết
        </Typography.Title>
        <Link to='add' className='w-full sm:w-auto'>
          <Button type='primary' block>
            Thêm bài viết
          </Button>
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-4 flex flex-wrap items-center gap-3'>
          <Input
            className='w-full sm:w-[300px]'
            prefix={<SearchRoundedIcon className='text-gray-400' />}
            value={searchValue}
            allowClear
            onChange={handleChangeSearch}
            placeholder='Tìm kiếm bài viết...'
            style={{ borderRadius: '0.75rem' }}
          />

          <Select
            className='w-full sm:w-44'
            onChange={(value) => setStatus(value)}
            value={status}
            placeholder='Trạng thái'
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            <Select.Option value=''>Tất cả trạng thái</Select.Option>
            <Select.Option value='DEFAULT'>DEFAULT</Select.Option>
            <Select.Option value='SUCCESS'>SUCCESS</Select.Option>
            <Select.Option value='PROCESSING'>PROCESSING</Select.Option>
            <Select.Option value='FAILED'>FAILED</Select.Option>
          </Select>

          <Select
            className='w-full sm:w-44'
            onChange={(value) => setIsCapLink(value)}
            value={isCapLink}
            placeholder='Loại bài đăng'
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            <Select.Option value=''>Tất loại bài</Select.Option>
            <Select.Option value='1'>CapLink</Select.Option>
            <Select.Option value='0'>CommentLink</Select.Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={amazons?.dataList?.map((item: IAmazon, index: number) => ({
            ...item,
            key: item.id || index
          }))}
          loading={amazons.isLoading}
          scroll={{ x: 800 }}
          pagination={{
            size: 'small',
            showSizeChanger: false,
            current: (amazons.pagination?.pageNumber || 0) + 1,
            pageSize: amazons.pagination?.pageSize || 10,
            total: amazons.pagination?.totalElements || 0,
            onChange: (page, pageSize) => {
              dispatch(
                amazonActions.getAdminAmazons(searchValue, status, '', page - 1, pageSize) as unknown as AnyAction
              )
            }
          }}
          className='responsive-table'
        />
      </div>
    </div>
  )
}
