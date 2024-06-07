


import React, {createContext, useReducer} from "react";

export const DataContext = createContext();


export const DataProvider = ({children,reducer, initalState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer, initalState)}>
            {children}
        </DataContext.Provider>
    )
}
