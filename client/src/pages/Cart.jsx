import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios'

import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

function Cart() {
const [cartData,setCartData] = useState([])
const [salePriceTotal,setSalePriceTotal] = useState(0)
const [proPriceTotal,setProPriceTotal] = useState(0)
const [discountTotal,setDiscountTotal] = useState(0)
const [notif,setNotif] = useState(true)


const calculateTotalSalePrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.sale_rate * item.qty ;
  });

  return totalSalePrice;
};
const calculateTotalProPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.price;
  });

  return totalSalePrice;
};
const calculateTotalDiscountPrice = (items) => {
  let totalSalePrice = 0;

  items.forEach((item) => {
   
  
    
    // Add the sale_rate to the totalSalePrice
    totalSalePrice +=item.productId.discount;
  });

  return totalSalePrice;
};

const fetchData = async()=>{

  try {

    const response = await axiosInstance.get(`/api/v1/user/getcarts`);
    setCartData(response.data.data)
    console.log('cart details array',response.data.data)
    //console.log('fetch qty ',response.data.data.item[0].qty)
    const items = response.data.data.item;

// Calculate the total sale price
const totalSalePrice = calculateTotalSalePrice(items);
   setSalePriceTotal(totalSalePrice)

  // Calculate the total  price
const totalProPrice = calculateTotalProPrice(items);
   setProPriceTotal(totalProPrice)

  // Calculate the total discount
const totalDiscount = calculateTotalDiscountPrice(items);
   setDiscountTotal(totalDiscount)

  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{

  fetchData()

},[])



 

  const handleQuantityChange =async (item, operation,index) => {
let QtyApi = item.qty
if(operation==='increment'){
  QtyApi +=1
}else if (operation==='decrement'){
  QtyApi -=1
}
try {
   

if(item.qty <=  item.productId.stock && operation==='increment'){
  const response = await axiosInstance.patch(`/api/v1/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })
 
  setProPriceTotal(null)
  setSalePriceTotal(null)


}else if(item.qty>1 && operation==='decrement'){
  const response = await axiosInstance.patch(`/api/v1/user/updateQty`,{ qty:QtyApi, productId:item.productId._id })

  setProPriceTotal(null)
    setSalePriceTotal(null)

}

  } catch (error) {
   console.log(error)
  }

  fetchData()
 }




  

  const handleRemoveItem =async (itemId) => {
   console.log('cart id ',itemId)
   let urlQuery=`/api/v1/user/removeFromCart/${itemId}`


   try {
    const response = await axiosInstance.patch(urlQuery);
    const updatedCartItems = cartData.item.filter((item) => item._id !== itemId);
    const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setProPriceTotal(null)
    setSalePriceTotal(null)
    setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice
    });
   // Calculate the total sale price
   const totalSalePrice = calculateTotalSalePrice(updatedCartItems);
   console.log(totalSalePrice)
       setSalePriceTotal(totalSalePrice)
   
       // Calculate the total  price
   const totalProPrice = calculateTotalProPrice(updatedCartItems);
   console.log(totalProPrice)
       setProPriceTotal(totalProPrice)

       setNotif(prev => !prev);

} catch (error) {
    console.error("Error removing item from wishlist:", error);
 
}
 
  };

   

  const discount = 300; // Example discount
  const deliveryCharges = 300; // Example delivery charges

  

  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div className="container my-5">
        <h1 className="text-success mb-4 text-center ">
          <i className="fas fa-shopping-cart me-2"></i> Cart
        </h1>
        {cartData?.item?.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">No items in the cart</p>
            <Link to={'/allproducts'}>
              <button className="btn btn-success">
                <i className="fas fa-plus me-2"></i>Add Items
              </button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cartData?.item?.map((item,index) => (
                <div key={item._id} className="card mb-3 border-success p-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 col-5 d-flex align-items-center ">
                      <img
                         src={`${ServerURL}/uploads/${item.productId.image[0]}`}

                        className="img-fluid rounded"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8 col-7">
                      <div className="card-body">
                        <h5 className="card-title text-success">{item.productId.name}</h5>
                        <p className='text-muted'>{item.productId.brand}</p>
                        <p className="card-text fw-bold ">₹{item.productId.sale_rate}</p>
                        <span className='m-1 text-muted text-decoration-line-through'>₹{item.productId.price}</span>
                        <span className='text-success fw-bold bg-success-subtle p-1'>{item.productId.discount}% off</span>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <div className="d-flex justify-content-center align-items-center ">
                            <button
                              className="btn btn-outline-success rounded-circle"
                              onClick={() => handleQuantityChange(item, 'decrement',index)}
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3 fw-bold">{item.qty}</span>
                            <button
                              className="btn btn-outline-success rounded-circle"
                              onClick={() => handleQuantityChange(item, 'increment',index )}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        <div>
                          <button
                            className="btn btn-outline-danger rounded-pill ms-2 "
                            onClick={() => handleRemoveItem(item._id)}
                          ><i className="fas fa-trash"></i></button>
                        </div>
                        </div>
                         
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card bg-light border-success shadow">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    <i className="fas fa-receipt me-2"></i>Order Summary
                  </h5>
                  <div>
                    <p>Price: ₹{proPriceTotal}</p>
                    <p>Discount: ₹{proPriceTotal-salePriceTotal}</p>
                    <p  >Delivery Charges: ₹{deliveryCharges}</p>
                    <hr />
                    <p className="card-text fw-bold">
                      Total Amount: ₹{salePriceTotal}
                    </p>
                  </div>
                  <Link to={'/checkout'}>
                    <button className="btn btn-success mt-3">
                      <i className="fas fa-shopping-cart me-2"></i>Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
