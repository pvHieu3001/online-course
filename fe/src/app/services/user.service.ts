import http from '../http-common'
import httpauth from '../http-auth'
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_TOKEN, ADMIN_BASE_API } from '../constants'

function getUsers() {
  return http.get(`/api/v1/user`)
}

async function login(data) {
  const res = await httpauth.post(`/api/v1/auth/login`, data)
  localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token)
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(res.data.data))
  return res.data
}

function logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_USER)
  const url = `${ADMIN_BASE_API}/login`
  window.location.href = url
}



export const userService = {
  getAll,
  get,
  getUsers,
  getUnApproveUsers,
  login,
  approve,
  create,
  update,
  reject,
  delete: deleteById,
  logout,
  getUserLoggedIn,
  sendOkEmail,
  sendRejectEmail,
  reissuePassword,
  getLogs
}
