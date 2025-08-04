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

export const getCategories = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .getCategories()
    .then((res) => dispatch(getCategoriesSuccessFully(res.data)))
    .catch((error) => dispatch(getCategoriesSuccessFailure(error.toString())))
    .finally(() => dispatch(fetchedDone()))
}

export const getCategoryById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .getCategoryById(id)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdSuccessFailure(error.toString())))
    .finally(() => dispatch(fetchedDone()))
}

export const getCategoryBySlug = (slug: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .getCategoryBySlug(slug)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdSuccessFailure(error.toString())))
    .finally(() => dispatch(fetchedDone()))
}

export const createCategory = (data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .createCategory(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateCategory = (id, data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .updateCategory(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await categoryServices
    .deleteCategory(id)
    .then(() => dispatch(deleteSuccessfully()))
    .catch(() => dispatch(deleteFailure()))
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
