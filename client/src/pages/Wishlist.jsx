import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'

import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

function Wishlist() {

    const [wishListData,setWishListData] = useState([])

    let urlQuery = '';

    useEffect(()=>{
  
      urlQuery=`/api/v1/user/getwishlist`
  
      const fetchData = async()=>{
  
        try {
  
          const response = await axiosInstance.get(urlQuery);
          setWishListData(response.data.data)
          console.log(response.data.data)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
  
      fetchData()
  
  
    },[])

    // const [wishlistItems, setWishlistItems] = useState([
    //     {
    //       id: 1,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t3.ftcdn.net/jpg/00/70/62/06/240_F_70620687_WyyZOfm8R6qXU9bWio8VbEXGSX4eX1eu.jpg',
    //       price: '120',
    //       quantity: '500'
    //     },
    //     {
    //       id: 2,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t3.ftcdn.net/jpg/03/40/37/62/240_F_340376293_8KKAtyMn6badZqrCMRajj576ckJoz7Tx.jpg',
    //       price: '150',
    //       quantity: '500'
    //     },
    //     {
    //       id: 3,
    //       name: 'Radish White Microgreen seeds',
    //       imageUrl: 'https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg',
    //       price: '180',
    //       quantity: '500'
    //     },
    //   ]);

      const handleRemoveFromWishlist = async (itemId) => {
        // Update local state to remove the item from the wishlist
      
    
        // API call to remove the item from the wishlist
        const url = `/api/v1/user/removeFromWishlist/${itemId}`; // Assuming the endpoint is correct
        try {
            const response = await axiosInstance.patch(url);
        //    setWishlistItems([])
            const updatedWishlistItems = wishListData.filter((item) => item._id !== itemId);
            setWishListData(updatedWishlistItems);
         //   console.log("Item removed from wishlist:", response.data);
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
            // You could also update the state here if the API call fails
        }
    };
    
      const handleAddToCart =async (item) => {
        urlQuery=`/api/v1/user/addToCart/${item._id}`

        // Implement your logic to add the item to the cart here 
        const response = await axiosInstance.patch(urlQuery);

     //   console.log('Adding to cart:', item);
      };
      const handleRemoveFromCart =async (item) => {
        urlQuery=`/api/v1/user/removeFromCart/${item._id}`

        // Implement your logic to add the item to the cart here 
        const response = await axiosInstance.patch(urlQuery);

     //   console.log('Adding to cart:', item);
      };
  return (
  <>
      <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5">
      <h2 className="text-center mb-4">My Wishlist</h2>
      {wishListData.length === 0 ? (
          <div className='text-center'>
            <p className="text-center">Your wishlist is empty.</p>
            <Link to={'/allproducts'}>
            <button className="btn btn-success">
              <i className="fas fa-plus me-2"></i>Add Items
            </button>
         </Link>
          </div>
      ) : (
        <div className="row">
          {wishListData.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100 border">
                <div className="card-img-top text-center ">
                  <img
                   src={`${ServerURL}/uploads/${item.image[0]}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
                <div className="card-body p-3">
                  <h5 className="card-title mb-2 fw-bold text-muted">{item.name}</h5>
                  <div className='d-flex justify-content-between '>
                        
                        <div>
                            <span className='m-1 text-muted text-decoration-line-through '>₹{item.price}</span>
                          <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                          <span className='m-1 text-muted  '>₹{item.sale_rate}</span>
                        </div>
                          <p className="text-muted">500 gm</p>
                        
                      </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-success rounded-pill"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      Remove
                    </button>

                   {
                    true ? (
                      <Link to={'/cart'}>
                      <button
                      className="btn btn-success rounded-pill"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    </ Link>
                    ):(
                      <button
                      className="btn btn-danger rounded-pill"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove From Cart
                    </button>
                    )
                   }
                     
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer/>
  </>
  )
}

export default Wishlist