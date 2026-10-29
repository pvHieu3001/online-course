import http from '../http-common'

function getBooks(
  status?: string,
  search?: string,
  isDisplayHot?: string,
  currentPage?: number,
  booksPerPage?: number,
  tag?: string
) {
  currentPage = currentPage ?? 0
  booksPerPage = booksPerPage ?? 15
  return http.get(
    '/api/v1/user/book?status=' +
      status +
      '&search=' +
      search +
      '&tag=' +
      tag +
      '&isDisplayHot=' +
      isDisplayHot +
      '&page=' +
      currentPage.toString() +
      '&size=' +
      booksPerPage.toString()
  )
}
function getAdminBooks(
  status?: string,
  search?: string,
  isDisplayHot?: string,
  currentPage?: number,
  booksPerPage?: number
) {
  currentPage = currentPage ?? 0
  booksPerPage = booksPerPage ?? 15
  return http.get(
    '/api/v1/admin/book?status=' +
      status +
      '&search=' +
      search +
      '&isDisplayHot=' +
      isDisplayHot +
      '&page=' +
      currentPage.toString() +
      '&size=' +
      booksPerPage.toString()
  )
}
function getRecommendBooks() {
  return http.get('/api/v1/user/book/recommend')
}
function getQuickViewBooks() {
  return http.get('/api/v1/user/book/quick_view')
}
function getBookById(id: string) {
  return http.get(`/api/v1/admin/book/${id}`)
}
function getBookBySlug(slug: string) {
  return http.get(`/api/v1/user/book/slug/${slug}`)
}
function updateBook(id: string, data: FormData) {
  return http.put(`/api/v1/admin/book/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createBook(data: FormData) {
  return http.post(`/api/v1/admin/book`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function deleteBook(id: string) {
  return http.delete(`/api/v1/admin/book/${id}`)
}
function getPageBook(page: string, size: string, sort: string) {
  return http.get(`/api/v1/user/book/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

function getBooksByCategory(categoryId: number) {
  return http.get(`/api/v1/user/book/category/${categoryId}`)
}

export const bookServices = {
  getBooks,
  getAdminBooks,
  getBookById,
  getBookBySlug,
  updateBook,
  createBook,
  deleteBook,
  getPageBook,
  getBooksByCategory,
  getRecommendBooks,
  getQuickViewBooks
}
