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
import PrivilegeUser from '@/page/admin/user/_components/privilege'
import ProductManagement from '@/page/admin/products'
import AddProduct from '@/page/admin/products/_components/add'
import EditProduct from '@/page/admin/products/_components/edit'
import GuardPage from '@/middleware/GuardPage'
import DetailManagement from '@/page/admin/details'
import AddDetail from '@/page/admin/details/_component/add'
import EditDetail from '@/page/admin/details/_component/edit'
import ProductDetailPage from '../page/user/ProductDetailPage/index'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='cart' element={<></>} />
            <Route path='product-detail/:slug' element={<ProductDetailPage />} />
          </Route>

          <Route path='admin' element={<Manager />}>
            <Route index element={<Navigate to='/admin/dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />

            <Route path='users' element={<UserManagement />}>
              <Route path='add' element={<AddUser />} />
              <Route path='privilege/:id' element={<PrivilegeUser />} />
              <Route path=':id' element={<EditUser />} />
            </Route>

            <Route path='products' element={<ProductManagement />}>
              <Route path='add' element={<AddProduct />} />
              <Route path=':flug' element={<EditProduct />} />
            </Route>

            <Route path='details' element={<DetailManagement />}>
              <Route path='add' element={<AddDetail />} />
              <Route path=':id' element={<EditDetail />} />
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
