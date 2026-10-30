import { IBlog, IPagination } from '@/common/types.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  code: '',
  message: '',
  error_message: '',
  data: <IBlog>(<unknown>null),
  dataList: <IBlog[]>(<unknown>null),
  trendingBlogs: <IBlog[]>(<unknown>null),
  newBlogs: <IBlog[]>(<unknown>null),
  trendingTechnologyBlogs: <IBlog[]>(<unknown>null),
  newTechnologyBlogs: <IBlog[]>(<unknown>null),
  trendingLifeStyleBlogs: <IBlog[]>(<unknown>null),
  newLifeStyleBlogs: <IBlog[]>(<unknown>null),
  trendingTravelBlogs: <IBlog[]>(<unknown>null),
  newTravelBlogs: <IBlog[]>(<unknown>null),
  trendingWorldBlogs: <IBlog[]>(<unknown>null),
  newWorldBlogs: <IBlog[]>(<unknown>null),
  trendingEducationBlogs: <IBlog[]>(<unknown>null),
  newEducationBlogs: <IBlog[]>(<unknown>null),
  trendingScienceBlogs: <IBlog[]>(<unknown>null),
  newScienceBlogs: <IBlog[]>(<unknown>null),
  pagination: <IPagination>(<unknown>null)
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    reset: (state) => {
      state.isLoading = true
      state.code = ''
      state.message = ''
      state.error_message = ''
      state.data = null as unknown as IBlog
      state.dataList = []
      state.trendingBlogs = []
      state.newBlogs = []
      state.trendingTechnologyBlogs = []
      state.newTechnologyBlogs = []
      state.trendingLifeStyleBlogs = []
      state.newLifeStyleBlogs = []
      state.trendingTravelBlogs = []
      state.newTravelBlogs = []
      state.trendingWorldBlogs = []
      state.newWorldBlogs = []
      state.trendingEducationBlogs = []
      state.newEducationBlogs = []
      state.trendingScienceBlogs = []
      state.newScienceBlogs = []
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    getBlogSuccessFully: (state, { payload }) => {
      state.trendingBlogs = payload.data.trendingBlogs
      state.newBlogs = payload.data.newBlogs
      state.trendingTechnologyBlogs = payload.data.trendingTechnologyBlogs
      state.newTechnologyBlogs = payload.data.newTechnologyBlogs
      state.trendingLifeStyleBlogs = payload.data.trendingLifeStyleBlogs
      state.newLifeStyleBlogs = payload.data.newLifeStyleBlogs
      state.trendingTravelBlogs = payload.data.trendingTravelBlogs
      state.newTravelBlogs = payload.data.newTravelBlogs
      state.trendingWorldBlogs = payload.data.trendingWorldBlogs
      state.newWorldBlogs = payload.data.newWorldBlogs
      state.trendingEducationBlogs = payload.data.trendingEducationBlogs
      state.newEducationBlogs = payload.data.newEducationBlogs
      state.trendingScienceBlogs = payload.data.trendingScienceBlogs
      state.newScienceBlogs = payload.data.newScienceBlogs
      state.isLoading = false
    },
    getBlogSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    getAdminBlogSuccessFully: (state, { payload }) => {
      state.dataList = payload.data.content
      state.pagination = {
        totalElements: payload.data.totalElements,
        totalPages: payload.data.totalPages,
        pageNumber: payload.data.number,
        pageSize: payload.data.size,
        isFirst: payload.data.first,
        isLast: payload.data.last
      }
      state.isLoading = false
    },
    getAdminBlogSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    getByIdSuccessFully: (state, { payload }) => {
      state.data = payload.data
      state.isLoading = false
    },
    getByIdSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    getBySlugSuccessFully: (state, { payload }) => {
      state.data = payload.data.blog
      state.relatedPosts = payload.data.relatedBlogs
      state.recommendList = payload.data.blogRecommendList
      state.isLoading = false
    },
    getBySlugSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    getByTypeSuccessFully: (state, { payload }) => {
      state.recommendList = payload.data.blogRecommendList
      state.dataList = payload.data.blogList
      state.isLoading = false
    },
    getByTypeSuccessFailure: (state, { payload }) => {
      state.message = payload
      state.isLoading = false
    },
    createSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Article Created Successfully'
      state.isLoading = false
    },
    createFailure: (state) => {
      state.error_message = 'Failed to Create Article'
      state.isLoading = false
    },
    updateSuccessfully: (state, { payload }) => {
      state.data = payload.data
      state.message = 'Article Updated Successfully'
      state.isLoading = false
    },
    updateFailure: (state) => {
      state.error_message = 'Failed to Update Article'
      state.isLoading = false
    },
    deleteSuccessfully: (state) => {
      state.message = 'Article Deleted Successfully'
      state.isLoading = false
    },
    deleteFailure: (state) => {
      state.error_message = 'Failed to Delete Article'
      state.isLoading = false
    }
  }
})

export const {
  isFetching,
  reset,
  fetchedDone,
  getBlogSuccessFully,
  getBlogSuccessFailure,
  getAdminBlogSuccessFully,
  getAdminBlogSuccessFailure,
  getByIdSuccessFailure,
  getByIdSuccessFully,
  getBySlugSuccessFailure,
  getBySlugSuccessFully,
  getByTypeSuccessFailure,
  getByTypeSuccessFully,
  createFailure,
  createSuccessfully,
  updateFailure,
  updateSuccessfully,
  deleteFailure,
  deleteSuccessfully
} = blogSlice.actions
export default blogSlice.reducer
