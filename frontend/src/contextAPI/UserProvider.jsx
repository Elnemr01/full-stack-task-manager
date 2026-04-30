import React, { createContext, useContext, useState } from 'react'






let UserContext = createContext();

export let useAuth = ()=> useContext(UserContext);

const UserProvider = ({children}) => {

    let [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user')) || null);
    let [token,setToken]=useState(()=> localStorage.getItem('userToken') || null);

    let data = {
        user,
        setUser,
        token,
        setToken
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider