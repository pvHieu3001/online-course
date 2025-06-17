import { mapConstants} from "../constants";
import { mapServices } from "../services";

export const getAll = (data) => async (dispatch) => {
  dispatch({ type: mapConstants.GETALL_REQUEST });

  await mapServices.getAll(data).then(
    (res) =>
      dispatch({ type: mapConstants.GETALL_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: mapConstants.GETALL_FAILURE,
        payload: error.toString(),
      })
  );
};

export const filter = (keyword) => async (dispatch) => {
  dispatch({ type: mapConstants.FILTER_REQUEST });

  await mapServices.filter(keyword).then(
    (res) =>
      dispatch({ type: mapConstants.FILTER_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: mapConstants.FILTER_FAILURE,
        payload: error.toString(),
      })
  );
};

export const update = (data) => async (dispatch) => {
  dispatch({ type: mapConstants.UPDATE_PIN_REQUEST });

  await mapServices.update(data).then(
    (res) =>
      dispatch({ type: mapConstants.UPDATE_PIN_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: mapConstants.UPDATE_PIN_FAILURE,
        payload: error.toString(),
      })
  );
};

export const mapActions = {
  getAll,
  filter,
  update,
};
