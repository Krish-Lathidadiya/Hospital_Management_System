import { createContext, useState,useContext } from "react";

export  const AuthContext=createContext({
    isAuthenticated:false
})

export const AuthProvider=({children})=>{

    const [name,setName]=useState()
    //tackel token
    const [token,setToken]=useState(
        localStorage.getItem("patientToken")
    )
    //logout ni upper rakhavu
    const storeTokenInLS=(serverToken)=>{
        //refresh logout 
        setToken(serverToken)
        return localStorage.setItem('patientToken',serverToken);
    }

    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("patientToken")
    }

    let isLoggedIn=!!token
    console.log("isLoggedIn",isLoggedIn)
    
    return(
        //value = function pass
        <AuthContext.Provider value={{name,setName,isLoggedIn,storeTokenInLS,LogoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    // return useContext(AuthContext)

    const useContextValue=useContext(AuthContext);
    if(!useContextValue){
        throw new Error("userAuth used outside the provider")
    }

    return useContextValue;
}
