import { IAmazon } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IAmazon>(<unknown>null),
  dataRandom: <IAmazon>(<unknown>null),
  dataList: <IAmazon[]>(<unknown>null)
}

const AmazonSlice = createSlice({
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
      state.dataList = payload.data
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
      state.message = 'Tạo Link Amazon Thành Công'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Tạo Link Amazon Thất Bại'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Cập Nhật Link Amazon Thành Công'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Cập Nhật Link Amazon Thất Bại'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Xóa Link Amazon Thành Công'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Xóa Link Amazon Thất Bại'
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
  deleteSuccessfully
} = AmazonSlice.actions
export default AmazonSlice.reducer
