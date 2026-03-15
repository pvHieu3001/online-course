import http from '../http-common'

function getAmazons(search: string) {
  return http.get('/api/v1/user/amazon?search=' + search)
}
function getAdminAmazons(search: string) {
  return http.get('/api/v1/admin/amazon?search=' + search)
}
function getAmazonById(id: string) {
  return http.get(`/api/v1/admin/amazon/${id}`)
}
function getRandomAmazon() {
  return http.get(`/api/v1/user/amazon/random`)
}
function updateAmazon(id?: string, data?: FormData) {
  return http.put(`/api/v1/admin/amazon/${id}`, data)
}
function createAmazon(data: FormData) {
  return http.post(`/api/v1/admin/amazon`, data)
}
function deleteAmazon(id: string) {
  return http.delete(`/api/v1/admin/amazon/${id}`)
}
function getPageAmazon(page: string, size: string, sort: string) {
  return http.get(`/api/v1/user/amazon/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

export const amazonServices = {
  getAmazons,
  getAdminAmazons,
  getAmazonById,
  getRandomAmazon,
  updateAmazon,
  createAmazon,
  deleteAmazon,
  getPageAmazon
}
