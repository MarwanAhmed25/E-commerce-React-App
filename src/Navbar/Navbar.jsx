import { Link, NavLink } from "react-router-dom"
import './navbar.css'
import { CartData, UserLogin } from "../Context/Context";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


export default function Navbar(){
    
    let {userToken, setUserData} = useContext(UserLogin);
    let {cartNumber} = useContext(CartData);

    function Logout(){
        setUserData(null, "");  
        localStorage.removeItem('token');      
        localStorage.removeItem('username');      
    }

    
    function toggleNav(){
        let x = document.getElementById("navbar-sticky");
        x.classList.toggle('hidden');
    }

    return <>
        

        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <FontAwesomeIcon icon={faCartShopping} className="text-blue-600" style={{fontSize:"24px"}}/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </NavLink>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            
            {userToken?
            <>
                <button class="font-sans text-black hover:text-gray-700">
                    <Link to="cart" role="button" className="relative flex  mx-4">
                    <FontAwesomeIcon icon={faCartShopping} style={{fontSize:"24px"}} className=""/>
                        <span class="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartNumber}
                        </span>
                    </Link>
                </button>
                <button onClick={Logout} class="font-sans block mx-5 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                    Logout
                </button>
            </>
            
            : 
            <>
                <button class="font-sans block mx-3 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                    <Link to="/login">Login</Link>
                </button>
                <button class="font-sans block mx-3 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                    <Link to="/register">Register</Link>
                </button>
            </>
            }
            <button data-collapse-toggle="navbar-sticky" onClick={toggleNav} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <NavLink to="" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Home</NavLink>
            </li>
            <li>
                <NavLink to="/products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
            </li>
            <li>
                <NavLink to="/Categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
            </li>
            <li>
                <NavLink to="/brands" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
            </li>
            <li>
                <NavLink to="/cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
            </li>
            <li>
                <NavLink to="/wishlist" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Wishlist</NavLink>
            </li>
            </ul>
        </div>
        </div>
        </nav>

    </>
}