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
  getByIdSuccessFully
} from '../slices/course.reducer'

export const getCourses = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .getCourses()
    .then((res) => dispatch(getCoursesSuccessFully(res.data)))
    .catch((error) => dispatch(getCoursesFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const getCourseById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .getCourseById(id)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const createCourse = (data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .createCourse(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateCourse = (id, data) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .updateCourse(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteCourse = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .deleteCourse(id)
    .then(() => dispatch(deleteSuccessfully()))
    .catch(() => dispatch(deleteFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const courseActions = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
}
