import { useContext, useEffect, useState } from "react";
import { UserLogin, CartData } from "../Context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import Load from "../Load/Load";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


export default function Order(){
    let {userToken} = useContext(UserLogin);
    let {getCartData} = useContext(CartData);
    let userId = localStorage.getItem("userId");
    function getOrders(){
        
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,{
            headers:{
                token: userToken,
            }
        })
    }
    let {data, isError, error, isLoading, refetch} = useQuery({
        queryKey: ['odrders'],
        queryFn: getOrders,
        staleTime: 5000,
        refetchInterval: 5000,
        gcTime: 5000,
    }); 
    
    if(isLoading){
            return <Load />
        }
    
    if(isError){
        return <>
            <p className="w-full text-red-700 bg-red-400">{error}</p>
        </>
    }

    return <>
    <section className="bg-white antialiased dark:bg-gray-900">
    <h1 className="text-xl text-gray-900 dark:text-white sm:text-2xl flex items-center justify-center font-bold">Order summary</h1>

            { data?.data.map((order, i)=>{
                return <><div className="mx-auto max-w-4xl my-8 shadow-xl p-5 rounded">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order {i+1}#</h2>
    
               
                <div className="mt-6 sm:mt-8">
                    <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                    <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
    
                        {order.cartItems.map((item)=>{
                            return <tr>
                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                                <Link to={`/products/${item.product.id}`} className="flex items-center aspect-square w-10 h-10 shrink-0">
                                <img className="h-auto w-full max-h-full dark:hidden" src={item.product.imageCover} alt="imac image" />
                                <img className="hidden h-auto w-full max-h-full dark:block" src={item.product.imageCover} alt="imac image" />
                                </Link>
                                <Link to={`/products/${item.product.id}`} className="hover:underline">{item.product.title.slice(0, 15)}</Link>
                            </div>
                            </td>
    
                            <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.count}</td>
    
                            <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">{item.price} Egp</td>
                        </tr>
                        })}
    
                        </tbody>
                    </table>
                    </div>
    
                    <div className="mt-4 space-y-6">
    
                    <div className="space-y-4">
                        <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">Original price</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">{order.totalOrderPrice} Egp</dd>
                        </dl>
    
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">{order.taxPrice} Egp</dd>
                        </dl>
                        </div>
    
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">{order.totalOrderPrice - order.taxPrice} Egp</dd>
                        </dl>
                    </div>
    
    
                   
                    </div>
                </div>
                </div></>
            })

            }
        
        </section>
    </>
}