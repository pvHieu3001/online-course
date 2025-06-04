export interface ICart {
  id?: number | string
  name: string
  slug: string
  thumbnail: string
  quantity: number
  user_id?: number | string
  price: number
  price_sale: number
}

export interface Ivariant {
  id: number | string
  name: string
}

export interface IAddCart {
  quantity: number
  product_id: string | number
  token?: string | null
}
