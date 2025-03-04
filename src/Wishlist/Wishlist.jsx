import { useEffect, useContext } from "react";
import { useState } from "react"
import { WishlistData, UserLogin, CartData } from "../Context/Context";
import Load from "../Load/Load";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


export default function Wishlist(){
    let {addToCart} = useContext(CartData);
    let [isAdd, setIsAdd] = useState(0);
    let {removeFromWishlist} = useContext(WishlistData);
    let {userToken} = useContext(UserLogin);
    
    function getWishlistData(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: {
                    token: userToken,
                }
            }
        )
    }

    let {data, isError, error, isLoading, refetch} = useQuery({
        queryKey: 'wishlist',
        queryFn: getWishlistData,
        staleTime: 5000,
        refetchInterval: 5000,
        gcTime: 5000,
    });    

    
    async function fireAddToCart(productId){
        setIsAdd(1);
        await addToCart(productId);
        setIsAdd(0);
        
    }

    async function fireRemoveFromWishlist(productId){
        setIsAdd(1)
        await removeFromWishlist(productId);
        setIsAdd(0);
        refetch();
    }


    if(isAdd || isLoading){
        return <Load />
    }

    if(isError){
        return <>
            <p className="w-full text-red-700 bg-red-400">{error}</p>
        </>
    }

    return  <>
        <section className="bg-white antialiased dark:bg-gray-900">
        <h1 className="text-xl text-gray-900 dark:text-white sm:text-2xl flex items-center justify-center font-bold">Wishlist</h1>

            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            {data?.data.data.map((w,i)=>
                                <div className="" key={i}>
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <Link to={`/products/${w._id}`} className="shrink-0 ">
                                        <img className="h-20 w-20 dark:hidden" src={w.imageCover} alt="imac image" />
                                    </Link>
                                    
                                        <div className="flex items-center justify-start  w-full flex-wrap gap-4">
                                        
                                        <span className="text-base w-full font-medium text-gray-900 hover:underline dark:text-white">{w.title.slice(0,15)}</span>
                                    <button onClick={()=> fireRemoveFromWishlist(w._id)} type="button" className="inline-flex  items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                            </svg>
                                            Remove
                                        </button>
                                        
                                        </div>
                                    
                                    <div className="w-full flex justify-end   md:max-w-md">
                                    <button onClick={()=> fireAddToCart(w._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                         Add to cart
                                        </button>
                                        
                                        <div className="flex items-center gap-4">
                                        

                                        
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            )}
            </div>
    
    </section>
</>
}