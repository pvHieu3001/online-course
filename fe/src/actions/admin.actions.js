import { adminConstants} from "../constants";
import { adminServices } from "../services";
import { alertActions } from "./alert.actions";



export const get = (id) => async (dispatch) => {
  await adminServices.get(id).then(
    (res) => {
      dispatch({ type: adminConstants.GETBYID_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: adminConstants.GETBYID_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const update = (admin) => async (dispatch) => {
  dispatch({ type: adminConstants.UPDATE_REQUEST, admin });

  await adminServices.update(admin.id, admin).then(
    (res) => {
      dispatch({ type: adminConstants.UPDATE_SUCCESS, payload: res.data });
      // dispatch(alertActions.success("Cập nhật dữ liệu thành công"));
    },
    (error) => {
      dispatch({ type: adminConstants.UPDATE_FAILURE , payload: error.response.data});
      // dispatch(alertActions.error(error));
    }
  );
};

export const adminActions = {
  get,
  update
};
