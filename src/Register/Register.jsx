import { Link } from "react-router-dom"
import * as Yup from 'yup'

export default function Register(){
    let yup = Yup.object().shape({
        name: Yup.string("name must be a valid string").min(3, "name must be more than 3 character").max(10, "name must be less than 10 character").required("name is requird"),
        email: Yup.string().email("email must be a valid").required("email is requird"),
        password: Yup.string("name must be a valid string").matches(/^[A-Z][a-z]{5,10}$/, 'password must be at least 5 char and at more 10 char contains capital and small letters').required("password is requird"),
        repassword: Yup.string("name must be a valid string").oneOf([Yup.ref('password')], "password and repassword must be the same").required("repasswrod is requird"),
        phone: Yup.string("name must be a valid string").matches(/^01[0125][0-9]{8}$/, "phone number must be a valid egy number").required("phone is requird"),

    })

    return <>
        
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                <div>
                    <label for="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <div className="mt-2">
                    <input type="text" name="name" id="name" autocomplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    
                    </div>
                    <div className="mt-2">
                    <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label for="repassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    
                    </div>
                    <div className="mt-2">
                    <input type="password" name="repassword" id="repassword" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <label for="phone" className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                    <div className="mt-2">
                    <input type="tel" name="phone" id="phone" autocomplete="phone" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                Have an account?
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
            </div>
    </>
}