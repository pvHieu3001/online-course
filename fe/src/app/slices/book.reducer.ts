import { IBook, IQuickViewBook } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IBook>(<unknown>null),
  dataList: <IBook[]>(<unknown>null),
  recommends: <IBook[]>(<unknown>null),
  quickViews: <IQuickViewBook[]>(<unknown>null),
  totalElements: 0
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    reset: (state) => {
      state.isLoading = true
      state.code = ''
      state.message = ''
      state.error_message = ''
      state.data = null as unknown as IBook
      state.dataList = []
    },
    getBooksSuccessFully: (state, { payload }) => {
      state.dataList = payload.data.content ?? payload.data
      state.totalElements = payload.data.totalElements
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getRecommendBooksSuccessFully: (state, { payload }) => {
      state.recommends = payload.data
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getQuickViewBooksSuccessFully: (state, { payload }) => {
      state.quickViews = payload.data
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getBooksFailure: (state, { payload }) => {
      state.code = payload.code || 'ERROR'
      state.message = payload.error_message || 'Something went wrong'
      state.isLoading = false
    },
    getByIdSuccessFully: (state, { payload }) => {
      state.data = payload.data
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getByIdFailure: (state, { payload }) => {
      state.code = payload.code || 'ERROR'
      state.message = payload.error_message || 'Something went wrong'
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Book Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Book'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Book Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Book'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Book Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Book'
      state.isLoading = false
    },
    getBooksByCategorySuccessFully: (state, { payload }) => {
      state.dataList = payload.data
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getBooksByCategoryFailure: (state, { payload }) => {
      state.code = payload.code || 'ERROR'
      state.message = payload.error_message || 'Something went wrong'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getBooksSuccessFully,
  getBooksFailure,
  getByIdFailure,
  getByIdSuccessFully,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  getBooksByCategorySuccessFully,
  getBooksByCategoryFailure,
  getRecommendBooksSuccessFully,
  getQuickViewBooksSuccessFully,
  reset
} = bookSlice.actions

export default bookSlice.reducer
