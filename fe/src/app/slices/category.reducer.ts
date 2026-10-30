import { ICategory } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <ICategory>(<unknown>null),
  dataList: <ICategory[]>(<unknown>null)
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
      state.dataList = payload.data
      state.isLoading = false
    },
    getCategoriesSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    getByIdSuccessFully: (state, { payload }) => {
      state.data = payload.data
      state.isLoading = false
    },
    getByIdSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Category Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Category'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Category Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Category'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Category Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Category'
      state.isLoading = false
    },
    reset: (state) => {
      state.isLoading = true
      state.code = ''
      state.message = ''
      state.error_message = ''
      state.data = null as unknown as ICategory
      state.dataList = []
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getCategoriesSuccessFully,
  getCategoriesSuccessFailure,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  reset
} = categorySlice.actions
export default categorySlice.reducer
