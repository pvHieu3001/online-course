import { fileConstants} from "../constants";
import { fileServices } from "../services";
// import { alertActions } from "./alert.actions";

export const getAll = (data) => async (dispatch) => {
  dispatch({ type: fileConstants.GETALL_REQUEST });

  await fileServices.getAll(data).then(
    (res) =>
      dispatch({ type: fileConstants.GETALL_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: fileConstants.GETALL_FAILURE,
        payload: error.toString(),
      })
  );
};

export const fileActions = {
  getAll
};
