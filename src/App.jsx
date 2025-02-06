import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Products from './Products/Products'
import Notfound from './Notfound/Notfound'

let router = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {path:"", element: <Home/>},
    {path:"products", element: <Products/>},
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
