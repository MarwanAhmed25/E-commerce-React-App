import { useEffect, useContext } from "react";
import { useState } from "react"
import { WishlistData, UserLogin } from "../Context/Context";
import Load from "../Load/Load";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Wishlist(){
    const [wishlist, setWishlist] = useState(null);
    const [getNewData, setNewData] = useState(0);

    let {removeFromWishlist} = useContext(WishlistData);
    
    let {userToken} = useContext(UserLogin);
    
    function getWishlistData(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: {
                    token: userToken,
                }
            }
        ).then(({data})=>{
            setWishlist(data.data);
            
        }).catch((e)=>{
            console.log(e);
        });
    }

    async function fireRemoveFromWishlist(productId){
        await removeFromWishlist(productId);
        setNewData(1);
    }

    useEffect(()=>{
        getWishlistData();
    },[getNewData]);


    return <>
    {wishlist? <>
        <section className="bg-white antialiased dark:bg-gray-900">
        <h1 className="text-xl text-gray-900 dark:text-white sm:text-2xl flex items-center justify-center font-bold">Wishlist</h1>

            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            {wishlist?.map((w,i)=>
                                <div className="space-y-6" key={i}>
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <Link to={`/products/${w._id}`} className="shrink-0 md:order-1">
                                        <img className="h-20 w-20 dark:hidden" src={w.imageCover} alt="imac image" />
                                    </Link>

                                    
                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <span className="text-base font-medium text-gray-900 hover:underline dark:text-white">{w.title}</span>

                                        <div className="flex items-center gap-4">
                                        

                                        <button onClick={()=> fireRemoveFromWishlist(w._id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
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
    
    </section>
</>: <Load></Load>}
</>
}