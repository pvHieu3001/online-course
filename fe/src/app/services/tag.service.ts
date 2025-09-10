import http from '../http-common'

function getTags() {
  return http.get('/api/v1/admin/tag')
}
function getTagById(id: string) {
  return http.get(`/api/v1/admin/tag/${id}`)
}
function updateTag(id?: string, data?: FormData) {
  return http.put(`/api/v1/admin/tag/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createTag(data: FormData) {
  return http.post(`/api/v1/admin/tag`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function deleteTag(id: string) {
  return http.delete(`/api/v1/admin/tag/${id}`)
}
export const tagServices = {
  getTags,
  getTagById,
  updateTag,
  createTag,
  deleteTag
}
