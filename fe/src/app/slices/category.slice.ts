import { Dispatch, createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  isLoadingDetails: false
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
    getAllSuccess: (state, { payload }) => {
      state.categories = payload
      state.isLoading = false
    },
    getAllFailure: (state) => {
      state.categories = []
      state.isLoading = false
    },
    getDetailsSuccess: (state, { payload }) => {
      state.category = payload
      state.isLoadingDetails = false
    },
    getDetailsFailure: (state) => {
      state.category = null
      state.isLoadingDetails = false
    },
    createSuccess: (state, { payload }) => {
      state.categories = [...state.categories, payload]
      state.isLoading = false
    },
    updateSuccess: (state, { payload }) => {
      state.categories = state.categories?.map((category) =>
        category.id === payload?.id ? payload : category
      )
      state.isLoading = false
    },
    deleteSuccess: (state, { payload }) => {
      state.categories = state.categories?.filter((category) => category?.id !== payload?.id)
      state.isLoading = false
    }
  }
})

// Thunk
export const getAllCategory = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await getListCategory()
    if (data) {
      dispatch(getAllSuccess(data))
    }
  } catch (error) {
    dispatch(getAllFailure())
  } finally {
    dispatch(fetchedDone())
  }
}

export const searchCategories = (q: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await searchCategory(q)
    if (data) {
      dispatch(getAllSuccess(data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getAllFailure())
  } finally {
    dispatch(fetchedDone())
  }
}

export const getOneCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await getCategory(id)
    if (data) {
      dispatch(getDetailsSuccess(data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getDetailsFailure())
  } finally {
    dispatch(fetchedDone())
  }
}

export const createNewCategory = (payload) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  try {
    const response = await createCategory(payload)
    if (response.data) {
      console.log(response)

      // dispatch(createSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const leditCategory = (payload: ICategory) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await updateCategory(payload)
    if (response.data) {
      dispatch(updateSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const changeStatus = (id: string, status: boolean) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await changeStatusCategory(id, status)
    if (response.data) {
      dispatch(updateSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const removeCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await deleteCategory(id)
    if (response.data) {
      dispatch(deleteSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const {
  isFetching,
  getAllSuccess,
  getDetailsSuccess,
  getDetailsFailure,
  getAllFailure,
  fetchedDone,
  createSuccess,
  updateSuccess,
  deleteSuccess
} = categorySlice.actions
export default categorySlice.reducer
