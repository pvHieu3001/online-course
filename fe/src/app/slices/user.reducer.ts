import { IUser } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IUser>(<unknown>null),
  dataList: <IUser[]>(<unknown>null)
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getUsersSuccess: (state, { payload }) => {
      state.dataList = payload.data.data
      state.isLoading = false
    },
    getUsersFailure: (state, { payload }) => {
      state.error_message = payload.message
      state.isLoading = false
    },
    getByIdSuccess: (state, { payload }) => {
      state.data = payload.data.data
      state.isLoading = false
    },
    getByIdFailure: (state, { payload }) => {
      state.error_message = payload.message
      state.isLoading = false
    },
    loginSuccess: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
    },
    loginFailure: (state, { payload }) => {
      state.error_message = payload.message
      state.isLoading = false
    },
    signupSuccess: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
    },
    signupFailure: (state, { payload }) => {
      state.error_message = payload.message
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'User Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create User'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'User Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update User'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'User Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete User'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getUsersSuccess,
  getUsersFailure,
  getByIdFailure,
  getByIdSuccess,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully
} = userSlice.actions
export default userSlice.reducer
