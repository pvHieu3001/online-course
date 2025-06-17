import { notificationConstants} from "../constants";
import { notificationServices } from "../services";
import { alertActions } from "./alert.actions";

export const getAll = (data) => async (dispatch) => {
  dispatch({ type: notificationConstants.GETALL_REQUEST });

  await notificationServices.getAll(data).then(
    (res) =>
      dispatch({ type: notificationConstants.GETALL_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: notificationConstants.GETALL_FAILURE,
        payload: error.toString(),
      })
  );
};

export const create = (data) => async (dispatch) => {
  dispatch({ type: notificationConstants.CREATE_REQUEST });

  await notificationServices.create(data).then(
    (res) =>
      dispatch({ type: notificationConstants.CREATE_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: notificationConstants.CREATE_FAILURE,
        payload: error.toString(),
      })
  );
};

export const publish = (data) => async (dispatch) => {
  dispatch({ type: notificationConstants.PUBLISH_REQUEST });

  await notificationServices.publish(data).then(
    (res) =>
      dispatch({ type: notificationConstants.PUBLISH_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: notificationConstants.PUBLISH_FAILURE,
        payload: error.toString(),
      })
  );
};

export const getById = (id) => async (dispatch) => {
  dispatch({ type: notificationConstants.GETBYID_REQUEST });

  await notificationServices.getById(id).then(
    (res) =>
      dispatch({ type: notificationConstants.GETBYID_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: notificationConstants.GETBYID_FAILURE,
        payload: error.toString(),
      })
  );
};

export const update = (data) => async (dispatch) => {
  dispatch({ type: notificationConstants.UPDATE_REQUEST });

  await notificationServices.update(data).then(
    (res) =>
      dispatch({ type: notificationConstants.UPDATE_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: notificationConstants.UPDATE_FAILURE,
        payload: error.toString(),
      })
  );
};

export const notificationActions = {
  getAll,
  create,
  publish,
  getById,
  update
};
