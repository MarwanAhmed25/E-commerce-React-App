import { createContext, useState } from "react";

export let UserLogin = createContext(0);

export default function UserLoginProvider({children}){
    let [username, setUsername] = useState('');
    let [cartNumber, setCartNumber] = useState(0);
    let [userToken, setUserToken] = useState(null);

    return <UserLogin.Provider value={{username, setUsername, cartNumber, setCartNumber, userToken, setUserToken}}>
        {children}
    </UserLogin.Provider>
}