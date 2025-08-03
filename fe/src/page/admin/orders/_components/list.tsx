import { useEffect, useState } from 'react'
import { Button, Flex, Input, Popconfirm, Space, Table, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { OrderActions } from '@/app/actions/orders.action'

export default function ListOrders() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const orders = useSelector((state) => state.order)

  console.log('orders', orders
  )

  useEffect(() => {
    dispatch(OrderActions.getOrder() as unknown as AnyAction)
  }, [dispatch])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handlerDeleteProduct = async (id: string) => {
    try {
      message.success('Xoá sản phẩm thành công!')
    } catch (error: any) {
      message.error(error.data ? error.data.message : 'Xoá sản phẩm thất bại!')
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 40,
      align: 'center',
    },
    {
      title: 'Tổng số lượng',
      dataIndex: 'subTotal',
      key: 'subTotal',
      align: 'center',
      width: 180,
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Mã giảm giá ',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      align: 'center',
      width: 250,
      render: (text: string) => <span>{text}</span>,
    },
     {
      title: 'Tổng số lượng',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      width: 250,
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'ID phiếu giảm giá',
      dataIndex: 'couponId',
      key: 'couponId',
      align: 'center',
      width: 250,
      render: (text: string) => <span>{text}</span>,
    },
    // {
    //   title: 'Hành động',
    //   key: 'action',
    //   width: 150,
    //   align: 'center',
    //   render: (record: any) => (
    //     <Space size={'middle'}>
    //       <Link to={'' + record.id}>
    //         <Button type='primary'>Sửa</Button>
    //       </Link>
    //       <Popconfirm
    //         placement='topRight'
    //         title={'Bạn có chắc muốn xoá sản phẩm này?'}
    //         onConfirm={() => handlerDeleteProduct(record.id)}
    //         onCancel={() => {}}
    //         okText='Đồng ý'
    //         cancelText='Huỷ bỏ'
    //       >
    //         <Button type='primary' danger>
    //           Xoá
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ]

  return (
    <>
      <div className='flex items-center justify-between my-2'>
        <Typography.Title editable level={2} style={{ margin: 0 }}>
          Danh sách sản phẩm
        </Typography.Title>
      </div>
      <Flex wrap='wrap' gap='small' className='my-5' align='center' justify='space-between'>
        <Input
          className='header-search w-[250px]'
          value={searchValue}
          spellCheck={false}
          allowClear
          onChange={handleChangeSearch}
          size='small'
          placeholder={'Tìm kiếm'}
          style={{ borderRadius: '2rem' }}
        />
        {/* <Link to='add'>
          <Button type='primary'>Thêm sản phẩm</Button>
        </Link> */}
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
        dataSource={orders?.dataList?.map((item: any, index: number) => ({ ...item, key: index + 1 }))}
        loading={orders.isLoading}
      />
    </>
  )
}
