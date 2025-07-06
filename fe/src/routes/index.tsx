import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import Manager from '../page/admin/index'
import Layout from '../page'
import NotPage from '../page/error/404'
import Base from '../page/user'
import GuardPage from '@/middleware/GuardPage'

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('../page/admin/dashboard/Dashboard'))
const Billing = React.lazy(() => import('../page/admin/billing'))
const Profile = React.lazy(() => import('../page/admin/profile'))
const PageHome = React.lazy(() => import('../page/user/PageHome'))

const UserManagement = React.lazy(() => import('../page/admin/user'))
const AddUser = React.lazy(() => import('../page/admin/user/_components/add'))
const EditUser = React.lazy(() => import('../page/admin/user/_components/edit'))
const PageCategory = React.lazy(() => import('../page/user/CategoryPage'))
const CheckoutPage = React.lazy(() => import('../page/user/PageCheckout/CheckoutPage'))
const PageLogin = React.lazy(() => import('../page/user/Auth'))
const PageSignUp = React.lazy(() => import('../page/user/Auth/PageSignUp'))
const PageSearch = React.lazy(() => import('../page/user/PageSearch/PageSearch'))
const AccountPage = React.lazy(() => import('../page/user/AccountPage/AccountPage'))
const AccountSavelists = React.lazy(() => import('../page/user/AccountPage/AccountSavelists'))
const AccountPass = React.lazy(() => import('../page/user/AccountPage/AccountPass'))
const AccountBilling = React.lazy(() => import('../page/user/AccountPage/AccountBilling'))
const AccountOrder = React.lazy(() => import('../page/user/AccountPage/AccountOrder'))
const BlogPage = React.lazy(() => import('../page/user/BlogPage/BlogPage'))
const BlogSingle = React.lazy(() => import('../page/user/BlogPage/BlogSingle'))
const PageContact = React.lazy(() => import('../page/user/PageContact/PageContact'))
const PageAbout = React.lazy(() => import('../page/user/PageAbout/PageAbout'))
const Login = React.lazy(() => import('../page/admin/auth/login'))
const AttributeManagement = React.lazy(() => import('../page/admin/attribute'))
const PrivilegeManagement = React.lazy(() => import('@/page/admin/privilege'))

