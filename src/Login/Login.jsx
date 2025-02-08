import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserLogin } from "../Context/Context";

export default function Login(){
    let [isLoading, setIsLoading] = useState(0);
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let {setUserData} = useContext(UserLogin);
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);

            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    function handleRegister(inputValues){
        setIsLoading(1);
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, inputValues)
        .then(({data})=>{
            console.log(data);
            
            setUserData(data.token, data.user.name)
            navigate('/');
            
        }).catch((response)=>{
            setError(response.response.data.message);      
            setIsLoading(0);
                      
        });

        
    }

    let formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit: handleRegister
    });



    return<>
            {successMessage && <div class="p-4 flex justify-center  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="m-auto">{successMessage}</span>
            </div>}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            {error?
                <div class="p-4 flex justify-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="m-auto">{error}</span>
            </div>: null}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div className="text-sm">
                        <Link to="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading? "Loding...": "Sign in"}</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Register</Link>
                </p>
            </div>
            </div>

    </>
}