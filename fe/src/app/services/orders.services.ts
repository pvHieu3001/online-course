import http from '../http-common'

function getOrder() {
  return http.get('/api/v1/course')
}
function getOrderById(id: string) {
  return http.get(`/api/v1/course/${id}`)
}
function updateOrder(id, data) {
  return http.put(`/api/v1/course/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createOrder(data) {
  return http.post(`/api/v1/course`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function deleteOrder(id: string) {
  return http.delete(`/api/v1/course/${id}`)
}
function getPageOrder(page: string, size: string, sort: string) {
  return http.get(`/api/v1/course/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

export const courseServices = {
  getOrder,
  getOrderById,
  updateOrder,
  createOrder,
  deleteOrder,
  getPageOrder,
}
