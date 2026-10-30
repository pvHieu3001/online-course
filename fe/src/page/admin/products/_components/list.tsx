import { useEffect, useState } from 'react'
import { Button, Flex, Input, Popconfirm, Select, Space, Table, TableProps, Tag, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { AnyAction } from '@reduxjs/toolkit'
import { bookActions } from '@/app/actions/book.actions'
import { useDispatch, useSelector } from 'react-redux'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { RootState } from '@/app/store'
import { IBook } from '@/common/types.interface'
import { EyeOutlined, UnorderedListOutlined, StarOutlined } from '@ant-design/icons'

export default function ListProduct() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [active, setActive] = useState('')
  const [isHot, setIsHot] = useState('') // blank: all, 0: false, 1: true
  const [dataTable, setDataTable] = useState<(IBook & { key: number })[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(10)

  const books = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(
      bookActions.getAdminBooks(active, searchValue, isHot, currentPage - 1, booksPerPage) as unknown as AnyAction
    )
  }, [searchValue, active, isHot, dispatch, currentPage, booksPerPage])

  useEffect(() => {
    setDataTable(
      books.dataList?.map((item: IBook, index: number) => ({ ...item, key: index + (currentPage - 1) * 10 + 1 }))
    )
  }, [books, currentPage])

  useEffect(() => {
    console.log(dataTable)
  }, [dataTable])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handlerDeleteProduct = async (id: string) => {
    try {
      await dispatch(bookActions.deleteBook(id) as unknown as AnyAction)
      await dispatch(
        bookActions.getAdminBooks(
          active,
          searchValue,
          isHot,
          currentPage - 1,
          booksPerPage
        ) as unknown as AnyAction
      )
      message.success('Book deleted successfully!')
    } catch (error) {
      message.error('Failed to delete book!')
    }
  }

  const columns: TableProps<IBook>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center'
    },
    {
      title: 'Book Title',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 180,
      render: (text: string) => (
        <span className='block max-w-[160px] truncate text-ellipsis overflow-hidden whitespace-nowrap' title={text}>
          {text}
        </span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      width: 180,
      render: (_text: string, record: IBook) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            record.category?.name ? 'text-gray-800' : 'text-purple-800'
          }`}
        >
          {record.category?.name || '_'}
        </span>
      )
    },
    {
      title: 'Difficulty',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      width: 250,
      render: (level: string) => {
        let color = ''
        let label = level
        switch (level?.toLowerCase()) {
          case 'beginner':
            color = 'green'
            label = 'Beginner'
            break
          case 'intermediate':
            color = 'orange'
            label = 'Intermediate'
            break
          case 'advanced':
            color = 'red'
            label = 'Advanced'
            break
          default:
            color = 'blue'
        }
        return <Tag color={color}>{label}</Tag>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 250,
      render: (status: string) => {
        const statusClass =
          status == 'active'
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-gray-100 text-gray-700 border border-gray-300'

        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {status == 'active' ? 'Active' : 'Inactive'}
          </span>
        )
      }
    },
    {
      title: 'Actions',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (record: IBook) => (
        <Space size={'middle'}>
          <Link to={`/book-detail/${record.slug}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          <Link to={'' + record.id + `?status=${active}&isHot=${isHot}&search=${searchValue}&page=${currentPage - 1}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title={'Are you sure you want to delete this book?'}
            onConfirm={() => handlerDeleteProduct(record.id)}
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

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
  }

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Book Management
        </Typography.Title>
      </div>
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
            placeholder='Search...'
            style={{ borderRadius: '2rem' }}
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
                ? 'bg-yellow-400 text-white hover:bg-yellow-500' // active
                : 'text-gray-700 hover:bg-gray-300' // inactive
            }`}
            onClick={() => {
              setIsHot(isHot == '' || isHot == '0' ? '1' : '0')
            }}
          >
            <StarOutlined /> Featured
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

        <Link to={`add?status=${active}&isHot=${isHot}&search=${searchValue}&page=${currentPage - 1}`}>
          <Button type='primary'>Add Book</Button>
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
        dataSource={dataTable}
        loading={books.isLoading}
        pagination={{
          current: currentPage,
          pageSize: booksPerPage,
          total: books.totalElements || 0,
          showSizeChanger: false
        }}
        onChange={handleTableChange}
      />
    </>
  )
}
