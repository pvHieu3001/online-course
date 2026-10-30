import axios from 'axios'
import { LOCAL_STORAGE_TOKEN, EXTERNAL_BASE_API, LOCAL_STORAGE_USER, DOMAIN_URL } from '../common/constants'

const onSuccessInterceptorRequest = async (config) => {
  return config
}
const onErrorInterceptorRequest = (rs) => Promise.reject(rs)

const goToWorkspace = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER)
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  const url = `${DOMAIN_URL}login`
  window.location.href = url
}

const onErrorInterceptorResponse = (error) => {
  if (error.response) {
    const status = error.response.status
    if (status === 401) {
      console.log('Error 401: Unauthorized')
      goToWorkspace()
    } else if (status === 403) {
      console.log('Error 403: Forbidden')
      goToWorkspace()
    } else if (status === 404) {
      console.log('Error 404: Not Found')
      window.location.href = `${DOMAIN_URL}`
    } else {
      console.log(`HTTP Error ${status}:`, error.response.data)
    }
  } else if (error.request) {
    console.log('Network error or server not responding:', error.message)
    console.log('Request details:', error.request)
    // window.location.href = `${DOMAIN_URL}network-error`
  } else {
    console.log('Unknown error:', error.message)
  }
  return Promise.reject(error)
}
const onSuccessInterceptorResponse = (rs) => {
  return rs
}

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
axios.defaults.headers.common['Content-Type'] = 'application/json'

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.Accept = 'application/json'

const axs = axios.create({
  baseURL: EXTERNAL_BASE_API,
  timeout: 120 * 1000
})

axs.interceptors.request.use(onSuccessInterceptorRequest, onErrorInterceptorRequest)

axs.interceptors.response.use(onSuccessInterceptorResponse, onErrorInterceptorResponse)

export default axs
