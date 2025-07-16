import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { loadAuthState } from './auth'
import { setOpenModalLogin } from './web.slice'
import { AxiosError } from 'axios'
import { ErrorResponse } from 'react-router-dom'
import { popupError } from '@/page/shared/Toast'
const initialState = {
  users: [],
  user: null,
  isLoading: false,
  isLoadingDetails: false
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
    getUserLoggedIn: (state, { payload }) => {
      state.users = payload
      state.isLoading = false
    },
    getAllSuccess: (state, { payload }) => {
      state.users = payload
      state.isLoading = false
    },
    getAllFailure: (state) => {
      state.users = []
      state.isLoading = false
    },
    getDetailsSuccess: (state, { payload }) => {
      state.user = payload
      state.isLoadingDetails = false
    },
    getDetailsFailure: (state) => {
      state.user = null
      state.isLoadingDetails = false
    },
    createSuccess: (state, { payload }) => {
      state.users = [...state.users, payload]
      state.isLoading = false
    },
    updateSuccess: (state, { payload }) => {
      state.users = state.users?.map((user) => (user.id === payload?.id ? payload : user))
      state.isLoading = false
    },
    deleteSuccess: (state, { payload }) => {
      state.users = state.users?.filter((user) => user?.id !== payload?.id)
      state.isLoading = false
    }
  }
})
export const getUser = (payload: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await profileService(payload)

    if (data.success === true) {
      dispatch(loadAuthState(data))
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>

    if (axiosError?.response?.status === 401) {
      dispatch(setOpenModalLogin(true))
      popupError('Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại!')
    }
  }
}

export const {
  isFetching,
  getUserLoggedIn,
  getAllSuccess,
  getDetailsSuccess,
  getDetailsFailure,
  getAllFailure,
  fetchedDone,
  createSuccess,
  updateSuccess,
  deleteSuccess
} = userSlice.actions
export default userSlice.reducer
