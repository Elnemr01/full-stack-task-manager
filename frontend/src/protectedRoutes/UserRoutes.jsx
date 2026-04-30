import React from 'react'
import InverseProtectedRoute from './InverseProtectedRoute'
import { Outlet } from 'react-router'

const UserRoutes = () => {
    return (
        <InverseProtectedRoute>
            <Outlet/>
        </InverseProtectedRoute>
    )
}

export default UserRoutes