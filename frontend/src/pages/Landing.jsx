import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Info from '../components/Info.jsx'
import Footer from '../components/Footer.jsx'
import HomeTabs from '../components/Hometabs.jsx'
import Features from '../components/Features.jsx'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="content ">
        <Info />
        <Features />
        <HomeTabs />
        <Footer />
      </div>
    </>
  )
}

export default Landing;
