import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import Brands from '../components/Brands';
import Category from '../components/Category';
import Products from '../components/Products';
import Testimonial from '../components/Testimonial';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';


function Home() {
  return (
    <div>
     <TopNav/>
     <MiddleNav/>
     <MainNav/> 
     <Banner/>
     <Category/>
     <Products/>
     <Brands/>
     <Testimonial/>
     <Footer/>
    </div>
  )
}

export default Home