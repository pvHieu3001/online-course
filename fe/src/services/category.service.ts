import http from '../app/http-common'

function getCategories() {
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
