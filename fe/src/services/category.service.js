import http from "../../http-common";

function getBigCategory() {
  return http.get("/admin/big_category");
}

function getMediumCategory() {
  return http.get(`/admin/medium_category`);
}

function getDetailCategory() {
  return http.get(`/admin/detail_category`);
}

export const categoryServices = {
  getBigCategory,
  getMediumCategory,
  getDetailCategory
};
