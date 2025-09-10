import { Dispatch } from '@reduxjs/toolkit'
import { tagServices } from '../services'
import {
  fetchedDone,
  getTagSuccessFully,
  getTagSuccessFailure,
  isFetching,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  getByIdSuccessFailure,
  getByIdSuccessFully,
} from '../slices/tag.reducer'

export const getTags = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return tagServices
    .getTags()
    .then((res) => {
      dispatch(getTagSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getTagSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getTagById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return tagServices
    .getTagById(id)
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
export const createTag = (data: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return tagServices
    .createTag(data)
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

export const updateTag = (id?: string, data?: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return tagServices
    .updateTag(id, data)
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

export const deleteTag = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return tagServices
    .deleteTag(id)
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

export const tagActions = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
}
