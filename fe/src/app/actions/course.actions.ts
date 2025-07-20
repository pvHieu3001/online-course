import { Dispatch } from '@reduxjs/toolkit'
import { courseConstants } from '../../constants'
import { courseServices } from '../services/course.service'
import {
  isFetching,
  fetchedDone,
  getCoursesSuccessFully,
} from '../slices/course.reducer'

export const getCourses = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())

  await courseServices
    .getCourses()
    .then((res) => dispatch(getCoursesSuccessFully(res.data)))
    .catch((error) =>
      dispatch({
        type: courseConstants.GET_COURSES_FAILURE,
        payload: {
          code: 'ERROR',
          message: error.toString()
        }
      })
    )
    .finally(() => dispatch(fetchedDone()))
}

export const courseActions = {
  getCourses
}
