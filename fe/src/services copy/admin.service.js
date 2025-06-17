import http from "../../http-common";

function get(id) {
  return http.get(`/admin/get/${id}`);
}

function update(id, data) {
  return http.put(`/admin/update/${id}`, data);
}

export const adminServices = {
  get,
  update,
};
