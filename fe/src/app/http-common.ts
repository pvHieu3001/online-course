import axios from 'axios'
// import {LOCAL_STORAGE_TOKEN, BASE_API} from "./constants";
import { LOCAL_STORAGE_TOKEN, EXTERNAL_BASE_API } from './constants'

const onSuccessInterceptorRequest = async (config) => {
  return config
}
const onErrorInterceptorRequest = (rs) => Promise.reject(rs)

const onErrorInterceptorResponse = (error) => {
  if (error) {
    if (!error.response.ok) {
      if (error.response.status === 401) {
        console.log('error 401')
      }
      if (error.response.status === 403) {
        console.log('error 403')
      }
    }
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
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
