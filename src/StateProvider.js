import React, {useState,createContext,useContext} from 'react'
import {auth,provider} from './firebase'


export const StateContext= createContext()

export const StateProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null)

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            // console.log(result) 
            setCurrentUser(result.user)          

        })
        .catch((err)=>console.log(err.message))
    }
    const signOut=()=>{
        auth.signOut();
        setCurrentUser(null);
        
    }
    const value={
        currentUser,
        signIn,
        signOut,
        setCurrentUser,


    }


    
    return <StateContext.Provider value={value}>
        {children}
    </StateContext.Provider>
  
}

export const useStateValue=()=>useContext(StateContext) // custom Hook