const BrandManagement = React.lazy(() => import('../page/admin/brand'))
const BannerManagement = React.lazy(() => import('@/page/admin/banner'))
const AddBanner = React.lazy(() => import('@/page/admin/banner/_components/add'))
const EditBanner = React.lazy(() => import('@/page/admin/banner/_components/edit'))
const CategoryManagement = React.lazy(() => import('@/page/admin/category'))
const AddCategory = React.lazy(() => import('@/page/admin/category/_components/add'))
const EditCategory = React.lazy(() => import('@/page/admin/category/_components/edit'))
const VoucherManagement = React.lazy(() => import('../page/admin/voucher'))
const PostCategoryManagement = React.lazy(() => import('@/page/admin/postCategory'))
const AddPostCategory = React.lazy(() => import('@/page/admin/postCategory/_components/add'))
const EditPostCategory = React.lazy(() => import('@/page/admin/postCategory/_components/edit'))
const PrivilegeUser = React.lazy(() => import('@/page/admin/user/_components/privilege'))
const PostsManagement = React.lazy(() => import('@/page/admin/posts'))
const AddPosts = React.lazy(() => import('@/page/admin/posts/_components/add'))
const EditPosts = React.lazy(() => import('@/page/admin/posts/_components/edit'))
const ProductManagement = React.lazy(() => import('@/page/admin/products'))
const AddProduct = React.lazy(() => import('@/page/admin/products/_components/add'))
const EditProduct = React.lazy(() => import('@/page/admin/products/_components/edit'))
const ColorManagement = React.lazy(() => import('@/page/admin/color'))
const OrderManagement = React.lazy(() => import('@/page/admin/order'))
const AddBrand = React.lazy(() => import('@/page/admin/brand/_components/add'))
const EditBrand = React.lazy(() => import('@/page/admin/brand/_components/edit'))
const EditOrder = React.lazy(() => import('@/page/admin/order/_components/edit'))
const CommonLayout = React.lazy(() => import('@/page/user/AccountPage/CommonLayout'))
const DetailOrder = React.lazy(() => import('@/page/user/AccountPage/DetailOrder'))
const AddAttribute = React.lazy(() => import('@/page/admin/attribute/_components/attribute/add'))
const DetailManagement = React.lazy(() => import('@/page/admin/details'))
const AttributeManagementV2 = React.lazy(() => import('@/page/admin/attribute/indexV2'))
const AddDetail = React.lazy(() => import('@/page/admin/details/_component/add'))
const EditDetail = React.lazy(() => import('@/page/admin/details/_component/edit'))
const ProductDetailPage = React.lazy(() => import('../page/user/ProductDetailPage/index'))
const PageAllProduct = React.lazy(() => import('@/page/user/PageAllProduct'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spin size="large" />
  </div>
)

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Base />}>
            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageHome />
              </Suspense>
            } />
            <Route path='login' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageLogin />
              </Suspense>
            } />
            <Route path='signup' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageSignUp />
              </Suspense>
            } />

            <Route path='contact' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageContact />
              </Suspense>
            } />
            <Route path='about' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageAbout />
              </Suspense>
            } />

            <Route path='blog' element={
              <Suspense fallback={<LoadingSpinner />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path='blog/:slug' element={
              <Suspense fallback={<LoadingSpinner />}>
                <BlogSingle />
              </Suspense>
            } />

            <Route
              path='account'
              element={
                <GuardPage>
                  <Suspense fallback={<LoadingSpinner />}>
                    <CommonLayout />
                  </Suspense>
                </GuardPage>
              }
            >
              <Route index element={<AccountPage />} />
              <Route path='savelists' element={<AccountSavelists />} />
              <Route path='change-password' element={<AccountPass />} />
              <Route path='billing' element={<AccountBilling />} />
              <Route path='my-order'>
                <Route index element={<AccountOrder />} />
                <Route path='detail/:id' element={<DetailOrder />} />
              </Route>
            </Route>
            <Route path='cart' element={<></>} />
            <Route path='checkout' element={
              <Suspense fallback={<LoadingSpinner />}>
                <CheckoutPage />
              </Suspense>
            } />
            <Route path='page-search' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageSearch />
              </Suspense>
            } />
            <Route path='category' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageCategory />
              </Suspense>
            } />
            <Route path='category/:slug' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageCategory />
              </Suspense>
            } />
            <Route path='product-detail/:slug' element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetailPage />
              </Suspense>
            } />
            <Route path='tat-ca-san-pham' element={
              <Suspense fallback={<LoadingSpinner />}>
                <PageAllProduct />
              </Suspense>
            } />
          </Route>

          <Route path='admin/login' element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          } />

          <Route path='admin' element={<Manager />}>
            <Route index element={<Navigate to='/admin/dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='billing' element={<Billing />} />
            <Route path='profile' element={<Profile />} />

            <Route path='users' element={<UserManagement />}>
              <Route path='add' element={<AddUser />} />
              <Route path='privilege/:id' element={<PrivilegeUser />} />
              <Route path=':id' element={<EditUser />} />
            </Route>

            <Route path='order' element={<OrderManagement />}>
              <Route path='add' element={<AddProduct />} />
            </Route>
            <Route path='order/:id' element={<EditOrder />} />

            <Route path='products' element={<ProductManagement />}>
              <Route path='add' element={<AddProduct />} />
              <Route path=':flug' element={<EditProduct />} />
            </Route>

            <Route path='attributes-product' element={<AttributeManagement />}></Route>
            <Route path='details' element={<DetailManagement />}>
              <Route path='add' element={<AddDetail />} />
              <Route path=':id' element={<EditDetail />} />
            </Route>

            <Route path='voucher' element={<VoucherManagement />}></Route>
            <Route path='color' element={<ColorManagement />}></Route>

            <Route path='banner' element={<BannerManagement />}>
              <Route path='add' element={<AddBanner />} />
              <Route path=':id' element={<EditBanner />} />
            </Route>

            <Route path='privilege' element={<PrivilegeManagement />} />

            <Route path='brand' element={<BrandManagement />}>
              <Route path='add' element={<AddBrand />} />
              <Route path=':id' element={<EditBrand />} />
            </Route>

            <Route path='categories' element={<CategoryManagement />}>
              <Route path='add' element={<AddCategory />} />
              <Route path=':id' element={<EditCategory />} />
            </Route>

            <Route path='attributes' element={<AttributeManagementV2 />}>
              <Route path='add' element={<AddAttribute />} />
            </Route>

            <Route path='post-categories' element={<PostCategoryManagement />}>
              <Route path='add' element={<AddPostCategory />} />
              <Route path=':id' element={<EditPostCategory />} />
            </Route>

            <Route path='posts' element={<PostsManagement />}>
              <Route path='add' element={<AddPosts />} />
              <Route path=':id' element={<EditPosts />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotPage />} />
      </Routes>
    </>
  )
}
