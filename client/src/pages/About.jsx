import React from 'react';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const About = () => {
  return (
   <>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8" className="img-fluid rounded" alt="About" />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus, diam eu laoreet consectetur, quam nisl convallis libero, sit amet pharetra mauris ex a ex. Vestibulum nec metus mi.</p>
            <p>Proin non tincidunt justo, vel venenatis ex. Nullam non lectus a nisi sollicitudin dictum.</p>
            <p>Nunc et ante vel tortor malesuada fermentum id et lectus. Aenean commodo magna nec blandit sagittis.</p>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default About;
