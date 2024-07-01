import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { clearUserDetails } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


function MiddleNav() {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();


  const cartItemCount = 3;
  const wishlistItemCount = 2;

  const logoutUser = () => {
    // Dispatch the clearUserDetails action to log out the user
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');

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
                  {cartItemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      {cartItemCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </Link>

             <Link to={userDetails ?  '/wishlist' : '/login'}>
                <button className='btn btn-light me-3 position-relative'>
                  <i className="fa-solid fa-heart"></i>
                  {wishlistItemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      {wishlistItemCount}
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