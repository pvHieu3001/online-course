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

// Get all users
export const getUsers = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .getUsers()
    .then((res) => {
      dispatch(getUsersSuccess(res))
      return res
    })
    .catch((error) => {
      dispatch(getUsersFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Get user by ID
export const getUserById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .getUserById(id)
    .then((res) => {
      dispatch(getByIdSuccess(res))
      return res
    })
    .catch((error) => {
      dispatch(getByIdFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Create user
export const createUser = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .createUser(data)
    .then((res) => {
      dispatch(createSuccessfully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(createFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Update user
export const updateUser = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .updateUser(id, data)
    .then((res) => {
      dispatch(updateSuccessfully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(updateFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Delete user
export const deleteUser = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .deleteUser(id)
    .then((res) => {
      dispatch(deleteSuccessfully())
      return res
    })
    .catch((error) => {
      dispatch(deleteFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Login user
export const login = (token) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return userService
    .login(token)
    .then((res) => {
      dispatch(loginSuccess(res))
      return res
    })
    .catch((error) => {
      // 👇 Tùy vào mục đích, có thể dispatch lỗi riêng nếu cần
      dispatch(loginSuccess(error)) // <-- nên có loginFailure?
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

// Logout user (sync action)
function logout() {
  userService.logout()
  return { type: 'LOGOUT' } // ⛔ userConstants.LOGOUT không thấy được import
}

// Export actions
export const userActions = {
  login,
  getUsers,
  logout,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
