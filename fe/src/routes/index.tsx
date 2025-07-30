import { Navigate, Route, Routes } from 'react-router-dom'
import Manager from '../page/admin/index'
import Dashboard from '../page/admin/dashboard/Dashboard'
import Layout from '../page'
import NotPage from '../page/error/404'
import Profile from '../page/admin/profile'
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
import ProductDetailPage from '../page/user/ProductDetailPage/index';
import CategoryDetailPage from '../page/user/CategoryDetailPage/index';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='cart' element={<></>} />
            <Route path='product-detail/:slug' element={<ProductDetailPage />} />
            <Route path='category-detail/:slug' element={<CategoryDetailPage/>} />
          </Route>

          <Route path='admin' element={<Manager />}>
            <Route index element={<Navigate to='/admin/dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />

            <Route path='users' element={<UserManagement />}>
              <Route path='add' element={<AddUser />} />
              <Route path=':id' element={<EditUser />} />
            </Route>

            <Route path='products' element={<ProductManagement />}>
              <Route path='add' element={<AddProduct />} />
              <Route path=':flug' element={<EditProduct />} />
            </Route>

            <Route path='categories' element={<CategoryManagement />}>
              <Route path='add' element={<AddCategory />} />
              <Route path=':id' element={<EditCategory />} />
              
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotPage />} />
      </Routes>
    </>
  )
}
