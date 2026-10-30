import { IBlog } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <ITag>(<unknown>null),
  dataList: <ITag[]>(<unknown>null)
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getTagSuccessFully: (state, { payload }) => {
      state.dataList = payload.data
      state.isLoading = false
    },
    getTagSuccessFailure: (state, { payload }) => {
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
      state.message = 'Tag Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Tag'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Tag Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Tag'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Tag Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Tag'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getTagSuccessFully,
  getTagSuccessFailure,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully
} = tagSlice.actions
export default tagSlice.reducer
