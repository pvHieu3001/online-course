import http from "../../http-common";

function getAll() {
  return http.get("/admin/files");
}

export const fileServices = {
  getAll,
};
