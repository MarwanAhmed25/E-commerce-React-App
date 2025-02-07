import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Products from './Products/Products'
import Notfound from './Notfound/Notfound'
import ProductDetail from './ProductDetail/ProductDetail'
import Category from './Category/Category'
import Brand from './Brand/Brand'
import UserLoginProvider, { CartDataProvider } from './Context/Context'
import Login from './Login/Login'
import Register from './Register/Register'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import ForgetPassword from './ForgetPasswprd/ForgetPassword'
import ResetCode from './ResetCode/ResetCode'
import ResetPassword from './RestPassword/RestPassword'
import Cart from './Cart/Cart'

let router = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {path:"", element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:"login", element: <Login/>},
    {path:"forget-password", element: <ForgetPassword/>},
    {path:"reset-code", element: <ResetCode/>},
    {path:"reset-password", element: <ResetPassword/>},
    {path:"register", element: <Register/>},
    {path:"categories", element: <ProtectedRoute><Category/></ProtectedRoute>},
    {path:"brands", element: <ProtectedRoute><Brand/></ProtectedRoute>},
    {path:"products", element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:"products/:id", element: <ProtectedRoute><ProductDetail /></ProtectedRoute>},
    {path:"cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path:'*', element:<Notfound />},
  ]},
  
])

function App() {
  UserLoginProvider
  return (
    <>
      <UserLoginProvider>   
        <CartDataProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartDataProvider> 
      </UserLoginProvider>
    </>
  )
}

export default App
