import http from "../../src/app/http-common";

function getAll(data) {
  return http.get("/admin/suppliers", data);
}

function getSuppliers(keyword, data) {
  return http.post(`/admin/suppliers/getall/?keyword=` + keyword, data);
}

function get(id) {
  return http.get(`/admin/suppliers/edit/${id}`);
}

function create(data) {
  return http.post("/admin/suppliers/create", data);
}

function update(id, data) {
  return http.put(`/admin/suppliers/update/${id}`, data);
}

function deleteById(ids) {
  return http.post(`/admin/suppliers/deleteSuppliers`, ids);
}

function getListFile(id) {
  return http.get(`/admin/files/${id}`);
}

function uploadFile(data) {
  return http.post(`/admin/upload`, data);
}

function getListSuppliers(data) {
  return http.post(`/admin/suppliers/list`, data);
}

export const supplierService = {
  getAll,
  getSuppliers,
  get,
  create,
  update,
  delete: deleteById,
  getListFile,
  uploadFile,
  getListSuppliers,
};
