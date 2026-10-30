import { IAmazon, IPagination, IThreadAccount } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IAmazon>(<unknown>null),
  dataRandom: <IAmazon>(<unknown>null),
  dataList: <IAmazon[]>(<unknown>null),
  dataThreadAccount: <IThreadAccount[]>(<unknown>null),
  pagination: <IPagination>(<unknown>null)
}

const amazonSlice = createSlice({
  name: 'Amazon',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getAmazonsSuccessFully: (state, { payload }) => {
      state.dataList = payload.data.content
      state.pagination = {
        totalElements: payload.data.totalElements,
        totalPages: payload.data.totalPages,
        pageNumber: payload.data.number,
        pageSize: payload.data.size,
        isFirst: payload.data.first,
        isLast: payload.data.last
      }
      state.isLoading = false
    },
    getAmazonsSuccessFailure: (state, { payload }) => {
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
    getRandomAmazonSuccessFully: (state, { payload }) => {
      state.dataRandom = payload.data
      state.isLoading = false
    },
    getRandomAmazonSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Amazon Link Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Amazon Link'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Amazon Link Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Amazon Link'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Amazon Link Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Amazon Link'
      state.isLoading = false
    },
    publishSuccessfully: (state) => {
      state.message = 'Published Successfully'
      state.isLoading = false
    },
    publishFailure: (state) => {
      state.error_message = 'Publish Failed'
      state.isLoading = false
    },
    getAccountThreadSuccessfully: (state, { payload }) => {
      state.dataThreadAccount = payload.data
      state.message = 'Thread Account Retrieved Successfully'
      state.isLoading = false
    },
    getAccountThreadFailure: (state) => {
      state.error_message = 'Failed to Retrieve Thread Account'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getAmazonsSuccessFully,
  getAmazonsSuccessFailure,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  getRandomAmazonSuccessFully,
  getRandomAmazonSuccessFailure,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  publishSuccessfully,
  publishFailure,
  getAccountThreadSuccessfully,
  getAccountThreadFailure
} = amazonSlice.actions
export default amazonSlice.reducer
