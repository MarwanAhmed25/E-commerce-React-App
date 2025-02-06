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

let router = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {path:"", element: <Home/>},
    {path:"categories", element: <Category/>},
    {path:"brands", element: <Brand/>},
    {path:"products", element: <Products/>},
    {path:"products/:id", element: <ProductDetail />},
    {path:'*', element:<Notfound />},
  ]},
  
])

function App() {

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    
    </>
  )
}

export default App
