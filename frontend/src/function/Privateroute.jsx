import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")

    if(!token){
        return <Navigate to="/Login" replace />
    }

    return <Outlet />
    return children;
};

export default PrivateRoute
