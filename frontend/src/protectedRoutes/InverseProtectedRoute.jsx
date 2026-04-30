import React from 'react'
import { Navigate, useLocation } from 'react-router';

const InverseProtectedRoute = ({ children }) => {
    
    let location =useLocation();

    if(localStorage.getItem('userToken')) {
        return <Navigate to='/' from={location} />
    }

    return (
        <>{children}</>
    )
}

export default InverseProtectedRoute