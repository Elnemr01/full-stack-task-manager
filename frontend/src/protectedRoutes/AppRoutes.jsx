import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Outlet } from 'react-router'
import Header from '@/appComponents/header/Header'

const AppRoutes = () => {
    return (
        <ProtectedRoute>
            <Outlet/>
        </ProtectedRoute>
    )
}

export default AppRoutes