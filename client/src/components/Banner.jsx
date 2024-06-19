import React, { useState } from 'react'
import image from '../assets/images/banner.jpg';
import { Carousel } from 'react-bootstrap';

function Banner() {
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
      {dummyImages.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block img-fluid" src={image} alt={`Slide ${idx}`} />
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  )
}

export default Banner