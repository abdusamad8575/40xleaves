import React, { useEffect, useState,useRef } from 'react';
import axiosInstance from '../axios'
import {  useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { getallproductsapi } from '../services/allApi';
import { ServerURL } from '../services/baseUrl';
import { useNavigate } from 'react-router-dom';

const Allproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(9)
  const hasFetchedProducts = useRef(false);
 const [category,setCategory] = useState([])
 const userDetails = useSelector(state => state.userDetails);
 const navigate = useNavigate();
 const [wishlistItems, setWishlistItems] = useState([]);
 const [cartItems, setCartItems] = useState([]);
 const [notif,setNotif] = useState(true)

let urlQuery = ''
urlQuery = `/api/v1/products?page=${page}&limit=${limit}&sortField=createdAt&sortOrder=desc`

  const fetchProducts = async(urlQ)=>{

try {

  //write logics for sort query

  //if(searchTerm!='') urlQ += `&search=${searchTerm}`

  const response = await axiosInstance.get(urlQ)

  //setProducts(...products,response.data.data)
  setProducts((prevProducts) => [...prevProducts, ...response.data.data]);
  console.log('get prods ',response.data.data)
  const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
  setWishlistItems(wishlistResponse.data.data);
  const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
  setCartItems(cartResponse.data.data.item);
  //console.log(cartResponse.data.data.item)
} catch (error) {
  
}

  }

  const fetchCategory =async(urlC)=>{

try {
  const response = await axiosInstance.get(urlC)
  setCategory(response.data.data)
  console.log(response.data.data)
} catch (error) {
  
}


  }



  useEffect(() => {
    if (!hasFetchedProducts.current) {
      fetchProducts(urlQuery);
      fetchCategory(`/api/v1/category`)
      hasFetchedProducts.current = true;
    }
  }, []);


  // const getAllProducts = async () => {
  //   const product = await getallproductsapi();
  //   setProducts(product.data.data);
  //   console.log(product.data.data);
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const handleSearch =async (e) => {

   setSearchTerm(e.target.value.toLowerCase());

  };

  const onLoad = async()=>{
    setPage(page+1) 
    let urlQ = `/api/v1/products?page=${page+1}&limit=${limit}&sortField=createdAt&sortOrder=desc`

if(searchTerm!='') urlQ += `&search=${searchTerm}`

if(filterCategory!='') urlQ += `&category=${filterCategory}`


  await  fetchProducts(urlQ)

  }

  const onSearch = async () =>{
    setProducts([])
setPage(1)
    urlQuery = urlQuery + `&search=${searchTerm}`
    fetchProducts(urlQuery)

  }

 


  const handleFilterCategory = (e) => {
    console.log(e.target.value)
    setProducts([])
    setFilterCategory(e.target.value);
    setPage(1)
    if(searchTerm!='') urlQuery += `&search=${searchTerm}`
    urlQuery = urlQuery + `&category=${e.target.value}`
    fetchProducts(urlQuery)

  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) &&
      (filterCategory === '' || product.category === filterCategory)
    );
  });
  //value={filterCategory} onChange={handleFilterCategory}

  const fetchCart = async () => {
    console.log('reached fetch cart 2')
    try {
      const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
      setCartItems(cartResponse.data.data.item);
    //  console.log('reached fetch cart 3',cartResponse.data.data.item)
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

    if(!userDetails){
      navigate('/login')
      
          }else{


            try {
              urlQuery = `/api/v1/user/addToWishlist/${proId}`
              const response = await axiosInstance.patch(urlQuery);
              await fetchWishlist();
              setNotif(prev => !prev);
              //console.log(response)
            } catch (error) {
              console.log(error)
            
            }
          }



  }
  
  const removeWishlist = async (proId) => {
    if(!userDetails){
      navigate('/login')
      
          }else{
            try {
              urlQuery = `/api/v1/user/removeFromWishlist/${proId}`
              const response = await axiosInstance.patch(urlQuery);
              await fetchWishlist();
              setNotif(prev => !prev);
        //console.log(response)
            } catch (error) {
              console.log(error)
            }
          }
    

  }

  const addCart = async (proId) => {
    if(!userDetails){
      navigate('/login')
      
          }else{
            try {
              urlQuery = `/api/v1/user/addToCart/${proId}`
              const response = await axiosInstance.patch(urlQuery);
            await  fetchCart()
            setNotif(prev => !prev);
              //console.log(response)
            } catch (error) {
              console.log(error)
            
            }
          }
  
    
      }
      
      const removeCart = async (proId) => {
        if(!userDetails){
          navigate('/login')
          
              }else{
                console.log('reached rem cart',proId)
        
                try {
                  const ItemId = cartItems.filter((item)=>item.productId._id == proId )
                  console.log(' item id',ItemId)
                  
        
                  urlQuery = `/api/v1/user/removeFromCart/${ItemId[0]._id}`
                  const response = await axiosInstance.patch(urlQuery);
                await  fetchCart()
                setNotif(prev => !prev);
            //console.log(response)
                } catch (error) {
                  console.log(error)
                }

              }
      
    
      }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId._id === productId);
  };


  return (
    <>
      <TopNav />
      <MiddleNav notification={notif} />
      <MainNav />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="input-group w-75">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={onSearch} >
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="d-flex flex-column align-items-center ms-3">
                <select className="form-select" onChange={ handleFilterCategory} >
                  <option value="">All Categories</option>
                  {
  category.map((cat) => (
    <option key={cat.id} value={cat._id}  >{cat.name}</option>
  ))
}

                </select>
              </div>
            </div>
            <div className="row">
              {products.map((item) => (
                <div key={item._id} className=" col-xs-12 col-sm-6  col-md-4 mb-4">
                  <div className="card">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={`${ServerURL}/uploads/${item.image[0]}`}
                        className="card-img-top"
                        alt={item.name}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title text-muted fw-bold">{item.name}</h5>
                      <p className="card-text m-0">
                        <span className="fw-bold">₹{item.sale_rate}</span>
                      </p>
                      <div className='d-flex justify-content-between '>
                        <div>
                          <span className='m-1 text-muted text-decoration-line-through'>₹{item.price}</span>
                          <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                        </div>
                        <p className="text-muted">{item.quantity}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                     { ! isInWishlist(item._id) ? 
                      <button className="btn btn-outline-success rounded-pill" onClick={   ()=> addWishlist(item._id)}>
                      <i className="fas fa-heart"></i>
                    </button>
                      :
                          <button className="btn btn-outline-danger rounded-pill" onClick={()=> removeWishlist(item._id)}>
                            <i className="fas fa-heart"></i>
                          </button>
                        }

                      { 
                       ! isInCart(item._id) ?  
                       <button className="btn btn-success rounded-pill" onClick={()=> addCart(item._id)} >Add to Cart</button> :
                          <button className="btn btn-danger rounded-pill"  onClick={()=> removeCart(item._id)}>Remove from Cart</button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='text-center mt-4 p-5 '>
               <button className='btn btn-success ' onClick={  onLoad } >Load More</button>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Allproducts;
