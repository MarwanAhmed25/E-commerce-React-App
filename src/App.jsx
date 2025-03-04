import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Products from './Products/Products'
import Notfound from './Notfound/Notfound'
import ProductDetail from './ProductDetail/ProductDetail'
import Category from './Category/Category'
import Brand from './Brand/Brand'
import UserLoginProvider, { CartDataProvider, WishlistDataProvider } from './Context/Context'
import Login from './Login/Login'
import Register from './Register/Register'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import ForgetPassword from './ForgetPasswprd/ForgetPassword'
import ResetCode from './ResetCode/ResetCode'
import ResetPassword from './RestPassword/RestPassword'
import Cart from './Cart/Cart'
import Checkout from './Checkout/Checkout'
import Order from './Order/Order'
import Wishlist from './Wishlist/Wishlist';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

let router = createHashRouter([
  {path:'/', element:<Layout/>, children:[
    {path:"", element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:"login", element: <Login/>},
    {path:"forget-password", element: <ForgetPassword/>},
    {path:"reset-code", element: <ResetCode/>},
    {path:"reset-password", element: <ResetPassword/>},
    {path:"register", element: <Register/>},
    {path:"categories", element: <ProtectedRoute><Category/></ProtectedRoute>},
    {path:"wishlist", element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:"brands", element: <ProtectedRoute><Brand/></ProtectedRoute>},
    {path:"products", element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:"products/:id", element: <ProtectedRoute><ProductDetail /></ProtectedRoute>},
    {path:"cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path:"checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute>},
    {path:"allorders", element: <ProtectedRoute><Order /></ProtectedRoute>},
    {path:"*", element: <Notfound></Notfound>},
    
  ]},
  
])

function App() {
  
  let queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <UserLoginProvider>   
        <CartDataProvider>
          <WishlistDataProvider>
          <RouterProvider router={router}>
          </RouterProvider>
          <ReactQueryDevtools />
          <Toaster />
          </WishlistDataProvider>
        </CartDataProvider> 
      </UserLoginProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
