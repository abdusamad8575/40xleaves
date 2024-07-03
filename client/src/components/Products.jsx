import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Products.css'; // Ensure to import the custom CSS
import { ServerURL } from '../services/baseUrl';

function Products({ setNotification }) {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  let urlQuery = '';

  useEffect(() => {
    urlQuery = `/api/v1/products/productshome?page=1&limit=8&sortField=createdAt&sortOrder=desc`;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setProducts(response.data.data);
        const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
        setWishlistItems(wishlistResponse.data.data);
        const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
        setCartItems(cartResponse.data.data.item);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
      setCartItems(cartResponse.data.data.item);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
      setWishlistItems(wishlistResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/addToWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeWishlist = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/removeFromWishlist/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchWishlist();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        urlQuery = `/api/v1/user/addToCart/${proId}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeCart = async (proId) => {
    if (!userDetails) {
      navigate('/login');
    } else {
      try {
        const ItemId = cartItems.filter((item) => item.productId._id === proId);
        urlQuery = `/api/v1/user/removeFromCart/${ItemId[0]._id}`;
        const response = await axiosInstance.patch(urlQuery);
        await fetchCart();
        setNotification(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId._id === productId);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className='mt-5 bg-body-tertiary' style={{ overflowX: 'hidden' }}>
      <div>
        <h2 className='text-center mb-5 p-3 fw-bold'>Our Products</h2>
        <Container>
          <Row>
            <Col>
              <Slider {...settings}>
                {products.map(item => (
                  <div key={item._id} className='d-flex justify-content-center align-items-center p-2 slider-item'>
                    <div className='shadow p-3 bg-white rounded product-card'>
                      <Link to={`/product/${item._id}/${item.category}`}>
                        <img src={`${ServerURL}/uploads/${item.image[0]}`} alt={item.name} className="img-fluid mx-auto mb-2" />
                      </Link>
                      <div className="product-info text-center">
                        <Link to={`/product/${item._id}/${item.category}`}>
                          <h5 className='text-muted'>{item.name}</h5>
                        </Link>
                        <p className='fw-bold m-1'>₹{item.sale_rate}</p>
                        <div>
                          <span className='m-1 text-muted text-decoration-line-through'>₹{item.price}</span>
                          <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                        </div>
                        <p className='fw-bold'>500 gm</p>
                      </div>
                      <div className='d-flex justify-content-between w-100'>
                        {!isInWishlist(item._id) ? (
                          <Button className='btn-success rounded-3' onClick={() => addWishlist(item._id)}>
                            <i className="fa-solid fa-heart"></i>
                          </Button>
                        ) : (
                          <Button className='btn-danger rounded-3' onClick={() => removeWishlist(item._id)}>
                            <i className="fa-solid fa-heart"></i>
                          </Button>
                        )}
                        {!isInCart(item._id) ? (
                          <Button className='btn-success rounded-3' onClick={() => addCart(item._id)}>
                            <i className="fas fa-shopping-cart"></i>
                          </Button>
                        ) : (
                          <Button className='btn-danger rounded-3' onClick={() => removeCart(item._id)}>
                            <i className="fas fa-shopping-cart"></i>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className='text-center mt-4 p-5'>
                <Link to={'/allproducts'}>
                  <Button className='btn-success'>Load More</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Products;
