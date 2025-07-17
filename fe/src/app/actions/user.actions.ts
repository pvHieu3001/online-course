import { Dispatch } from '@reduxjs/toolkit'
import { userConstants } from '../../constants'
import { userService } from '../services'
import { isFetching, loginSuccess } from '../slices/user.reducer'

export const getUsers = () => async (dispatch: Dispatch) => {
  dispatch(isFetching)

  await userService.getUsers().then(
    (res) => dispatch({ type: userConstants.GET_USERS_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: userConstants.GET_USERS_FAILURE,
        payload: error.toString()
      })
  )
}

export const login = (token) => async (dispatch: Dispatch) => {
  dispatch(isFetching)
  await userService.login(token).then(
    (res) => {
      dispatch(loginSuccess(res))
    },
    (error) => {
      dispatch(loginSuccess(error))
    }
  )
}

function logout() {
  userService.logout()
  return { type: userConstants.LOGOUT }
}

export const userActions = {
  login,
  getUsers,
  logout
}
