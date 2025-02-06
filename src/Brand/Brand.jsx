import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Load from "../Load/Load";


export default function Brand(){

    const [brands, setBrands] = useState([]);

    async function getBrands(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        
        
        setBrands(data.data);

    }

    useEffect(()=>{
        getBrands();
    }, []);

    return (brands.length)<1? 
    <Load></Load>
    :
    <>
    <div className="flex flex-wrap">
        {brands.map((brand)=> <Card obj={brand} /> )}
    </div>
        
    </>  
}