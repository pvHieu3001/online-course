import { createSelector } from 'reselect'

export const selectCourseData = createSelector(
  (state: any) => state.course?.data?.getCourseDto || [],
  (courses) => courses
)

export const selectCategoryData = createSelector(
  (state: any) => state.category?.data||[],
  (data) => Array.isArray(data) ? data : []
)

