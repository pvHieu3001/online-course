import { configureStore } from '@reduxjs/toolkit'
import webReducer from './slices/web.slice'
import categoryReducer from './slices/category.slice'
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    web: webReducer
  }
})
