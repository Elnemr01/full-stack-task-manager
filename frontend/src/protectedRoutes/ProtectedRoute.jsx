import React from 'react'
import { Navigate, useLocation } from 'react-router'

const ProtectedRoute = ({ children }) => {

    let location =useLocation();

    if(!localStorage.getItem('userToken')) {
        return <Navigate to='/login' from={location} />
    }

    return (
        <>{children}</>
    )
}

export default ProtectedRoute