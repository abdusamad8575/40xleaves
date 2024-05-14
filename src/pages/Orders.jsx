import React from 'react'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

function Orders() {
  return (
    <div>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
      <div className='p-5'>
        your orders
      </div>
      <Footer/>
    </div>
  )
}

export default Orders