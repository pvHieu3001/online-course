import http from '../http-common'

function getDashboard() {
  return http.get('/api/v1/admin/dashboard')
}

export const dashboardServices = {
  getDashboard
}
