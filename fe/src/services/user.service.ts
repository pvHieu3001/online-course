import http from "../../src/app/http-common";
import httpauth from "../../src/app/http-auth";
import {
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN,
  ADMIN_BASE_API,
} from "../../src/app/constants";

function getAll(data) {
  return http.post("/api/user/search", data);
}

function get(id) {
  return http.get(`/admin/users/edit/${id}`);
}

function getUserLoggedIn() {
  const user = localStorage.getItem(LOCAL_STORAGE_USER)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER))
    : {};
  return http.get(`/admin/users/edit/${user ? user.id : 0}`);
}

function getUsers(keyword, body) {
  return http.post(`/admin/users/getApprovedUsers?keyword=` + keyword, body);
}

function getUnApproveUsers(keyword, body) {
  return http.post(`/admin/users/getUnapprovedUsers?keyword=` + keyword, body);
}

function approve(id) {
  return http.post(`admin/users/approve/${id}`);
}

async function login(data) {
  const res = await httpauth.post(`/admin/authenticate`, data);
  localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(res.data.data));
  return res.data;
}

function create(data) {
  return http.post("/admin/users/create", data);
}

function update(id, data) {
  return http.put(`/admin/users/update/${id}`, data);
}

function reject(id) {
  return http.post(`/admin/users/reject/${id}`);
}

function deleteById(ids) {
  return http.post(`/admin/users/deleteUsers`, ids);
}

function logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_USER);
  const url = `${ADMIN_BASE_API}/login`;
  window.location.href = url;
}

function sendOkEmail(user) {
  if (user.data[0]) {
    const email = user.data[0].email;
    var body = {
      to: email,
    };
    return http.post(`admin/send-ok-email`, body);
  } else {
    return;
  }
}

function sendRejectEmail(user) {
  if (user.data[0]) {
    const email = user.data[0].email;
    var body = {
      to: email,
    };
    return http.post(`admin/send-reject-email`, body);
  } else {
    return;
  }
}

function reissuePassword(data) {
  return http.post("/admin/send-reissue-password-email", data);
}

function getLogs(data) {
  return http.post("/admin/download_access_log", data, {
    responseType: "blob",
  });
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
  getLogs,
};
