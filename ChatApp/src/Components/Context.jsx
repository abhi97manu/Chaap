import {  createContext, useState } from "react";

export const  Context = createContext(null);
export const ContextProvider  = ({children}) =>{
        const  [isLoggedIn, setIsLoggedIn] = useState(false);

        return (
            <Context.Provider value={{isLoggedIn, setIsLoggedIn }}>
                {children}
            </Context.Provider>
        )
}

