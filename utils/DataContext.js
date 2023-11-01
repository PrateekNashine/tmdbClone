"use client";
import React, { createContext, useState } from 'react';

export const Data = createContext(null);

const DataContext = ({ children }) => {
    const [fetchedData, setFetchedData] = useState([]);
    
    return (
        <Data.Provider value = {[fetchedData, setFetchedData]}>{children}</Data.Provider>
    )
}

export default DataContext;