import http from '../http-common'

function getBlogs(search: string) {
  return http.get('/api/v1/user/blog?search=' + search)
}
function getAdminBlogs(search: string) {
  return http.get('/api/v1/admin/blog?search=' + search)
}
function getBlogById(id: string) {
  return http.get(`/api/v1/admin/blog/${id}`)
}

function getBlogBySlug(slug: string) {
  return http.get(`/api/v1/user/blog/slug/${slug}`)
}
function updateBlog(id?: string, data?: FormData) {
  return http.put(`/api/v1/admin/blog/${id}`, data)
}
function createBlog(data: FormData) {
  return http.post(`/api/v1/admin/Blog`, data)
}
function deleteBlog(id: string) {
  return http.delete(`/api/v1/admin/Blog/${id}`)
}
function getPageBlog(page: string, size: string, sort: string) {
  return http.get(`/api/v1/user/blog/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

export const blogServices = {
  getBlogs,
  getAdminBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  createBlog,
  deleteBlog,
  getPageBlog
}
