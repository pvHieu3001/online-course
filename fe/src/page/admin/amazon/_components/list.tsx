import type { TableProps } from 'antd'
import { Button, Flex, Input, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
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
  const Amazons = useSelector((state: RootState) => state.amazon)

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
      width: 40,
      align: 'center'
    },
    {
      title: 'Link bài viết clone',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      align: 'center',
      width: 140,
      render: (text) => <a className='block w-64 truncate text-blue-600 hover:underline'>{text}</a>
    },
    {
      title: 'Caption bài viết',
      dataIndex: 'caption',
      key: 'caption',
      align: 'center',
      width: 100,
      render: (text) => <>{text ?? 0}</>
    },
    {
      title: 'Link Amz affiliate',
      dataIndex: 'amzUrl',
      key: 'amzUrl',
      align: 'center',
      width: 100,
      render: (text) => <>{text ?? 0}</>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPublished',
      key: 'isPublished',
      align: 'center',
      width: 100,
      render: (status) => {
        const color = !status ? 'volcano' : 'green'
        const text = !status ? 'Chưa đăng' : 'Đã đăng'

        return <Tag color={color}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (record) => (
        <Space size={'middle'}>
          <Link to={'' + record.id}>
            <Button type='primary'>Sửa </Button>
          </Link>
          <Popconfirm
            placement='topRight'
            title={record.active == 1 ? 'Are you sure distable this Amazon?' : 'Are you sure enable this Amazon?'}
            onConfirm={() => handlerDistableAmazon(record.id)}
            onCancel={() => {}}
            okText='Đồng ý'
            cancelText='Hủy bỏ'
          >
            <Button type='primary' danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  if (Amazons.error_message) {
    return <ErrorLoad error_message={Amazons.error_message} />
  }

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Danh sách danh mục
        </Typography.Title>
      </div>
      <div className=''>
        <Flex wrap='wrap' gap='small' className='my-5' align='center' justify='space-between'>
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
            placeholder={'Tìm kiếm'}
            style={{
              borderRadius: '2rem'
            }}
          />
          <Link to='add'>
            <Button type='primary'>Thêm danh mục</Button>
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
          dataSource={Amazons?.dataList?.map((category: IAmazon, index: number) => ({
            ...category,
            key: index + 1
          }))}
          loading={Amazons.isLoading}
        />
      </div>
    </>
  )
}
