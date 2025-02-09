import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword(){
    let [isLoading, setIsLoading] = useState(0);
    let [error, setError] = useState("");
    let navigate = useNavigate();

    function handleRegister(inputValues){
        setIsLoading(1);
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, inputValues)
        .then(({data})=>{
            navigate('/E-commerce-React-App/reset-code');
            
        }).catch((response)=>{
            setError(response.response.data.message); 
            setIsLoading(0);
                           
        });

        
    }

    let formik = useFormik({
        initialValues:{
            email:"",
        },
        onSubmit: handleRegister
    });



    return<>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Reset Password</h2>
            </div>
            {error?
                <div class="p-4 flex justify-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="m-auto">{error}</span>
            </div>: null}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>


                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading? "Loding...": "Submit"}</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
               
                <Link to="/E-commerce-React-App/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
            </div>

    </>
}