import React from 'react'

function ManageAddress() {
  return (
    <div className='p-4 shadow rounded'>
        <div>
            <h6 className='fw-bold'>Manage Addresses</h6>
            <button className='btn btn-outline-success w-100'>Add a new address</button>
            <div>
              <div className='mt-3 border p-3'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <span className='bg-secondary-subtle p-1'>
                Home
             </span>
             <button className='btn'>Edit</button>
            </div>
                <span className='me-5 fw-bold'>User</span>
                <span className='fw-bold'>9548598788</span>
                <p className='text-muted fw-bold '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit <br /> <span className='fw-bold'>691312</span></p>
              </div>
              <div className='mt-3 border p-3'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <span className='bg-secondary-subtle p-1 fw'>
                Work
             </span>
             <button className='btn'>Edit</button>
            </div>
                <span className='me-5 fw-bold'>User</span>
                <span className='fw-bold'>9548598788</span>
                <p className='text-muted fw-bold '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit <br /> <span className='fw-bold'>691312</span></p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ManageAddress