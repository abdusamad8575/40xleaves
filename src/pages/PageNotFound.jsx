import React from 'react'
import pgnot from '../assets/images/404.gif'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

function PageNotFound() {
  return (
   <>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
      <div className='d-flex justify-content-center '>
        <img src={pgnot} alt="" />
      </div>
      <Footer/>
   </>
  )
}

export default PageNotFound