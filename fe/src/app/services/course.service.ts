import http from '../http-common'

function getCourses() {
  return http.get('/api/v1/course')
}

export const courseServices = {
  getCourses
}
