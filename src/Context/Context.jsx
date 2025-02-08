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
    let [cartId, setCartId] = useState("");

    if(!cartNumber && parseInt(localStorage.getItem('cart'))){
        setCartNumber(parseInt(localStorage.getItem('cart')));
    }

    function cartLocalStorage(numOfCartItems){
        localStorage.setItem('cart', numOfCartItems);
        setCartNumber(numOfCartItems);
    }
    async function addToCart(productId){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {"productId":productId},
            {
                headers:{
                    token: userToken
                }
            }
        );

        if(data.status == "success"){
            cartLocalStorage(data.numOfCartItems);
        }
        
    }

    async function updateCart(productId, quantity){
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {"count":quantity},
            {
                headers:{
                    token: userToken
                }
            }
        );

        if(data.status == "success"){
            cartLocalStorage(data.numOfCartItems);
        }
        
    }

    async function removeCart(){
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers:{
                    token: userToken
                }
            }
        );
        
        if(data.message == "success"){            
            cartLocalStorage(0);
        }
    }

    async function removeFromCart(productId){
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:{
                    token: userToken
                }
            }
        );

        if(data.status == "success"){            
            cartLocalStorage(data.numOfCartItems);
        }
    }


    return <CartData.Provider value={{cartId, setCartId, updateCart, removeFromCart, addToCart, removeCart, cartNumber, setCartNumber}}>
        {children}
    </CartData.Provider>
}