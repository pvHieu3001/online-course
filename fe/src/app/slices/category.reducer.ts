import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: null,
  data: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getCategoriesSuccessFully: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
    },
    getCategoriesSuccessFailure: (state, { payload }) => {
      state.message = payload.message
      state.isLoading = false
    }
  }
})

export const { isFetching, fetchedDone, getCategoriesSuccessFully } = categorySlice.actions
export default categorySlice.reducer
