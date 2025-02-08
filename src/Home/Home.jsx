
import { useEffect, useState } from "react";
import Category from "../Category/Category";
import Products from "../Products/Products";
import Slider from "react-slick";
import Card from "../Card/Card";
import axios from "axios";
import src1 from '../assets/one.jpg';
import src2 from '../assets/two.jpg';
import src3 from '../assets/three.jpg';
import src4 from '../assets/four.jpg';

export default function Home(){
    const [categories, setCategories] = useState([]);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    async function getCategories(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        
        setCategories(data.data);
        

    }

    useEffect(()=>{        
        getCategories();
        
    }, []);


    return<>

        
    
        <Slider {...settings} className="mb-12 w-full">
            {categories.map((cat,i)=>{
                return <>
                <div>
                <div className="max-w-sm  sm:mx-auto bg-white border  rounded-lg hover:shadow dark:bg-gray-800 ">
                    <div style={{
                            backgroundImage: `url(${cat.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            height: "220px",
                            width: "100%", // Use 100% width to fit the container
                        }} height="200px" width="400px">
    
                    </div>
                    
                </div>
            </div>
      
        </>
            })}
        </Slider>
 
    <Products></Products>


    </>
}