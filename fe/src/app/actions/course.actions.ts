import { Dispatch } from '@reduxjs/toolkit'
import { courseServices } from '../services/course.service'
import {
  isFetching,
  fetchedDone,
  getCoursesSuccessFully,
  getCoursesFailure,
  deleteSuccessfully,
  deleteFailure,
  updateSuccessfully,
  updateFailure,
  createFailure,
  createSuccessfully,
  getByIdFailure,
  getByIdSuccessFully,
  getCoursesByCategorySuccessFully,
  getCoursesByCategoryFailure
} from '../slices/course.reducer'

export const getCourses = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .getCourses()
    .then((res) => {
      dispatch(getCoursesSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getCoursesFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getCourseById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .getCourseById(id)
    .then((res) => {
      dispatch(getByIdSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getByIdFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const createCourse = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .createCourse(data)
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

export const updateCourse = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .updateCourse(id, data)
    .then((res) => {
      dispatch(updateSuccessfully(res.data))
      return res
    })
    .catch((err) => {
      dispatch(updateFailure())
      throw err
    })
    .finally(() => dispatch(fetchedDone()))
}

export const deleteCourse = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .deleteCourse(id)
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

export const getCoursesByCategory = (categoryId: number) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return courseServices
    .getCoursesByCategory(categoryId)
    .then((res) => {
      dispatch(getCoursesByCategorySuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getCoursesByCategoryFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const courseActions = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByCategory
}
