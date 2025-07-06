import http from "../../src/app/http-common";

function getAll(body) {
  return http.post("/admin/getNoti",body);
}

function create(data) {
  return http.post(`/admin/notifications/create`,data);
}

function publish(data) {
  return http.post(`/admin/pushNotifications`,data);
}

function getById(id) {
  return http.get(`/admin/getDetailNoti/${id}`);
}

function update(data) {
  return http.put(`/admin/notifications/update/${data.id}`,data);
}

export const notificationServices = {
  getAll,
  create,
  publish,
  getById,
  update
};
