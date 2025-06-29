import { Navigate, Route, Routes } from 'react-router-dom'
import Manager from '../page/admin/index'
import Dashboard from '../page/admin/dashboard/Dashboard'
import Layout from '../page'
import Billing from '../page/admin/billing'
import NotPage from '../page/error/404'
import Profile from '../page/admin/profile'
import Base from '../page/user'
import PageHome from '../page/user/PageHome'

import UserManagement from '../page/admin/user'
import AddUser from '../page/admin/user/_components/add'
import EditUser from '../page/admin/user/_components/edit'
import ProductDetailPage from '../page/user/ProductDetailPage/index'
import PageCategory from '../page/user/CategoryPage'
import CheckoutPage from '../page/user/PageCheckout/CheckoutPage'
import PageLogin from '../page/user/Auth/PageLogin'
import PageSignUp from '../page/user/Auth/PageSignUp'
import PageSearch from '../page/user/PageSearch/PageSearch'
import AccountPage from '../page/user/AccountPage/AccountPage'
import AccountSavelists from '../page/user/AccountPage/AccountSavelists'
import AccountPass from '../page/user/AccountPage/AccountPass'
import AccountBilling from '../page/user/AccountPage/AccountBilling'
import AccountOrder from '../page/user/AccountPage/AccountOrder'
import BlogPage from '../page/user/BlogPage/BlogPage'
import BlogSingle from '../page/user/BlogPage/BlogSingle'
import PageContact from '../page/user/PageContact/PageContact'
import PageAbout from '../page/user/PageAbout/PageAbout'
import Login from '../page/admin/auth/login'
import AttributeManagement from '../page/admin/attribute'
import PrivilegeManagement from '@/page/admin/privilege'

import BrandManagement from '../page/admin/brand'
import BannerManagement from '@/page/admin/banner'
import AddBanner from '@/page/admin/banner/_components/add'
import EditBanner from '@/page/admin/banner/_components/edit'
import CategoryManagement from '@/page/admin/category'
import AddCategory from '@/page/admin/category/_components/add'
import EditCategory from '@/page/admin/category/_components/edit'
import VoucherManagement from '../page/admin/voucher'
import PostCategoryManagement from '@/page/admin/postCategory'
import AddPostCategory from '@/page/admin/postCategory/_components/add'
import EditPostCategory from '@/page/admin/postCategory/_components/edit'
import PrivilegeUser from '@/page/admin/user/_components/privilege'
import PostsManagement from '@/page/admin/posts'
import AddPosts from '@/page/admin/posts/_components/add'
import EditPosts from '@/page/admin/posts/_components/edit'
import ProductManagement from '@/page/admin/products'
import AddProduct from '@/page/admin/products/_components/add'
import EditProduct from '@/page/admin/products/_components/edit'
import ColorManagement from '@/page/admin/color'
import OrderManagement from '@/page/admin/order'
import AddBrand from '@/page/admin/brand/_components/add'
import EditBrand from '@/page/admin/brand/_components/edit'
import EditOrder from '@/page/admin/order/_components/edit'
import CommonLayout from '@/page/user/AccountPage/CommonLayout'
import DetailOrder from '@/page/user/AccountPage/DetailOrder'
import GuardPage from '@/middleware/GuardPage'
import AddAttribute from '@/page/admin/attribute/_components/attribute/add'
import DetailManagement from '@/page/admin/details'
import AttributeManagementV2 from '@/page/admin/attribute/indexV2'
import AddDetail from '@/page/admin/details/_component/add'
import EditDetail from '@/page/admin/details/_component/edit'
import ProducDetailPage from '../page/user/ProductDetailPage/index'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='' element={<ProductDetailPage />} />
          </Route>
          <Route path='home' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='' element={<ProductDetailPage />} />
          </Route>

          <Route path='' element={<Base />}>
            <Route path='login' element={<PageLogin />} />
            <Route path='signup' element={<PageSignUp />} />

            <Route path='contact' element={<PageContact />} />
            <Route path='about' element={<PageAbout />} />

            <Route path='blog' element={<BlogPage />} />
            <Route path='blog/:slug' element={<BlogSingle />} />

            <Route
              path='account'
              element={
                <GuardPage>
                  <CommonLayout />
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
            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='page-search' element={<PageSearch />} />
            <Route path='category' element={<PageCategory />} />
            <Route path='category/:slug' element={<PageCategory />} />
            <Route path='product-detail/:slug' element={<ProducDetailPage />} />
          </Route>

          <Route path='admin/login' element={<Login />} />

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

            {/* <Route path="categories" element={<CategoryManagement />}>
                  <Route path="add" element={<AddCategory />} />
                  <Route path=":id" element={<EditCategory />} />
               </Route> */}

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
