import type { TableProps } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button, Grid, Input, Modal, Popconfirm, Select, Space, Table, Tooltip, Typography, message, Image } from 'antd'
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
import Paragraph from 'antd/es/typography/Paragraph'
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons'

dayjs.extend(utc)

export default function ListAmazon() {
  const dispatch = useDispatch()
  const screens = Grid.useBreakpoint()
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState('')
  const amazons = useSelector((state: RootState) => state.amazon)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accounts, setAccounts] = useState<IThreadAccount[]>([])
  const [isCaptionLink, setIsCaptionLink] = useState('false')
  const [isCapLink, setIsCapLink] = useState('')
  const [hasLink, setHasLink] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const currentAccount = accounts.find((acc) => acc.threadId === selectedAccount)
  const isHighlight = currentAccount?.isCaptionLink === true
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')

  useEffect(() => {
    dispatch(amazonActions.getAdminAmazons(searchValue, status, isCapLink, hasLink, page, size) as unknown as AnyAction)
    dispatch(amazonActions.getThreadAccount() as unknown as AnyAction)
  }, [dispatch, searchValue, status, isCapLink, page, size, hasLink])

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
      dispatch(
        amazonActions.getAdminAmazons(searchValue, status, isCapLink, hasLink, page, size) as unknown as AnyAction
      )
      message.success('Post disabled successfully!')
    } catch (error) {
      message.error('Failed to disable post!')
    }
  }

  const handlePublish = async (id: string, selectedAccount: string, isCaptionLink: string) => {
    const formData = new FormData()

    formData.append('id', id)
    formData.append('threadId', selectedAccount)
    formData.append('isCaptionLink', isCaptionLink)
    try {
      dispatch(amazonActions.publishPost(formData) as unknown as AnyAction)
      dispatch(
        amazonActions.getAdminAmazons(searchValue, status, isCapLink, hasLink, page, size) as unknown as AnyAction
      )
      message.success('Publishing post...')
    } catch (error) {
      message.error('Failed to publish post!')
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handleReload = async () => {
    await dispatch(
      amazonActions.getAdminAmazons(searchValue, status, isCapLink, hasLink, page, size) as unknown as AnyAction
    )
  }

  const downloadMedia = async (url, filename) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      window.open(url, '_blank')
    }
  }

  const columns: TableProps<IAmazon>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center',
      fixed: 'left',
      responsive: ['sm']
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      width: 50,
      ellipsis: true,
      render: (text, record) => {
        const getStyle = () => {
          if (record.hasLink === false) {
            return { color: '#52c41a', fontWeight: '500' }
          }
          if (record.isCaptionLink) {
            return { color: '#ff4d4f', fontWeight: '500' }
          }
          return { color: 'inherit', fontWeight: 'normal' }
        }
        const style = getStyle()
        return (
          <span className='line-clamp-2' style={style}>
            {text ?? '_'}
          </span>
        )
      }
    },
    {
      title: 'Media',
      key: 'mediaDownload',
      width: 140,
      align: 'center',
      responsive: ['sm'],
      render: (_, record) => {
        const medias = record.medias || []
        const imageMedias = medias.filter(
          (m) => m.mediaType?.toLowerCase() === 'image' || /\.(jpg|jpeg|png|webp|gif)$/i.test(m.cloudinaryUrl)
        )
        const videoMedias = medias.filter(
          (m) => m.mediaType?.toLowerCase() === 'video' || /\.(mp4|mov|avi|mkv)$/i.test(m.cloudinaryUrl)
        )

        const handleViewImages = () => {
          if (imageMedias.length === 0) return
          setPreviewImages(imageMedias.map((img) => img.cloudinaryUrl))
          setPreviewOpen(true)
        }

        const handleViewVideos = () => {
          if (videoMedias.length === 0) return
          setCurrentVideoUrl(videoMedias[0].cloudinaryUrl)
          setVideoModalOpen(true)
        }

        const handleDownloadImages = () => {
          if (imageMedias.length === 0) {
            message.warning('No images to download!')
            return
          }
          imageMedias.forEach((img, idx) => {
            downloadMedia(img.cloudinaryUrl, `image_${record.id || ''}_${idx + 1}`)
          })
        }

        const handleDownloadVideos = () => {
          if (videoMedias.length === 0) {
            message.warning('No videos to download!')
            return
          }
          videoMedias.forEach((vid, idx) => {
            downloadMedia(vid.cloudinaryUrl, `video_${record.id || ''}_${idx + 1}`)
          })
        }

        return (
          <Space direction='vertical' size='small'>
            {/* IMAGES GROUP */}
            <Space.Compact size='small'>
              <Tooltip title={imageMedias.length > 0 ? `View ${imageMedias.length} images` : 'No images'}>
                <Button
                  type='default'
                  icon={<PictureOutlined />}
                  disabled={imageMedias.length === 0}
                  onClick={handleViewImages}
                >
                  Photos
                </Button>
              </Tooltip>
              <Tooltip title={imageMedias.length > 0 ? 'Download images' : ''}>
                <Button
                  type='primary'
                  icon={<DownloadOutlined />}
                  disabled={imageMedias.length === 0}
                  onClick={handleDownloadImages}
                />
              </Tooltip>
            </Space.Compact>

            {/* VIDEOS GROUP */}
            <Space.Compact size='small'>
              <Tooltip title={videoMedias.length > 0 ? `View ${videoMedias.length} videos` : 'No videos'}>
                <Button
                  type='default'
                  danger={videoMedias.length > 0}
                  icon={<VideoCameraOutlined />}
                  disabled={videoMedias.length === 0}
                  onClick={handleViewVideos}
                >
                  Video
                </Button>
              </Tooltip>
              <Tooltip title={videoMedias.length > 0 ? 'Download video' : ''}>
                <Button
                  type='primary'
                  danger={videoMedias.length > 0}
                  icon={<DownloadOutlined />}
                  disabled={videoMedias.length === 0}
                  onClick={handleDownloadVideos}
                />
              </Tooltip>
            </Space.Compact>
          </Space>
        )
      }
    },
    {
      title: 'Short Link',
      dataIndex: 'amzUrl',
      key: 'amzUrl',
      width: 60,
      ellipsis: true,
      responsive: ['md'],
      render: (text, record) => {
        if (!text) return null

        return (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <a
              href={text}
              target='_blank'
              rel='noopener noreferrer'
              className='line-clamp-2'
              style={{
                color: record.isCaptionLink ? '#ff4d4f' : '#1677ff',
                fontWeight: record.isCaptionLink ? '500' : 'normal',
                wordBreak: 'break-all'
              }}
            >
              LINK
            </a>
            <Paragraph copyable={{ text }} style={{ margin: 0, flexShrink: 0 }} />
          </div>
        )
      }
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
      width: 300,
      responsive: ['md'],
      render: (text, record) => {
        const getStyle = () => {
          if (record.hasLink === false) {
            return { color: '#52c41a', fontWeight: '500' }
          }
          if (record.isCaptionLink) {
            return { color: '#ff4d4f', fontWeight: '500' }
          }
          return { color: 'inherit', fontWeight: 'normal' }
        }

        if (!text) return '_'

        return (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span className='line-clamp-2' style={{ ...getStyle(), flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
              {text}
            </span>
            <Paragraph copyable={{ text }} style={{ margin: 0, flexShrink: 0 }} />
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 110,
      align: 'center',
      render: (record) => (
        <Space size={0}>
          <Popconfirm
            placement='topRight'
            title={
              <div style={{ width: 220 }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Publish Settings:</div>
                <div style={{ marginBottom: 4 }}>Account:</div>
                <Select
                  placeholder='Select account'
                  style={{
                    width: '100%',
                    marginBottom: 12,
                    border: isHighlight ? '1px solid #ff4d4f' : '',
                    borderRadius: isHighlight ? '6px' : ''
                  }}
                  className={isHighlight ? 'highlight-select' : ''}
                  onChange={(val) => setSelectedAccount(val)}
                  options={accounts}
                  value={selectedAccount}
                />

                <div style={{ marginBottom: 4 }}>Link placement:</div>
                <Select
                  value={record.isCaptionLink ? 'true' : 'false'}
                  style={{ width: '100%' }}
                  onChange={(val: string) => setIsCaptionLink(val)}
                  options={[
                    { label: 'In Comments', value: 'false' },
                    { label: 'In Caption', value: 'true' }
                  ]}
                />
              </div>
            }
            onConfirm={() => {
              if (!selectedAccount) {
                return message.warning('Please select an account first!')
              }
              handlePublish(record.id, selectedAccount, isCaptionLink)
              setIsCaptionLink('false')
            }}
            onOpenChange={(visible) => {
              if (visible) {
                setIsCaptionLink(record.isCaptionLink ? 'true' : 'false')
              }
            }}
            onCancel={() => {
              setIsCaptionLink('false')
            }}
            okText='Publish Now'
            cancelText='Cancel'
          >
            <Button type='text' size='small' icon={<SendOutlined style={{ color: '#52c41a', fontSize: '16px' }} />} />
          </Popconfirm>
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
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4'>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Thread Post List
        </Typography.Title>
        <Link to='add' className='w-full sm:w-auto'>
          <Button type='primary' block>
            Add Post
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
            placeholder='Search posts...'
            style={{ borderRadius: '0.75rem' }}
          />

          <Select
            className='w-full sm:w-44'
            onChange={(value) => setStatus(value)}
            value={status}
            placeholder='Status'
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            <Select.Option value=''>All Statuses</Select.Option>
            <Select.Option value='DEFAULT'>DEFAULT</Select.Option>
            <Select.Option value='SUCCESS'>SUCCESS</Select.Option>
            <Select.Option value='PROCESSING'>PROCESSING</Select.Option>
            <Select.Option value='FAILED'>FAILED</Select.Option>
          </Select>

          <Select
            className='w-full sm:w-44'
            onChange={(value) => setIsCapLink(value)}
            value={isCapLink}
            placeholder='Post Type'
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            <Select.Option value=''>All</Select.Option>
            <Select.Option value='1'>CapLink</Select.Option>
            <Select.Option value='0'>CommentLink</Select.Option>
          </Select>
          <Select
            className='w-full sm:w-44'
            onChange={(value) => setHasLink(value)}
            value={hasLink}
            placeholder='Link Filter'
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            <Select.Option value=''>All</Select.Option>
            <Select.Option value='1'>HasLink</Select.Option>
            <Select.Option value='0'>NoLink</Select.Option>
          </Select>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            onClick={handleReload}
            size='large'
            style={{ borderRadius: '0.75rem' }}
          >
            Reload
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={amazons?.dataList?.map((item: IAmazon, index: number) => ({
            ...item,
            key: item.id || index
          }))}
          loading={amazons.isLoading}
          scroll={{ x: screens.xl ? 1200 : screens.md ? 1000 : screens.sm ? 560 : 420 }}
          pagination={{
            size: 'small',
            showSizeChanger: false,
            current: (amazons.pagination?.pageNumber || 0) + 1,
            pageSize: amazons.pagination?.pageSize || 10,
            total: amazons.pagination?.totalElements || 0,
            onChange: (page, pageSize) => {
              setPage(page - 1)
              setSize(pageSize)
            }
          }}
          className='responsive-table'
        />

        <div style={{ display: 'none' }}>
          <Image.PreviewGroup
            preview={{
              visible: previewOpen,
              onVisibleChange: (value) => setPreviewOpen(value)
            }}
          >
            {previewImages.map((url, index) => (
              <Image key={index} src={url} />
            ))}
          </Image.PreviewGroup>
        </div>

        <Modal
          title='Xem Video'
          open={videoModalOpen}
          onCancel={() => {
            setVideoModalOpen(false)
            setCurrentVideoUrl('')
          }}
          footer={null}
          destroyOnClose
          width={800}
          centered
        >
          {currentVideoUrl && (
            <video
              src={currentVideoUrl}
              controls
              autoPlay
              style={{ width: '100%', maxHeight: '70vh', borderRadius: '8px' }}
            />
          )}
        </Modal>
      </div>
    </div>
  )
}
