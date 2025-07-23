import { Dispatch } from '@reduxjs/toolkit'
import { userService } from '../services'
import {
  createFailure,
  createSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  fetchedDone,
  getUsersFailure,
  getUsersSuccess,
  isFetching,
  loginSuccess,
  updateFailure,
  updateSuccessfully,
  getByIdFailure,
  getByIdSuccess
} from '../slices/user.reducer'

export const getUsers = () => async (dispatch: Dispatch) => {
  dispatch(isFetching)

  await userService.getUsers().then(
    (res) => dispatch(getUsersSuccess(res)),
    (error) => dispatch(getUsersFailure(error))
  )
}

export const getUserById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching)

  await userService.getUserById(id).then(
    (res) => dispatch(getByIdSuccess(res)),
    (error) => dispatch(getByIdFailure(error))
  )
}

export const createUser = (data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await userService
    .createUser(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateUser = (id, data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await userService
    .updateUser(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await userService
    .deleteUser(id)
    .then(() => dispatch(deleteSuccessfully()))
    .catch(() => dispatch(deleteFailure()))
    .finally(() => dispatch(fetchedDone()))
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
  logout,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
