import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Products() {
const [products,setProducts] = useState([]);
const [wishlistItems, setWishlistItems] = useState([]);
const [cartItems, setCartItems] = useState([]);
const navigate = useNavigate();

const userDetails = useSelector(state => state.userDetails);
  let urlQuery = '';

  useEffect(()=>{

    urlQuery=`/api/v1/products/productshome?page=1&limit=8&sortField=createdAt&sortOrder=desc`

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(urlQuery);
        setProducts(response.data.data)
       // console.log(response.data.data)
       const wishlistResponse = await axiosInstance.get('/api/v1/user/getwishlist');
      setWishlistItems(wishlistResponse.data.data);
      const cartResponse = await axiosInstance.get('/api/v1/user/getcarts');
      setCartItems(cartResponse.data.data.item);
      //console.log(cartResponse.data.data.item)
        
      } catch (error) {
        console.log(error)
      }

    }




    fetchData()


  },[])

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

  const items = [
    { id: 1, name: 'Radish Pink Microgreen Seeds',
       imageUrl: 'https://images.unsplash.com/photo-1503289130890-6eff9c5df553?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjV8MjEwMDExNXx8ZW58MHx8fHx8' ,
        price:'120' , quantity:'500' },
    { id: 2, name: 'Broccoli Microgreen Seeds', imageUrl: 'https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8MjEwMDExNXx8ZW58MHx8fHx8' ,  price:'150' , quantity:'500' },
    { id: 3, name: 'Radish White Microgreen seeds', imageUrl: 'https://images.unsplash.com/photo-1505159042738-73dbae90178f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjl8MjEwMDExNXx8ZW58MHx8fHx8' ,  price:'180' , quantity:'500' },
    { id: 4, name: 'Pak Choli Microgreen seeds', imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8' ,  price:'180' , quantity:'500' },
  ];



  return (
    <div className='mt-5  bg-body-tertiary ' style={{overflowX:'hidden'}}>
      <div>
        <h2 className='text-center mb-5 p-3 fw-bold '>Our Products</h2>
        <Container>
          <Row>
            <Col>
              <Slider {...settings}>
                {products.map(item => (
                  <div key={item._id} className='d-flex justify-content-center p-2'>
                    <div className='shadow p-3 bg-white rounded' style={{padding:'10px',width:"80%"}}>
                      <Link to={`/product/${item._id}`}><img src={`http://localhost:5000/uploads/${item.image[0]}`} alt={item.name} className="img-fluid mx-auto mb-2" style={{mixBlendMode:'multiply'}}/></Link>
                     <Link to={`/product/${item._id}`}> <h5 className='text-muted'>{item.name}</h5></Link>
                      <p className='fw-bold m-1'>₹{item.sale_rate}</p>
                     <div> 
                      <span className='m-1 text-muted text-decoration-line-through '>₹{item.price}</span>
                      <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                      </div>
                      <p className='fw-bold'>500 gm</p>
                    <div className='d-flex justify-content-between'>  
{/* {
true ? (   <Link to={'/wishlist'}>
  <button className='btn btn-success rounded-3' onClick={()=> addWishlist(item._id)} >
    <i className="fa-solid fa-heart"></i>
 </button>
</Link>):
(   <Link to={'/wishlist'}>
  <button className='btn btn-danger rounded-3' onClick={()=> removeWishlist(item._id)}>
    <i className="fa-solid fa-heart"></i>
 </button>
</Link>)

} */}
{
! isInWishlist(item._id) ? (   

  <button className='btn btn-success rounded-3' onClick={   ()=> addWishlist(item._id)} >
    <i className="fa-solid fa-heart"></i>
 </button>

):
(    
  <button className='btn btn-danger rounded-3' onClick={()=> removeWishlist(item._id)}>
    <i className="fa-solid fa-heart"></i>
 </button>
 )

}
{
  ! isInCart(item._id) ? (                      <button className='btn btn-success rounded-3' 
    onClick={()=> addCart(item._id)}><i className="fas fa-shopping-cart"></i></button>
  ) :
  (
      <button className='btn btn-danger rounded-3' onClick={()=> removeCart(item._id)}
      ><i className="fas fa-shopping-cart"></i></button> 

  )
}
                
                     {/* <Link to={'/cart'}> <button className='btn btn-success rounded-3'><i className="fas fa-shopping-cart"></i></button></Link> */}
                  </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className='text-center mt-4 p-5 '>
                <Link to={'/allproducts'}><button className='btn btn-success '>Load More</button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Products;
