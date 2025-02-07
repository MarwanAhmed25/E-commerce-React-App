import axios from "axios";
import { createContext, useContext, useState } from "react";

export let UserLogin = createContext(0);

export default function UserLoginProvider({children}){
    let [username, setUsername] = useState('');
    let [userToken, setUserToken] = useState(null);

    if(localStorage.getItem('token') && userToken==null){
        setUserToken(localStorage.getItem('token'));
        setUsername(localStorage.getItem('username'));
    }

    function setUserData(token, username){
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setUserToken(token);
        setUsername(username);
    }



    return <UserLogin.Provider value={{userToken, setUserData}}>
        {children}
    </UserLogin.Provider>
}


export let CartData = createContext(0);

export function CartDataProvider({children}){
    let {userToken} = useContext(UserLogin);
    let [cartNumber, setCartNumber] = useState(0);
    async function addToCart(productId){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {"productId":productId},
            {
                headers:{
                    token: userToken
                }
            }
        );

        if(data.status == "success"){
            setCartNumber(data.numOfCartItems);
        }
        
    }

    async function updateCart(productId, quantity){
        console.log("update cart", productId, quantity);
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {"count":quantity},
            {
                headers:{
                    token: userToken
                }
            }
        );
        console.log(data);
        

        if(data.status == "success"){
            setCartNumber(data.numOfCartItems);
        }
        
    }

    async function removeCart(){
        console.log("remove cart");
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers:{
                    token: userToken
                }
            }
        );
        console.log(data);
        

        if(data.status == "success"){
            setCartNumber(data.numOfCartItems);
        }
    }

    async function removeFromCart(productId){
        console.log("remove from cart", productId);
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:{
                    token: userToken
                }
            }
        );
        console.log(data);
        

        if(data.status == "success"){
            setCartNumber(data.numOfCartItems);
        }
    }


    return <CartData.Provider value={{updateCart, removeFromCart, addToCart, removeCart, cartNumber}}>
        {children}
    </CartData.Provider>
}