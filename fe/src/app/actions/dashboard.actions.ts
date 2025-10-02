import { Dispatch } from '@reduxjs/toolkit'
import { dashboardServices } from '../services'
import {
  fetchedDone,
  getDashboardSuccessFully,
  getDashboardSuccessFailure,
  isFetching,
  reset
} from '../slices/dashboard.reducer'

export const getDashboard = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return dashboardServices
    .getDashboard()
    .then((res) => {
      dispatch(getDashboardSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getDashboardSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const resetDashboard = () => (dispatch: Dispatch) => {
  dispatch(reset())
}

export const dashboardActions = {
  getDashboard,
  resetDashboard
}
