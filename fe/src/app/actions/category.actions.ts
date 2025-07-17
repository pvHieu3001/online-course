import { Dispatch } from '@reduxjs/toolkit'
import { categoryConstants } from '../../constants'
import { categoryServices } from '../services'
import { fetchedDone, isFetching } from '../slices/category.reducer'

export const getCategories = (data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .getCategories(data)
    .then((res) => dispatch(getCategoriesSuccessFully(res.data)))
    .catch((error) =>
      dispatch({
        type: categoryConstants.GETBIG_FAILURE,
        payload: error.toString()
      })
    )
    .finally(() => dispatch(fetchedDone()))
}

export const categoryActions = {
  getCategories
}
