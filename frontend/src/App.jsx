import { useState } from 'react'
import './App.css'
// import React from "react"
import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing.jsx"
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './function/Privateroute.jsx'
import Signup from './pages/Signup.jsx'
// import HomePageD from './pages/HomePageD.jsx'
import DashboardLayout from './Layouts/DashboardLayout.jsx'


function App() {


  return (
    <>

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Layout" element={<DashboardLayout />} />

         <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            {/* <Route path="/Market" element={<Market />} /> */}
            {/* <Route path="/Portfolio" element={<Portfolio />} /> */}
          </Route>
        </Route>
      </Routes>


      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 999999,
          },
        }}
      />

    </>
  )
}

export default App
