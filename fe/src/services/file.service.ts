import http from "../../src/app/http-common";

function getAll() {
  return http.get("/admin/files");
}

export const fileServices = {
  getAll,
};
