import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Load from "../Load/Load";


export default function ProductDetail(){
    const {id} = useParams();
    
    const [product, setProduct] = useState(null);

    async function getProduct(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        
        setProduct(data.data);
        console.log(data.data);
        
    }


    useEffect(()=>{
        getProduct();
    }, []);

  

    return (!product)? 
        <Load></Load>
        :
        <>



















        <div className="flex items-center container m-auto">
            <div className="w-1/3 ">
                
                <div id="default-carousel" class="relative w-full" data-carousel="slide">
    
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {product.images.map((image, i)=>{
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src={image} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" key={i} alt="producat image"/>
                            </div>
                        })}
                        
                    </div>
                
                    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {product.images.map((image, i)=>{
                            
                            <button type="button" class="w-3 h-3 rounded-full" aria-current={i==0? "tru":"false"} aria-label={`Slide ${i+1}`} data-carousel-slide-to={i}></button>
                     
                        })}
                    </div>
                    
                </div>
            
            </div>
            <div className="w-2/3">
                    <h5 className="text-lg font-semibold tracking-tight text-blue-900 dark:text-white">{product.title}</h5>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.description}</h5>
                    
                    <div className="flex items-center justify-between mt-2.5 mb-5">
                        <span className=" font-bold text-gray-900 dark:text-white">{product.price} EGp</span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{product.ratingsAverage}</span>

                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        
                        </div>

                    </div>
                    <div className="flex items-center justify-center">
                        <a href="#" className="text-white w-2/3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    </div>
            </div>
        </div>
            
        </>  
}



 