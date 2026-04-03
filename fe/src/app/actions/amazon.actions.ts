import { Dispatch } from '@reduxjs/toolkit'
import { amazonServices } from '../services'
import {
  fetchedDone,
  getAmazonsSuccessFully,
  getAmazonsSuccessFailure,
  isFetching,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  getRandomAmazonSuccessFully,
  getRandomAmazonSuccessFailure,
  publishSuccessfully,
  publishFailure
} from '../slices/amazon.reducer'

export const getAmazons = (searchValue: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .getAmazons(searchValue)
    .then((res) => {
      dispatch(getAmazonsSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getAmazonsSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getAdminAmazons = (searchValue: string, isPublished: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .getAdminAmazons(searchValue, isPublished)
    .then((res) => {
      dispatch(getAmazonsSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getAmazonsSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getAmazonById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .getAmazonById(id)
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

export const getRandomAmazon = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .getRandomAmazon()
    .then((res) => {
      dispatch(getRandomAmazonSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getRandomAmazonSuccessFailure(error.toString()))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const createAmazon = (data: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .createAmazon(data)
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

export const updateAmazon = (id?: string, data?: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .updateAmazon(id, data)
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

export const publishPost = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .publishPost(id)
    .then((res) => {
      dispatch(publishSuccessfully())
      return res
    })
    .catch((error) => {
      dispatch(publishFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const deleteAmazon = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return amazonServices
    .deleteAmazon(id)
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

export const amazonActions = {
  getAmazons,
  getAdminAmazons,
  getAmazonById,
  getRandomAmazon,
  createAmazon,
  updateAmazon,
  deleteAmazon,
  publishPost
}
