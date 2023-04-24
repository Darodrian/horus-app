import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const auth = localStorage.length !== 0 ? true : false

  return auth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute