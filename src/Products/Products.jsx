import axios from "axios"
import { useEffect, useState } from "react"
import Product from "../Product/Product";


export default function Products(){

    
    const [products, setProducts] = useState([]);

    async function getProducts(){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        setProducts(data.data);
    }

    useEffect(()=>{
        getProducts();
        
    });

    return <>
        <div className="flex w-lg flex-wrap mx-2 md:mx-5 lg:mx-10">
            {products.map((product)=> <Product product={product}></Product>)}
        </div>
        
    </>
}