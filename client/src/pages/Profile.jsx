import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { Col, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import MainNav from '../components/MainNav'
import MiddleNav from '../components/MiddleNav'
import TopNav from '../components/TopNav'
import ManageAddress from './ManageAddress'
import './Page.css'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate()
    const[profile , setProfile]= useState(true)
    const[address , setAddress] = useState(false)
 

    const profileinfo=()=>{
       setProfile(true)
       setAddress(false)
    }
    const addressSet=()=>{
        setAddress(true)
        setProfile(false)
    }
    const orderSet=()=>{
        navigate('/order')
    }
  return (
    <div>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
        <div className='container p-3 '>
            <Row>
                <Col md={4}>
                 <div className='border p-3 shadow'>
                    <div className='d-flex align-items-center '>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUy9s7L2aRDadM1KxmVNkNQ9Edar2APzIeHw&s" width={100} className='rounded-circle' alt="" />
                        <h2 className='ms-3 fw-bold '>Hello user</h2>
                    </div>
                    <div className='mt-3  p-3 border d-flex flex-column '>
                        <p className='fw-bold btn' onClick={profileinfo}>Profile Information</p>
                        <p className='fw-bold btn' onClick={addressSet}>Manage Address</p>
                        <p className='fw-bold btn' onClick={orderSet}>My Orders</p>
                    </div>
                 </div>
                </Col>
                <Col md={7}>

                   {profile&&
                    <ProfileInfo/>
                     }
                   {address&&
                    <ManageAddress/>
                    }
                </Col>
            </Row>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile