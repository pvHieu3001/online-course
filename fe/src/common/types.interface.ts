export interface IProduct {
  id: number | string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  category_id: number | string
  description: string
  image_url: string
  language: string
  level: string
  name: string
  price: number
  rating: number
  slug: string
  source_url: string
  status: string
  total_rating: number
  total_students: number
}

export interface ICategory {
  id: number
  parentId: number
  name: string
  slug: string
}
