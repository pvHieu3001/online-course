import http from '../http-common'

function getCategories() {
  return http.get('/api/v1/category')
}
function getCategoryById(id: string) {
  return http.get(`/api/v1/category/${id}`)
}
function updateCategory(id, data) {
  return http.put(`/api/v1/category/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createCategory(data) {
  return http.post(`/api/v1/category`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function deleteCategory(id: string) {
  return http.delete(`/api/v1/category/${id}`)
}
function getPageCategory(page: string, size: string, sort: string) {
  return http.get(`/api/v1/category/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

export const categoryServices = {
  getCategories,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getPageCategory
}
