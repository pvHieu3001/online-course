import http from '../http-common'
import httpauth from '../http-auth'
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_TOKEN, ADMIN_BASE_API } from '../constants'
import axs from '../http-common'

function getUsers() {
  return http.get(`/api/v1/user`)
}

async function login(data) {
  const res = await httpauth.post(`/api/v1/auth/login`, data)
  const token = res.data.data.access_token
  axs.defaults.headers.common.Authorization = `Bearer ${token}`

  localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
  return res.data
}

function logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_USER)
  const url = `${ADMIN_BASE_API}/login`
  window.location.href = url
}

export const userService = {
  getUsers,
  login,
  logout
}
