import { getLocalStorage } from "../utils/localStorage";

const ADMIN_BASE_IMAGE_URL = import.meta.env.VITE_ADMIN_BASE_IMAGE_URL;
const EXTERNAL_BASE_API = import.meta.env.VITE_EXTERNAL_BASE_API;

const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_USER = "user";

const TOKEN = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

export {
  ADMIN_BASE_IMAGE_URL,
  EXTERNAL_BASE_API,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  TOKEN,
};
