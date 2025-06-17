import { supplierConstants } from "../constants";
import { supplierService } from "../services";
import { alertActions } from "./alert.actions";

export const getAll = (data) => async (dispatch) => {
  dispatch({ type: supplierConstants.GETALL_REQUEST });

  await supplierService.getAll(data).then(
    (res) =>
      dispatch({ type: supplierConstants.GETALL_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: supplierConstants.GETALL_FAILURE,
        payload: error.toString(),
      })
  );
};

export const get = (id) => async (dispatch) => {
  await supplierService.get(id).then(
    (res) => {
      dispatch({ type: supplierConstants.GETBYID_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: supplierConstants.GETBYID_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const getSuppliers = (keyword, data) => async (dispatch) => {
  dispatch({ type: supplierConstants.GET_SUPPLIERS_REQUEST });

  await supplierService.getSuppliers(keyword, data).then(
    (res) =>
      dispatch({
        type: supplierConstants.GET_SUPPLIERS_SUCCESS,
        payload: res.data,
      }),
    (error) =>
      dispatch({
        type: supplierConstants.GET_SUPPLIERS_FAILURE,
        payload: error.toString(),
      })
  );
};

export const create = (supplier) => async (dispatch) => {
  dispatch({ type: supplierConstants.CREATE_REQUEST });

  await supplierService.create(supplier).then(
    (res) => {
      dispatch({ type: supplierConstants.CREATE_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: supplierConstants.CREATE_FAILURE,
        payload: error.response.data,
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const update = (supplier) => async (dispatch) => {
  dispatch({ type: supplierConstants.UPDATE_REQUEST, supplier });

  await supplierService.update(supplier.id, supplier).then(
    (res) => {
      dispatch({ type: supplierConstants.UPDATE_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({ type: supplierConstants.UPDATE_FAILURE, payload: error.response.data});
      dispatch(alertActions.error(error));
    }
  );
};

export const deleteItem = (id) => async (dispatch) => {
  dispatch({ type: supplierConstants.DELETE_REQUEST });

  await supplierService.delete(id).then(
    (res) => {
      dispatch({ type: supplierConstants.DELETE_SUCCESS });
    },
    (error) => {
      dispatch({
        type: supplierConstants.DELETE_FAILURE,
        payload: error.toString(),
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const getListFile = (id) => async (dispatch) => {
  dispatch({ type: supplierConstants.GET_UPLOAD_FILE_REQUEST });

  await supplierService.getListFile(id).then(
    (res) => {
      dispatch({
        type: supplierConstants.GET_UPLOAD_FILE_SUCCESS,
        payload: res.data,
      });
    },
    (error) => {
      dispatch({
        type: supplierConstants.GET_UPLOAD_FILE_FAILURE,
        payload: error.toString(),
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const getListSuppliers = (data) => async (dispatch) => {
  dispatch({ type: supplierConstants.GET_LIST_SUPPLIERS_REQUEST });

  await supplierService.getListSuppliers(data).then(
    (res) => {
      dispatch({
        type: supplierConstants.GET_LIST_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
    },
    (error) => {
      dispatch({
        type: supplierConstants.GET_LIST_SUPPLIERS_FAILURE,
        payload: error.toString(),
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const uploadFile = (data) => async (dispatch) => {
  dispatch({ type: supplierConstants.UPLOAD_REQUEST });

  await supplierService.uploadFile(data).then(
    (res) => {
      dispatch({ type: supplierConstants.UPLOAD_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: supplierConstants.UPDATE_FAILURE,
        payload: error.toString(),
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const supplierActions = {
  getAll,
  get,
  getSuppliers,
  create,
  update,
  deleteItem,
  uploadFile,
  getListFile,
  getListSuppliers
};
