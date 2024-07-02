import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


function MiddleNav({notification}) {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();

  const [wishListData,setWishListData] = useState()
  const [cartData,setCartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/auth/user');
       // console.log(response.data.data)
        dispatch(setUserDetails(response.data.data));
      } catch (error) {
        console.log('errr', error);
        dispatch(clearUserDetails());
      }
    };
    fetchData();
  }, []);

let urlQuery = '';

useEffect(()=>{

  urlQuery=`/api/v1/user/getcarts`

  const fetchData = async()=>{

    try {

      const response = await axiosInstance.get(urlQuery);
      setCartData(response.data.data.item.length)
     // console.log(response.data.data.item.length)

    }catch(error){
      
    }
  }

  fetchData()
    },[notification])

  useEffect(()=>{
 
    
 
     const fetchData = async()=>{
 
       try {
 
         const response = await axiosInstance.get(`/api/v1/user/getwishlist`);
         setWishListData(response.data.data.length)
      //   console.log(response.data.data.length)
         
       } catch (error) {
         console.log(error)
       }
 
     }
 
 
     fetchData()
 
 
   },[notification])

  

  const logoutUser = () => {
    // Dispatch the clearUserDetails action to log out the user
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    window.location.reload();
    navigate('/')
  };

  return (
    <div className='bg-success-subtle'>
      <div className='container p-3'>
        <div className='d-flex justify-content-between align-items-center'>
         <Link to={'/'}>
            <div>
              <img src={logo} className='img-fluid' width={150} alt="" />
            </div>
         </Link>
          <div>
            <p className='d-none d-md-block fw-bold'>Discovering the incredibles of microgreens</p>
          </div>
          <div>
            <div>
              <Link to={userDetails ?  '/cart' : '/login'}>
                <button className='btn btn-light me-3 position-relative'>
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartData > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      {cartData}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </Link>

             <Link to={userDetails ?  '/wishlist' : '/login'}>
                <button className='btn btn-light me-3 position-relative'>
                  <i className="fa-solid fa-heart"></i>
                  {wishListData > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      {wishListData}
                      <span className="visually-hidden">items in wishlist</span>
                    </span>
                  )}
                </button>
             </Link>
{  userDetails ?  (              <button className='btn btn-success' onClick={logoutUser} >Logout</button> 
):(             <Link to={'/login'}> <button className='btn btn-success'>Login</button></Link>
)


             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleNav;