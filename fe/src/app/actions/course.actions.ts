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

  courseServices
    .getCourses()
    .then((res) => dispatch(getCoursesSuccessFully(res.data)))
    .catch((error) => dispatch(getCoursesFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const getCourseById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  courseServices
    .getCourseById(id)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const createCourse = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  courseServices
    .createCourse(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateCourse = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  courseServices
    .updateCourse(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteCourse = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  courseServices
    .deleteCourse(id)
    .then(() => dispatch(deleteSuccessfully()))
    .catch(() => dispatch(deleteFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const getCoursesByCategory = (categoryId: number) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  courseServices
    .getCoursesByCategory(categoryId)
    .then((res) => dispatch(getCoursesByCategorySuccessFully(res.data)))
    .catch((error) => dispatch(getCoursesByCategoryFailure(error)))
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
