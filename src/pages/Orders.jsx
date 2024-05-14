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
      <div className='container p-5 d-none d-md-block ' >
        <div className='p-1 d-flex justify-content-around align-items-center shadow border mb-3'>
            <div className='d-flex align-items-center '>
                <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={200} alt="" />
               <div>
                    <h6 className='fw-bold'>Radish White Microgreen seeds</h6>
                    <p className='text-muted'>category</p>
               </div>
            </div>
            <div>
               <h6 className='fw-bold '>₹999</h6>
            </div>
            <div>
            <h6 className='fw-bold'>order placed</h6>
            <p>you order has been placed </p>
            </div>
        </div>
      </div>
      <div className='container d-md-none mt-2'>
        <div className='p-3 shadow border mb-3'>
          <div className='d-flex align-items-center'>
            <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={150} alt="" />
            <div>
              <h6 className='fw-bold'>Radish White Microgreen seeds</h6>
              <p className='text-muted'>category</p>
              <h6 className='fw-bold'>₹999</h6>
              <p><span className='fw-bold'>Order placed:</span> <br /> Your order has been placed</p>
            </div>
          </div>
        </div>
        <div className='p-3 shadow border mb-3'>
          <div className='d-flex align-items-center'>
            <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={150} alt="" />
            <div>
              <h6 className='fw-bold'>Radish White Microgreen seeds</h6>
              <p className='text-muted'>category</p>
              <h6 className='fw-bold'>₹999</h6>
              <p><span className='fw-bold'>Order placed:</span> <br /> Your order has been placed</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Orders