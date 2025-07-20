import http from '../http-common'

function getCategories() {
  return http.get('/api/v1/category')
}


export const categoryServices = {
  getCategories,
  
}
