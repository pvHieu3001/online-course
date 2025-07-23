import http from '../http-common'

function getCourses() {
  return http.get('/api/v1/course')
}

function postCourses(data) {
  return http.post(`/api/v1/course`,data)
}

export const courseServices = {
  getCourses,
  postCourses
}
