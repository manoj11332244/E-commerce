import { createBrowserRouter } from 'react-router-dom'
import { Navigate, RouterProvider } from 'react-router'
import Layout from './components/auth/Layout'
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './page/admin-view/Dashboard'
import AdminProduct from './page/admin-view/Product'
import AdminFeature from './page/admin-view/Feature'
import AdminOrder from './page/admin-view/Order'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './page/not-Found'
import ShoppingHome from './page/shopping-view/Home'
import ShoppingListing from './page/shopping-view/Listing'
import ShoppingCheckout from './page/shopping-view/Checkout'
import ShoppingAccount from './page/shopping-view/Account'
import CheckAuth from './components/common/Check-auth'
import UnAuthPage from './page/unauth-page'




function App() {

  const isAuthenicated=false;
  const user=null;

//   const router = createBrowserRouter([
//     {
//       path:'/',
//       element:<CheckAuth isAuthenicated={isAuthenicated} user={user}></CheckAuth>
//     },
//   {
//     path: '/auth',
//     element: <CheckAuth isAuthenicated={isAuthenicated} user={user}><Layout /></CheckAuth>,
//     children: [
//       {
//         path: '/auth/login',
//         element: <Login />
//       },
//       {
//         path: '/auth/signup',
//         element: <Signup />
//       }
//     ]
//   },
//   {
//     path: '/admin',
//     element: <CheckAuth isAuthenicated={isAuthenicated} user={user}><AdminLayout /></CheckAuth>,
//     children: [
//       {
//         path: '/admin/dashboard',
//         element: <AdminDashboard />
//       },
//       {
//         path: '/admin/products',
//         element: <AdminProduct />
//       },
//       {
//         path: '/admin/features',
//         element: <AdminFeature />
//       },
//       {
//         path: '/admin/orders',
//         element: <AdminOrder />
//       }
//     ]
//   },
//   {
//     path: '/shop',
//     element: <CheckAuth isAuthenicated={isAuthenicated} user={user}><ShoppingLayout /></CheckAuth>,
//     children: [
//       {
//         path: '/shop/home',
//         element:<ShoppingHome/>
//       },
//       {
//         path:'/shop/listing',
//         element:<ShoppingListing/>
//       },
//       {
//         path:'/shop/checkout',
//         element:<ShoppingCheckout/>
//       },
//       {
//         path:'/shop/account',
//         element:<ShoppingAccount/>
//       }
//     ]
//   },
//   {
//     path: "*",
//     element: <NotFound />
//   }
// ])

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={isAuthenicated ? (user.role === 'admin' ? '/admin/dashboard' : '/shop/home') : '/auth/login'} />
  },
  {
    path: '/auth',
    element: <CheckAuth isAuthenticated={isAuthenicated} user={user}><Layout /></CheckAuth>,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> }
    ]
  },
  {
    path: '/admin',
    element: <CheckAuth isAuthenticated={isAuthenicated} user={user}><AdminLayout /></CheckAuth>,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'products', element: <AdminProduct /> },
      { path: 'features', element: <AdminFeature /> },
      { path: 'orders', element: <AdminOrder /> }
    ]
  },
  {
    path: '/shop',
    element: <CheckAuth isAuthenticated={isAuthenicated} user={user}><ShoppingLayout /></CheckAuth>,
    children: [
      { path: 'home', element: <ShoppingHome /> },
      { path: 'listing', element: <ShoppingListing /> },
      { path: 'checkout', element: <ShoppingCheckout /> },
      { path: 'account', element: <ShoppingAccount /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  },{
    path:'/unauth-page',
    element:<UnAuthPage/>
  }
]);


  return (
    <div className='bg-white flex flex-col overflow-hidden'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
