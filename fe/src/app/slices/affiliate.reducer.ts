import { IAffiliate } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IAffiliate>(<unknown>null),
  dataRandom: <IAffiliate>(<unknown>null),
  dataList: <IAffiliate[]>(<unknown>null)
}

const affiliateSlice = createSlice({
  name: 'affiliate',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getAffiliatesSuccessFully: (state, { payload }) => {
      state.dataList = payload.data
      state.isLoading = false
    },
    getAffiliatesSuccessFailure: (state, { payload }) => {
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
    getRandomAffiliateSuccessFully: (state, { payload }) => {
      state.dataRandom = payload.data
      state.isLoading = false
    },
    getRandomAffiliateSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Affiliate Link Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Affiliate Link'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Affiliate Link Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Affiliate Link'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Affiliate Link Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Affiliate Link'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  fetchedDone,
  getAffiliatesSuccessFully,
  getAffiliatesSuccessFailure,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  getRandomAffiliateSuccessFully,
  getRandomAffiliateSuccessFailure,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully
} = affiliateSlice.actions
export default affiliateSlice.reducer
