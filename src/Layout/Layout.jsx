import { Outlet } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


export default function Layout(){


    return <>

    <Navbar></Navbar>
    <div className="my-24">
        <Outlet></Outlet>
    </div>
    

    <Footer></Footer>
    
    </>
}