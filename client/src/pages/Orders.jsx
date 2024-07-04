import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

function Orders() {
  const [ordersData, setOrdersData] = useState([])
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/getuserorders`)
      setOrdersData(response.data.data)
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [])

  const renderOrderItems = () => {
    if (ordersData.length === 0) {
      return (
        <div className="container text-center mt-5 mb-5">
          <h3>No orders yet!</h3>
          <p>Looks like you haven't placed any orders. Start shopping now!</p>
          <button 
            className="btn btn-success"
            onClick={() => navigate('/allproducts')}
          >
            Browse Products
          </button>
        </div>
      )
    }

    return (
      <>
        <div className="mt-5">
          {ordersData.map((item) => (
            <Link key={item._id} to={`/ordertrack/${item._id}`}>
              <div className='container p-2 d-none d-md-block text-dark'>
                <div className='p-1 d-flex justify-content-around align-items-center shadow border mb-3'>
                  <div className='d-flex align-items-center '>
                    <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={200} alt="" />
                    <div>
                      {item.products.item.map((prod, index) => (
                        <h6 key={prod.product_id._id} className='fw-bold'>{index + 1}. {prod.product_id.name}</h6>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className='fw-bold '>Total : ₹{item.amount}</h6>
                  </div>
                  <div>
                    <h6 className='fw-bold'>Order placed</h6>
                    <p>Your order has been {item.status}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ordersData.map((item) => (
          <Link key={item._id} to={`/ordertrack/${item._id}`}>
            <div className='container d-md-none mt-2 text-dark '>
              <div className='p-3 shadow border mb-3'>
                <div className='d-flex align-items-center'>
                  <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={150} alt="" />
                  <div>
                    {item.products.item.map((prod, index) => (
                      <h6 key={prod.product_id._id} className='fw-bold'>{index + 1}. {prod.product_id.name}</h6>
                    ))}
                    <h6 className='fw-bold'>Order placed</h6>
                    <p><span className='fw-bold'>Order placed:</span> <br /> Your order has been {item.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div>
      <TopNav />
      <MiddleNav />
      <MainNav />
      {renderOrderItems()}
      <Footer />
    </div>
  )
}

export default Orders