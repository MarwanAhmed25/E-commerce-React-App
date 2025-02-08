import axios from "axios"
import { useEffect, useState } from "react"
import Product from "../Product/Product";
import Load from "../Load/Load";


export default function Products(){

    
    const [products, setProducts] = useState([]);
    const [filteresProducts, setFilteresProducts] = useState([]);

    async function getProducts(){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
       
        setProducts(data.data);
        setFilteresProducts(data.data);
        console.log(data);
        
    }


    useEffect(()=>{
        getProducts();
        
    },[]);

    function searchInput(e){
        let inputValue = e.target.value;
        
        let newProducts = products.filter(product => 
            product.title.toLowerCase().includes(inputValue)
        );
        setFilteresProducts(newProducts);

    }

    return (products.length)<1? 
        <Load />
        :
        <> <div className="w-8/12 mx-auto my-4">
            <input type="text" placeholder="search..." className="w-full rounded border-gray-300 size-10" onInput={searchInput} />
        </div>
        <div className="flex container w-11/12 flex-wrap m-auto">
            {filteresProducts.map((product)=> <Product product={product}></Product>)}
        </div></>
        
        
    
}