import { configureStore } from '@reduxjs/toolkit'
import webReducer from './slices/web.reducer'
import categoryReducer from './slices/category.reducer'
import userReducer from './slices/user.reducer'
import courseReducer from './slices/course.reducer'
import alertReducer from './slices/alert.reducer'
import orderSlice from './slices/order.reducer'
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer,
    web: webReducer,
    alert: alertReducer,
    course: courseReducer,
    order: orderSlice
  }
})
