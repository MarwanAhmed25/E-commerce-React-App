import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Load from "../Load/Load";


export default function Category(){

    const [categories, setCategories] = useState([]);

    async function getCategories(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        
        setCategories(data.data);

    }

    useEffect(()=>{
        getCategories();
    }, []);

    return (categories.length)<1? 
    <Load />
    :
    <>
    <div className="flex flex-wrap">
        {categories.map((category)=> <Card obj={category} /> )}
    </div>
        
    </> 
}