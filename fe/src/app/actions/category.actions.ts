import { Dispatch } from '@reduxjs/toolkit'
import { categoryServices } from '../services'
import {
  fetchedDone,
  getCategoriesSuccessFully,
  getCategoriesSuccessFailure,
  isFetching,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  getByIdSuccessFailure,
  getByIdSuccessFully
} from '../slices/category.reducer'

export const getCategories = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .getCategories()
    .then((res) => {
      dispatch(getCategoriesSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getCategoriesSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getCategoryById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .getCategoryById(id)
    .then((res) => {
      dispatch(getByIdSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getByIdSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getCategoryBySlug = (slug: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .getCategoryBySlug(slug)
    .then((res) => {
      dispatch(getByIdSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getByIdSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const createCategory = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .createCategory(data)
    .then((res) => {
      dispatch(createSuccessfully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(createFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const updateCategory = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .updateCategory(id, data)
    .then((res) => {
      dispatch(updateSuccessfully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(updateFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const deleteCategory = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return categoryServices
    .deleteCategory(id)
    .then((res) => {
      dispatch(deleteSuccessfully())
      return res
    })
    .catch((error) => {
      dispatch(deleteFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const categoryActions = {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
}
