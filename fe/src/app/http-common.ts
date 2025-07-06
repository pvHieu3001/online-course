import axios from "axios";
import reduxStore from "./store";
import { errorActions } from "./src/actions";
// import {LOCAL_STORAGE_TOKEN, BASE_API} from "./constants";
import { LOCAL_STORAGE_TOKEN, EXTERNAL_BASE_API } from "./constants";

const { dispatch } = reduxStore;
const onSuccessInterceptorRequest = async (config) => {
  return config;
};
const onErrorInterceptorRequest = (rs) => Promise.reject(rs);

const onErrorInterceptorResponse = (error) => {
  if (error) {
    if (!error.response.ok) {
      if (error.response.status === 401) {
        dispatch(errorActions.unauthorized());
      }
      if (error.response.status === 403) {
        window.location = "/";
      }
    }
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  return Promise.reject(error);
};
const onSuccessInterceptorResponse = (rs) => {
  return rs;
};

let cancel = null;
const CancelToken = axios.CancelToken;
axios.defaults.cancelToken = new CancelToken((c) => {
  cancel = c;
});

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
axios.defaults.headers.common["Content-Type"] = "application/json";

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
axios.defaults.headers.post.Accept = "application/json";
axios.defaults.headers.Accept = "application/json";

const axs = axios.create({
  // baseURL: BASE_API,
  baseURL: EXTERNAL_BASE_API,
  timeout: 120 * 1000,
  // withCredentials: true
});

axs.interceptors.request.use(
  onSuccessInterceptorRequest,
  onErrorInterceptorRequest
);

axs.interceptors.response.use(
  onSuccessInterceptorResponse,
  onErrorInterceptorResponse
);

export default axs;
