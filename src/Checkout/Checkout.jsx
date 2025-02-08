import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { CartData, UserLogin } from "../Context/Context";

export default function Checkout(){
    let [isLoading, setIsLoading] = useState(0);
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let {setUserData, userToken} = useContext(UserLogin);
    let {cartId, setCartNumber} = useContext(CartData);

    let yup = Yup.object().shape({
        details: Yup.string("details must be a valid string").min(3, "details must be more than 3 character").max(250, "details must be less than 250 character").required("details is requird"),
        city: Yup.string().min(3, "name must be more than 3 character").max(25, "name must be less than 25 character").required("city is requird"),
        phone: Yup.string("name must be a valid string").matches(/^01[0125][0-9]{8}$/, "phone number must be a valid egy number").required("phone is requird"),

    });

    function handleRegister(inputValues){
        setIsLoading(1);
        let nextUrl = "https://marwanahmed25.github.io/E-commerce-React-App/";
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${nextUrl}`, {"shippingAddress":inputValues},{
            headers:{
                token: userToken
            }
        })
                        .then(({data})=>{
                            window.location.href = data.session.url;
                        }).catch((response)=>{
                            setError(response.response.data.message);                            
                        });

        
    }

    let formik = useFormik({
        initialValues:{
            name:"",
            city:"",
            phone:""
        },
        validationSchema: yup,
        onSubmit: handleRegister
    });



    return <>
        

        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Fill your data</h2>
            </div>
            {error?
                <div class="p-4 flex justify-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="m-auto">{error}</span>
            </div>: null}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="details" className="block text-sm/6 font-medium text-gray-900">Details</label>
                    <div className="mt-2">
                    <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" autocomplete="details" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.details && formik.touched.details?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.details}
              </div>: null}

                <div>
                    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">City</label>
                    <div className="mt-2">
                    <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" autocomplete="city" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.city && formik.touched.city?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.city}
              </div>: null}

               


                <div>
                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                    <div className="mt-2">
                    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" autocomplete="phone" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.phone && formik.touched.phone?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.phone}
              </div>: null}

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Checkout Now</button>

                </div>
                </form>

            </div>
            </div>
    </>
}