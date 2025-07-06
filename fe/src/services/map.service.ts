import http from "../../src/app/http-common";
import {
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN,
  ADMIN_BASE_API,
} from "../../constants";

function getAll() {
  return http.get("/admin/maps");
}

function filter(keyword) {
  return http.get("/admin/maps/filter?keyword=" + keyword);
}

function update(data) {
  return http.put(`/admin/maps/update`, data);
}

export const mapServices = {
  getAll,
  filter,
  update,
};
