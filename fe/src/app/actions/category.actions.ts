import { Dispatch } from '@reduxjs/toolkit'
import { categoryConstants } from '../../constants'
import { categoryServices } from '../services'
import { fetchedDone, getCategoriesSuccessFully, isFetching } from '../slices/category.reducer'

export const getCategories = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .getCategories()
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
