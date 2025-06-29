import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import webReducer from './webSlice'
import { categoryAttributesApi } from '../page/admin/attribute/_components/category_attribute/CategoryAttributeEndpoints'
import { attributesApi } from '../page/admin/attribute/_components/attribute/AttributeEndpoints'
import { addressApi } from '../utils/addressRTKQuery'

import bannerSlice from './slices/bannerSlice'
import { valueAttributesApi } from '../page/admin/attribute/_components/value_attribute/ValueAttributeEndPoints'
import postCategorySlice from './slices/postCategorySlice'
import { privilegeGroupApi } from '@/page/admin/privilege/_components/privilege_group/PrivilegeGroupEndpoint'
import { privilegeApi } from '@/page/admin/privilege/_components/privilege/PrivilegeEndpoint'
import { privilegeUsersApi } from '@/page/admin/user/PrivilegeUsersEndpoints'
import postSlice from './slices/postSlice'
import authSlice from './slices/authSlide'
import { categoriesApi } from '@/page/admin/category/CategoryEndpoints'
import { productsApi } from '@/services/ProductsEndpoints'
import { brandsApi } from '@/page/admin/brand/BrandEndpoints'
import { bannersApi } from '@/page/admin/banner/BannerEndpoints'
import { CartsApi } from '@/services/CartEndPoinst'
import { ordersApi } from '@/services/OrderEndPoints'
import cartSlide from './slices/cartSlide'
import { voucherApi } from '@/page/admin/voucher/VoucherEndpoint'
import { CommentsApi } from '@/services/CommentEndPoints'
import { detailsApi } from '@/page/admin/details/_component/DetailsEndpoints'
export const store = configureStore({
  reducer: {
    web: webReducer,
    banner: bannerSlice,
    //category: categorySlice,
    postCategory: postCategorySlice,
    post: postSlice,
    auth: authSlice,
    carts: cartSlide,
    [addressApi.reducerPath]: addressApi.reducer,
    [attributesApi.reducerPath]: attributesApi.reducer,
    [categoryAttributesApi.reducerPath]: categoryAttributesApi.reducer,
    [valueAttributesApi.reducerPath]: valueAttributesApi.reducer,
    [privilegeGroupApi.reducerPath]: privilegeGroupApi.reducer,
    [privilegeApi.reducerPath]: privilegeApi.reducer,
    [privilegeUsersApi.reducerPath]: privilegeUsersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [bannersApi.reducerPath]: bannersApi.reducer,
    [CartsApi.reducerPath]: CartsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  middleware: (
    getDefaultMiddleware //attributesApi.middleware
  ) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      addressApi.middleware,
      attributesApi.middleware,
      categoryAttributesApi.middleware,
      valueAttributesApi.middleware,
      privilegeGroupApi.middleware,
      privilegeApi.middleware,
      privilegeUsersApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      brandsApi.middleware,
      bannersApi.middleware,
      CartsApi.middleware,
      ordersApi.middleware,
      voucherApi.middleware,
      CommentsApi.middleware,
      detailsApi.middleware
    )
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
