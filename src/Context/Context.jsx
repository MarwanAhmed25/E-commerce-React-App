import { createContext, useState } from "react";

export let UserLogin = createContext(0);

export default function UserLoginProvider({children}){
    let [username, setUsername] = useState('');
    let [cartNumber, setCartNumber] = useState(0);
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
    return <UserLogin.Provider value={{cartNumber, setCartNumber, userToken, setUserData}}>
        {children}
    </UserLogin.Provider>
}