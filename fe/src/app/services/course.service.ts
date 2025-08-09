import http from '../http-common'

function getCourses(status?: string, search?: string) {
  return http.get('/api/v1/course?status=' + status + '&search=' + search)
}
function getCourseById(id: string) {
  return http.get(`/api/v1/course/${id}`)
}
function updateCourse(id: string, data: FormData) {
  return http.put(`/api/v1/course/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createCourse(data: FormData) {
  return http.post(`/api/v1/course`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function deleteCourse(id: string) {
  return http.delete(`/api/v1/course/${id}`)
}
function getPageCourse(page: string, size: string, sort: string) {
  return http.get(`/api/v1/course/pageable/?page=${page}&size=${size}&sort=${sort}`)
}

function getCoursesByCategory(categoryId: number) {
  return http.get(`/api/v1/course/category/${categoryId}`)
}

export const courseServices = {
  getCourses,
  getCourseById,
  updateCourse,
  createCourse,
  deleteCourse,
  getPageCourse,
  getCoursesByCategory
}
