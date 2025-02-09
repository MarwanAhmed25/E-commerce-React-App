import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLogin } from "../Context/Context";



export default function ProtectedRoute({children}){
    let {userToken} = useContext(UserLogin);

    if(userToken){
        return children
    }

    return <Navigate to={"/E-commerce-React-App/login"}></Navigate>
}