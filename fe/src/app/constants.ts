// import getLocalStorage dari helper/localStorage yang đã được tạo
import { getLocalStorage } from "../utils/localStorage";

// const BASE_API = "http://localhost:8080";
// const ADMIN_BASE_API = "http://localhost:8080";
const ADMIN_BASE_API = import.meta.env.VITE_ADMIN_BASE_URL;
// const BASE_API = import.meta.env.VITE_APP_BASE_API;

// const BASE_API_IMAGE = "http://localhost:8080/image";
// const BASE_API_IMAGE = import.meta.env.VITE_APP_BASE_API_IMAGE;
const ADMIN_BASE_IMAGE_URL = import.meta.env.VITE_ADMIN_BASE_IMAGE_URL;
const EXTERNAL_BASE_API = import.meta.env.VITE_EXTERNAL_BASE_API;

const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_USER = "user";

const TOKEN = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

// export constant
export {
  // BASE_API,
  // BASE_API_IMAGE,
  ADMIN_BASE_API,
  ADMIN_BASE_IMAGE_URL,
  EXTERNAL_BASE_API,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  TOKEN,
};
