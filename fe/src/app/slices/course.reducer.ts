import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: null,
  data: null // sẽ chứa { getCourseDto: [...], size: number }
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getCoursesSuccessFully: (state, { payload }) => {
      state.data = payload.data
      state.code = payload.code
      state.message = payload.message
      state.isLoading = false
    },
    getCoursesFailure: (state, { payload }) => {
      state.code = payload.code || 'ERROR'
      state.message = payload.message || 'Something went wrong'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getCoursesSuccessFully,
  getCoursesFailure
} = courseSlice.actions

export default courseSlice.reducer
