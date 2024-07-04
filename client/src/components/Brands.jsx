import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import image from '../assets/images/banner.jpg';
import { Col, Container, Row } from 'react-bootstrap';
import { ServerURL } from '../services/baseUrl';

function Brands() {
  const [brands,setbrands] = useState([])
  const [banner,setBanner] = useState({})

 

  useEffect(()=>{

    

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(`/api/v1/banners`);
        setBanner(response.data.data[0])
      //  console.log(response.data.data[0])
        
      } catch (error) {
        console.log(error)
      }

    }


    fetchData()


  },[])

const fetchData = async()=>{

try {
  const urlQuery = `/api/v1/brands`
  const response = await axiosInstance.get(urlQuery);
  setbrands(response.data.data)

} catch (error) {
  
}
}

useEffect(()=>{
  fetchData()
},[])



    const categories = [
        {
          name: 'Microgreens Offers',
          description: 'Description for category 1',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt62swN9cP_oH7G1pSCL4RQwbiMzIHjmU0Eg&s',
        },
        {
          name: 'All in a group - mixed microgreens',
          description: 'Description for category 2',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt62swN9cP_oH7G1pSCL4RQwbiMzIHjmU0Eg&s',
        },
        {
          name: 'Wheat Grass',
          description: 'Description for category 3',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt62swN9cP_oH7G1pSCL4RQwbiMzIHjmU0Eg&s',
        },
        {
          name: 'Membership Offers',
          description: 'Description for category 4',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt62swN9cP_oH7G1pSCL4RQwbiMzIHjmU0Eg&s',
        },
      ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <img className="d-block img-fluid" src={`${ServerURL}/uploads/${banner.image}`} alt="banner" style={{width:'100%' }} />
        </div>
        <div className='col-12'>
        <div className="container mt-4">
    <div className="categories-section">
   
        <h3 className='text-center m-5 fw-bold '>Brands We Work With</h3>
        <Row className='d-flex justify-content-center align-content-center '>
          {categories.map((item, index) => (
            <Col key={index} xs={3}  lg={3} className="category-item">
              <div className="category-content text-center ">
                <img   src={item.imageUrl} alt={item.name} width={150} className="img-fluid rounded"/>
              </div>
            </Col>
          ))}
        </Row>
    
    </div>
  </div>
        </div>
      </div>
    </div>
  );
}

export default Brands;
