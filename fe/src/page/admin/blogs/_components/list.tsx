import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Select, Space, Table, Tag, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ErrorLoad from '../../components/util/ErrorLoad'
import { blogActions } from '@/app/actions'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { IBlog } from '@/common/types.interface'
import { RootState } from '@/app/store'
import { typeOptions } from '@/common/constants'
import { EyeOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'

export default function ListBlog() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [active, setActive] = useState('')
  const [isHot, setIsHot] = useState('')
  const blogs = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    dispatch(blogActions.getAdminBlogs(active, searchValue, isHot) as unknown as AnyAction)
  }, [active, dispatch, isHot, searchValue])

  const handlerDistableBlog = async (id: string) => {
    try {
      await dispatch(blogActions.deleteBlog(id) as unknown as AnyAction)
      dispatch(blogActions.getAdminBlogs(active, searchValue, isHot) as unknown as AnyAction)
      message.success('Blog disabled successfully!')
    } catch (error) {
      message.error('Failed to disable blog!')
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const columns: TableProps<IBlog>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Blog Name',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 140,
      render: (text) => <a title={text}>{text.length > 30 ? `${text.slice(0, 30)}...` : text}</a>
    },
    {
      title: 'Blog Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 120,
      render: (text) => {
        const matched = typeOptions.find((opt) => opt.value === text)
        return <>{matched ? matched.label : 'None'}</>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status) => {
        const color = !status ? 'volcano' : 'green'
        const text = !status ? 'Inactive' : 'Active'

        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={`/bai-viet/${record.slug}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          <Link to={'' + record.id + `?status=${active}&isHot=${isHot}&search=${searchValue}`}>
            <Button type='primary'>Edit </Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title={record.active == 1 ? 'Are you sure you want to disable this blog?' : 'Are you sure you want to enable this blog?'}
            onConfirm={() => handlerDistableBlog(record.id)}
            onCancel={() => {}}
            okText='Yes'
            cancelText='Cancel'
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  if (blogs.error_message) {
    return <ErrorLoad error_message={blogs.error_message} />
  }

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Blog List
        </Typography.Title>
      </div>
      <div className=''>
        <Flex wrap='wrap' gap='small' className='my-5' align='center' justify='space-between'>
          <div className='flex items-center'>
            <Input
              className='header-search w-[250px]'
              prefix={
                <div className=' px-2'>
                  <SearchRoundedIcon />
                </div>
              }
              value={searchValue}
              spellCheck={false}
              allowClear
              onChange={handleChangeSearch}
              size='small'
              placeholder={'Search'}
              style={{
                borderRadius: '2rem'
              }}
            />
            <Select className='ml-2 w-40' onChange={(value) => setActive(value)} value={active} size='large'>
              <Select.Option value=''>Status</Select.Option>
              <Select.Option value='active'>Active</Select.Option>
              <Select.Option value='inactive'>Inactive</Select.Option>
            </Select>
            <Button
              size='large'
              type='default'
              className={`ml-2 ${
                isHot == '1'
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500' // khi bật (true)
                  : 'text-gray-700 hover:bg-gray-300' // khi tắt (false)
              }`}
              onClick={() => {
                setIsHot(isHot == '' || isHot == '0' ? '1' : '0')
              }}
            >
              <StarOutlined /> Newest Blogs
            </Button>
            <Button
              size='large'
              type='default'
              className='ml-2'
              onClick={() => {
                setSearchValue('')
                setActive('')
                setIsHot('')
              }}
            >
              <UnorderedListOutlined /> All
            </Button>
          </div>
          <Link to='add'>
            <Button type='primary'>Add blog</Button>
          </Link>
        </Flex>
        <Table
          style={{
            border: '2px',
            borderRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
            height: '100%'
          }}
          columns={columns}
          sticky={{ offsetHeader: 0 }}
          scroll={{ x: 1200 }}
          dataSource={blogs?.dataList?.map((Blog: IBlog, index: number) => ({
            ...Blog,
            key: index + 1
          }))}
          loading={blogs.isLoading}
        />
      </div>
    </>
  )
}
