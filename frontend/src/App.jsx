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
import Holding from './pages/Holding.jsx'
import MarketCoins from './pages/MarketCoins.jsx'


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
            <Route path="/MarketCoins" element={<MarketCoins />} />
            <Route path="/Holding" element={<Holding />} />
            {/* <Route path="/Portfolio" element={<Portfolio />} /> */}
          </Route>
        </Route>
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />   */}


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
