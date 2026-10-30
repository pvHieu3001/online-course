export interface IBook {
  isDisplayHot: string // blank: all, 0: false, 1: true
  id: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  categoryId: number | string
  category: ICategory
  description: string
  content: string
  imageUrl: string
  amzUrl: string
  name: string
  slug: string
  sourceUrl: string
  status: string
}

export interface ICategory {
  id: number
  parentId: number
  name: string
  slug: string
  description: string
  content: string
  image: string
  status: boolean
  isQuickView: boolean
  numberBook: number
}

export interface IQuickViewBook {
  listBook: IBook[]
  category: ICategory
}

export interface ILogin {
  username: string
  password: string
}

export interface IRegister {
  firstname: string
  username: string
  password: string
  lastname: string
  email: string
}

export interface IUser {
  id: number
  firstname: string
  username: string
  password: string
  lastname: string
  email: string
  createAt: string
  role: string
}

export interface IOrder {
  id: number
  subTotal: number
  discountAmount: number
  totalAmount: number
  couponId: number
  status: string
}

export interface ILog {
  id: number
  userId: number
  bookId: number
  name: string
  action: string
  ipAddress: string
  userAgent: string
}

export interface IError {
  data: string
  code: number
  message: number
}

export interface IBlog {
  id: number
  title: string
  description: string
  content: string
  image: string
  slug: string
  status: boolean
  type: string
  updatedAt: string
  updatedBy: IUser
  isTrending: string
  isTrendingNew: string
  tags: ITag[]
}

export interface ITag {
  id: number
  name: string
}

export interface IUrl {
  id: number
  link: string
  seqNo: number
}

export interface IDashboard {
  numberBook: number
  numberPost: string
  numberUser: number
  numberDownload: number
}

export interface IAffiliate {
  id: number
  name: string
  targetUrl: string
  clickCount: number
  status: boolean
  price: string
  originalPrice: string
  image: string
  updatedAt: string
  updatedBy: IUser
}

export interface IAmazon {
  id: number
  productName: string
  sourceUrl: string
  caption: string
  amzUrl: string
  isPublished: boolean
  status: string
  publishedAt: string
  lastError: string
  retryCount: number
  accountThread: string
  isCaptionLink: boolean
  hasLink: boolean
  medias: IMedia[]
}

export interface IMedia {
  id: number
  cloudinaryUrl: string
  mediaType: string
}

export interface IThreadAccount {
  id: number
  accountName: string
  threadId: string
  threadToken: string
  isThreadPending: boolean
  isCaptionLink: boolean
}

export interface IPagination {
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: number
  isLast: number
}

export type ContextType = {
  setIsShowRecommendBooks: (value: boolean) => void
}
