import { Navigate, Route, Routes } from 'react-router-dom'
import Manager from '../page/admin/index'
import Dashboard from '../page/admin/dashboard/Dashboard'
import Layout from '../page'
import NotPage from '../page/error/404'
import Base from '../page/user'
import PageHome from '../page/user/PageHome'
import UserManagement from '../page/admin/user'
import AddUser from '../page/admin/user/_components/add'
import EditUser from '../page/admin/user/_components/edit'
import CategoryManagement from '@/page/admin/category'
import AddCategory from '@/page/admin/category/_components/add'
import EditCategory from '@/page/admin/category/_components/edit'
import ProductManagement from '@/page/admin/products'
import AddProduct from '@/page/admin/products/_components/add'
import EditProduct from '@/page/admin/products/_components/edit'
import GuardPage from '@/middleware/GuardPage'
import ProductDetailPage from '../page/user/ProductDetailPage/index'
import CategoryDetailPage from '../page/user/CategoryDetailPage/index'
import PagePolicy from '../page/user/PagePolicy'
import PageTermOfUse from '../page/user/PageTermOfUse'
import PageCopyright from '../page/user/PageCopyright'
import ProductOrdersManagement from '@/page/admin/orders'
import SignUp from '@/page/auth/signup'
import Login from '@/page/auth/login'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='cart' element={<></>} />
            <Route path='chi-tiet-khoa-hoc/:slug' element={<ProductDetailPage />} />
            <Route path='khoa-hoc-theo-chu-de/:slug' element={<CategoryDetailPage />} />
            <Route path='privacy-policy' element={<PagePolicy />} />
            <Route path='term-of-use' element={<PageTermOfUse />} />
            <Route path='copyright' element={<PageCopyright />} />
          </Route>
          <Route element={<GuardPage />}>
            <Route path='admin' element={<Manager />}>
              <Route index element={<Navigate to='/admin/dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />

              <Route path='users' element={<UserManagement />}>
                <Route path='add' element={<AddUser />} />
                <Route path=':id' element={<EditUser />} />
              </Route>

              <Route path='products' element={<ProductManagement />}>
                <Route path='add' element={<AddProduct />} />
                <Route path=':flug' element={<EditProduct />} />
              </Route>

              <Route path='orders' element={<ProductOrdersManagement />}>
                <Route path='add' element={<AddProduct />} />
                <Route path=':flug' element={<EditProduct />} />
              </Route>

              <Route path='categories' element={<CategoryManagement />}>
                <Route path='add' element={<AddCategory />} />
                <Route path=':id' element={<EditCategory />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotPage />} />
      </Routes>
    </>
  )
}
