import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { UserLogin } from "../Context/Context";

export default function Register(){
    let [isLoading, setIsLoading] = useState(0);
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let {setUserData} = useContext(UserLogin);

    let yup = Yup.object().shape({
        name: Yup.string("name must be a valid string").min(3, "name must be more than 3 character").max(10, "name must be less than 10 character").required("name is requird"),
        email: Yup.string().email("email must be a valid").required("email is requird"),
        password: Yup.string("name must be a valid string").matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must be at least 5 char and at more 10 char contains capital and small letters').required("password is requird"),
        rePassword: Yup.string("name must be a valid string").oneOf([Yup.ref('password')], "password and repassword must be the same").required("repasswrod is requird"),
        phone: Yup.string("name must be a valid string").matches(/^01[0125][0-9]{8}$/, "phone number must be a valid egy number").required("phone is requird"),

    });

    function handleRegister(inputValues){
        setIsLoading(1);
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, inputValues)
        .then(({data})=>{
            setUserData(data.token, data.user.name)
            navigate('/E-commerce-React-App');
            
        }).catch((response)=>{
            setError(response.response.data.message);  
            setIsLoading(0);                          
        });
        
        
    }

    let formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        validationSchema: yup,
        onSubmit: handleRegister
    });

    return <>
        

        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>
            </div>
            {error?
                <div class="p-4 flex justify-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="m-auto">{error}</span>
            </div>: null}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <div className="mt-2">
                    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" autocomplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.name && formik.touched.name?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.name}
              </div>: null}

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.email && formik.touched.email?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>: null}

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    
                    </div>
                    <div className="mt-2">
                    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.password && formik.touched.password?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.password}
              </div>: null}

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="rePassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    
                    </div>
                    <div className="mt-2">
                    <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="repassword" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword?
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.rePassword}
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
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading? "Loding...": "Register"}</button>

                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                Have an account?
                <Link to="/E-commerce-React-App/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
            </div>
    </>
}