import React from 'react'
import '../App.css'

function TopNav() {
  return (
    <div className=''>
        <div className="container d-flex  justify-content-between align-items-center">
            <div className='mt-3'>
             <p className='fw-bold '>Delivering in Trivandrum & Kochi</p>
            </div>
            <div className='social-media'>
               <a href="" className='me-3 text-danger'><i class="fa-brands fa-instagram"></i></a>
               <a href="" className='text-primary'><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
    </div>
  )
}

export default TopNav