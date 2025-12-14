import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Info from '../components/Info.jsx'
import Footer from '../components/Footer.jsx'
import Tabs from '../components/Tabs.jsx'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="content pt-30">
      <Info/>
      <Tabs />
      <Footer />
      </div>
    </>
  )
}

export default Landing
