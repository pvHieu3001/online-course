import http from '../http-common'

function getCourses() {
  return http.get('/api/v1/course')
}
function getCourseById(id: string) {
  return http.get(`/api/v1/course/${id}`)
}
function updateCourse(id, data) {
  return http.put(`/api/v1/course/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
function createCourse(data) {
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

export const courseServices = {
  getCourses,
  getCourseById,
  updateCourse,
  createCourse,
  deleteCourse,
  getPageCourse,
}
