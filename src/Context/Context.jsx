import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

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
    let [cart, setCart] = useState(null);
    
    if(!cartNumber && parseInt(localStorage.getItem('cart'))){
        setCartNumber(parseInt(localStorage.getItem('cart')));
    }

    function cartLocalStorage(numOfCartItems){
        localStorage.setItem('cart', numOfCartItems);
        setCartNumber(numOfCartItems);
        if(!numOfCartItems){
            setCartId("");
        }
    }

    function getCartData(){
            axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: {
                        token: userToken,
                    }
                }
            ).then(({data})=>{
                cartLocalStorage(data.numOfCartItems);  
                setCart(data.data);
                setCartId(data.data._id);
                localStorage.setItem("userId",data.data.cartOwner);   
            }).catch((e)=>{
                toast.error(e);
            });
            
    
    }

    async function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {"productId":productId},
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=> {
            cartLocalStorage(data.numOfCartItems);
            toast.success("Product added successfully.");
        }).catch((e)=> toast.error(e));
        
    }

    async function updateCart(productId, quantity){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {"count":quantity},
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=> {
            cartLocalStorage(data.numOfCartItems);
            toast.success("Product updated successfully.");
        }).catch((e)=> toast.error(e));
        
    }

    async function removeCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=> {
            cartLocalStorage(data.numOfCartItems);
            toast.success("Cart cleared successfully.");
        }).catch((e)=> toast.error(e));
    }

    async function removeFromCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=> {
            cartLocalStorage(data.numOfCartItems);
            toast.success("Product removed successfully.");
        }).catch((e)=> toast.error(e));

        
    }


    return <CartData.Provider value={{cartId, cart, getCartData, setCartId, updateCart, removeFromCart, addToCart, removeCart, cartNumber, setCartNumber}}>
        {children}
    </CartData.Provider>
}



export let WishlistData = createContext(0);

export function WishlistDataProvider({children}){
    let {userToken} = useContext(UserLogin);
    
    

    async function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {"productId":productId},
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=>  {
            toast.success("Product added successfully.")
        }).catch((e)=> toast.error(e));

    }

    async function removeFromWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers:{
                    token: userToken
                }
            }
        ).then(({data})=>  {
            toast.success("Product removed successfully.")
        }).catch((e)=> toast.error(e));
        
    }

    return <WishlistData.Provider value={{removeFromWishlist, addToWishlist}}>
        {children}
    </WishlistData.Provider>
}