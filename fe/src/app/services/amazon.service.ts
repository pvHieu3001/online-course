import http from '../http-common'

function getAmazons(search: string) {
  return http.get('/api/v1/user/amazon?search=' + search)
}
function getAdminAmazons(search: string, status: string, isCapLink: string, page: number, pageSize: number) {
  return http.get(
    `/api/v1/admin/amazon?search=${search}&status=${status}&isCaptionLink=${isCapLink}&page=${page}&size=${pageSize}`
  )
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

function publishPost(data: FormData) {
  return http.post(`/api/v1/admin/amazon/publish`, data)
}

function getPageAmazon(page: string, size: string, sort: string) {
  return http.get(`/api/v1/user/amazon/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

function getThreadAccount() {
  return http.get(`/api/v1/admin/amazon/get-thread-account`)
}

export const amazonServices = {
  getAmazons,
  getAdminAmazons,
  getAmazonById,
  getRandomAmazon,
  updateAmazon,
  createAmazon,
  deleteAmazon,
  getPageAmazon,
  publishPost,
  getThreadAccount
}
