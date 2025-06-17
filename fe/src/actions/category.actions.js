import { categoryConstants} from "../constants";
import { categoryServices } from "../services";

export const getBigCategory = (data) => async (dispatch) => {
  dispatch({ type: categoryConstants.GETBIG_REQUEST });

  await categoryServices.getBigCategory(data).then(
    (res) =>
      dispatch({ type: categoryConstants.GETBIG_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: categoryConstants.GETBIG_FAILURE,
        payload: error.toString(),
      })
  );
};

export const getMediumCategory = (big_id) => async (dispatch) => {
  dispatch({ type: categoryConstants.GETMED_REQUEST });

  await categoryServices.getMediumCategory(big_id).then(
    (res) =>
      dispatch({ type: categoryConstants.GETMED_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: categoryConstants.GETMED_FAILURE,
        payload: error.toString(),
      })
  );
};

export const getDetailCategory = (big_id,med_id) => async (dispatch) => {
  dispatch({ type: categoryConstants.GETDET_REQUEST });

  await categoryServices.getDetailCategory(big_id,med_id).then(
    (res) =>
      dispatch({ type: categoryConstants.GETDET_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: categoryConstants.GETDET_FAILURE,
        payload: error.toString(),
      })
  );
};

export const categoryActions = {
  getBigCategory,
  getMediumCategory,
  getDetailCategory
};
