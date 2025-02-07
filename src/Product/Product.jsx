import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CartData } from "../Context/Context";


export default function Product({product}){

    let {pathname} = useLocation()
    let {addToCart} = useContext(CartData);
    

    return <>
                
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5" key={product.id}>
            <div className="max-w-sm  sm:mx-auto md:m-2 bg-white hover:border border-gray-200 rounded-lg hover:shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={pathname.includes('products')?`${product.id}` : `products/${product.id}`}>
                    <img className="p-8 rounded-t-lg" src={product.imageCover} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                
                <h5 className="text-lg font-semibold tracking-tight text-blue-900 dark:text-white">{product.category.name}</h5>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title.slice(0, 15)}</h5>
                    
                    <div className="flex items-center justify-between mt-2.5 mb-5">
                        <span className=" font-bold text-gray-900 dark:text-white">{product.price} EGp</span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{product.ratingsAverage}</span>

                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                           
                        </div>

                    </div>
                    <div className="flex items-center justify-center">
                        
                        <button onClick={()=> addToCart(product.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}