import http from '../http-common'

function getCategories(data) {
  return http.get('/admin/big_category')
}

function createCategory(payload) {
  return http.post(`category`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const categoryServices = {
  getCategories,
  createCategory
}
