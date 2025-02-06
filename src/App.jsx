import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Products from './Products/Products'

let router = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {path:"", element: <Home/>},
    {path:"products", element: <Products/>}
  ]}
])

function App() {

  return (
    <>
    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">Badge</span>

    <RouterProvider router={router}></RouterProvider>
    
    </>
  )
}

export default App
