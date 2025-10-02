import { IDashboard } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IDashboard>(<unknown>null),
}

const dashboardSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    reset: (state) => {
      state.isLoading = true
      state.code = ''
      state.message = ''
      state.error_message = ''
      state.data = null as unknown as IDashboard
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getDashboardSuccessFully: (state, { payload }) => {
      state.data = payload.data
      state.isLoading = false
    },
    getDashboardSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    
  }
})

export const {
  isFetching,
  reset,
  fetchedDone,
  getDashboardSuccessFully,
  getDashboardSuccessFailure,
} = dashboardSlice.actions
export default dashboardSlice.reducer
