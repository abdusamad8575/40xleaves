import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your logic here, such as sending the form data to a backend server
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (

   <>
     <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Contact Us</h2>
            <p>We would love to hear from you!</p>
            <div className="contact-info mb-4">
              <h3>Contact Details</h3>
              <p>123 Street Name</p>
              <p>City, Country</p>
              <p>Email: info@example.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </div>
          <div className="col-md-6">
          <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title="map"
                className="embed-responsive-item"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.1144708437996!2d0.03009668749301377!3d51.34580564973545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df5532a07233b5%3A0x742f86cdcbaa7f1b!2s40%20Leaves%20Green%20Rd%2C%20Leaves%20Green%2C%20Keston%20BR2%206DF%2C%20UK!5e0!3m2!1sen!2sin!4v1715162508024!5m2!1sen!2sin"
                allowFullScreen style={{width:'100%' , height:'400px'}}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default ContactUs;
