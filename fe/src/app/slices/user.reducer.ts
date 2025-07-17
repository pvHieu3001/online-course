import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isLoading: false,
  code: '',
  message: null,
  data: null
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
      state.data = payload
      state.isLoading = false
    },
    getUsersFailure: (state, { payload }) => {
      state.message = payload.message
      state.isLoading = false
    },
    loginSuccess: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
    },
    loginFailure: (state, { payload }) => {
      state.message = payload.message
      state.isLoading = false
    }
  }
})

export const { isFetching, fetchedDone, getUsersSuccess, getUsersFailure, loginSuccess, loginFailure} = userSlice.actions
export default userSlice.reducer
