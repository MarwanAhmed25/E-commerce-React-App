import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../Context/Context";
import * as Yup from 'yup';

export default function ResetPassword(){
    let [isLoading, setIsLoading] = useState(0);
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let {setUserData} = useContext(UserLogin);

    let yup = Yup.object().shape({
            email: Yup.string().email('enter a valid email'),
            newPassword: Yup.string("name must be a valid string").matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must be at least 5 char and at more 10 char contains capital and small letters').required("password is requird"),
        });

    function handleRegister(inputValues){
        setIsLoading(1);
        
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, inputValues)
                        .then(({data})=>{
                            navigate('/login', {
                                state: {message: "Success reset password."}
                            });
                            
                        }).catch((response)=>{
                            setError(response.response.data.message);  
                            setIsLoading(0);                          
                        });

    }

    let formik = useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },
        validationSchema: yup,
        onSubmit: handleRegister
    });



    return<>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">New Password</h2>
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
                    <div className="flex items-center justify-between">
                    <label htmlFor="newPassword" className="block text-sm/6 font-medium text-gray-900">New password</label>
                    <div className="text-sm">
                    </div>
                    </div>
                    <div className="mt-2">
                    <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="newPassword" id="newPassword" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
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