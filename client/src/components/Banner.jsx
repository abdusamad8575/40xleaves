import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import image from '../assets/images/banner.jpg';
import { Carousel } from 'react-bootstrap';

function Banner() {

const [banner,setBanner] = useState([])

let urlQuery = '';

  useEffect(()=>{

    urlQuery=`/api/v1/banners`

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(urlQuery);
        setBanner(response.data.data)
       // console.log(response.data.data)
        
      } catch (error) {
        console.log(error)
      }

    }


    fetchData()


  },[])

    const dummyImages = [
        image,
        image,
        image,
        image,
        image
      ];
    
      const [index, setIndex] = useState(0);
    
      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

  return (
    <div>
         <Carousel activeIndex={index} onSelect={handleSelect}>
      {banner.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block img-fluid" src={`http://localhost:5000/uploads/${item.image}`} alt={`Slide ${idx}`} />
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  )
}

export default Banner