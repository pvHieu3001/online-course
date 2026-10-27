import { Navigate, Route, Routes } from 'react-router-dom'
import Manager from '../page/admin/index'
import Dashboard from '../page/admin/dashboard/Dashboard'
import Layout from '../page'
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
import BookDetailPage from '../page/user/PageBook/detail/index'
import CategoryDetailPage from '../page/user/CategoryDetailPage/index'
import PageBlog from '../page/user/PageBlog'
import ProductOrdersManagement from '@/page/admin/orders'
import SignUp from '@/page/auth/signup'
import Login from '@/page/auth/login'
import BlogManagement from '@/page/admin/blogs'
import AddBlog from '@/page/admin/blogs/_components/add'
import EditBlog from '@/page/admin/blogs/_components/edit'
import PageSearch from '@/page/user/PageSearch'
import NetworkErrorPage from '@/page/error/NetworkErrorPage'
import NotFoundPage from '@/page/error/NotFoundPage'
import BlogDetailPage from '@/page/user/BlogDetailPage'
import AffiliateManagement from '@/page/admin/affiliate'
import AddAffiliate from '@/page/admin/affiliate/_components/add'
import EditAffiliate from '@/page/admin/affiliate/_components/edit'
import AccountManagement from '@/page/admin/account'
import PageBlogSearch from '@/page/user/PageBlogSearch'
import AmazonManagement from '@/page/admin/amazon'
import AddAmazon from '@/page/admin/amazon/_components/add'
import EditAmazon from '@/page/admin/amazon/_components/edit'
import PageBook from '@/page/user/PageBook'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='' element={<Base />}>
            <Route index element={<PageHome />} />
            <Route path='search' element={<PageSearch />} />
            <Route path='search-blog' element={<PageBlogSearch />} />
            <Route path='books' element={<PageBook />} />
            <Route path='book-detail/:slug' element={<BookDetailPage />} />
            <Route path='book-category/:slug' element={<CategoryDetailPage />} />
            <Route path='blogs' element={<PageBlog />} />
            <Route path='blog/:slug' element={<BlogDetailPage />} />
          </Route>
          <Route element={<GuardPage />}>
            <Route path='admin' element={<Manager />}>
              <Route index element={<Navigate to='/admin/dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />

              <Route path='users' element={<UserManagement />}>
                <Route path='add' element={<AddUser />} />
                <Route path=':id' element={<EditUser />} />
              </Route>

              <Route path='books' element={<ProductManagement />}>
                <Route path='add' element={<AddProduct />} />
                <Route path=':slug' element={<EditProduct />} />
              </Route>

              <Route path='orders' element={<ProductOrdersManagement />}>
                <Route path='add' element={<AddProduct />} />
                <Route path=':slug' element={<EditProduct />} />
              </Route>

              <Route path='book-categories' element={<CategoryManagement />}>
                <Route path='add' element={<AddCategory />} />
                <Route path=':id' element={<EditCategory />} />
              </Route>

              <Route path='blogs' element={<BlogManagement />}>
                <Route path='add' element={<AddBlog />} />
                <Route path=':id' element={<EditBlog />} />
              </Route>

              <Route path='shopee' element={<AffiliateManagement />}>
                <Route path='add' element={<AddAffiliate />} />
                <Route path=':id' element={<EditAffiliate />} />
              </Route>

              <Route path='amazon' element={<AmazonManagement />}>
                <Route path='add' element={<AddAmazon />} />
                <Route path=':id' element={<EditAmazon />} />
              </Route>
              <Route path='account' element={<AccountManagement />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/network-error' element={<NetworkErrorPage />} />
      </Routes>
    </>
  )
}
