import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Load from "../Load/Load";
import { useQuery } from "@tanstack/react-query";

export default function Category(){
    
    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);        
    }

    let {data, isError, error, isLoading, refetch} = useQuery({
        queryKey: ['caregories'],
        queryFn: getCategories,
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

    return     <>
    <div className="flex flex-wrap">
        {data?.data.data.map((category)=> <Card obj={category} /> )}
    </div>
        
    </> 
}