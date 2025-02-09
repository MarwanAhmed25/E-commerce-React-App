import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { CartData, UserLogin } from "../Context/Context"
import Load from "../Load/Load";
import { Link } from "react-router-dom";


export default function Cart(){
    let [isLoading, setIsLoading] = useState(0);
    let {userToken} = useContext(UserLogin);
    let {cartNumber, cart, getCartData, updateCart, removeCart, removeFromCart, setCartNumber, setCartId} = useContext(CartData);
    

    useEffect(()=>{
        getCartData();
    },[cartNumber, isLoading]);


    async function fireUpdateCart(productId,count){
        
        
        setIsLoading(1);
        await updateCart(productId, count);
        setIsLoading(0);
        
    }

    async function fireRemoveCart(cartId){
        setIsLoading(1);
        await removeCart(cartId);
        setIsLoading(0);
        
    }

    async function fireRemoveFromCart(productId){
        setIsLoading(1);
        await removeFromCart(productId);
        setIsLoading(0);
        
    }


    return (
        <>
        
        {!isLoading && cart? <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
    
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
    
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    {cart.products.map((product)=>
                        <div className="space-y-6" key={product.product._id}>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <Link to={`/E-commerce-React-App/products/${product.product._id}`} className="shrink-0 md:order-1">
                                <img className="h-20 w-20 dark:hidden" src={product.product.imageCover} alt="imac image" />
                            </Link>

                            <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center">
                                <button onClick={()=> fireUpdateCart(product.product._id, product.count - 1)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={product.count} required />
                                <button onClick={()=> fireUpdateCart(product.product._id, product.count + 1)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">{product.price}</p>
                                </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <span className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.product.title}</span>

                                <div className="flex items-center gap-4">
                                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                    </svg>
                                    Add to Favorites
                                </button>

                                <button onClick={()=> fireRemoveFromCart(product.product._id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                    )}
                    </div>
    
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
    
                
    
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                <dd className="text-base font-bold text-gray-900 dark:text-white">{cart.totalCartPrice} EGp</dd>
                            </dl>
                        </div>
    
                        {cart.products.length >0? <>
                        <button onClick={()=> fireRemoveCart(cart._id)} className="flex w-full items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 ">Clear</button>
                        <Link to='/E-commerce-React-App/checkout' className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 ">
                        Checkout
                        </Link>
                        </>: null}
                        
    
                       
                    </div>
    
    
                    </div>
                </div>
                </section>
                :
                <Load></Load>}
        </>
    )
    
}