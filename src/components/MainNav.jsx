import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Component.css'

function MainNav() {
  return (
    <div>
     <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-center text-white' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav className="text-white">
            <Link to={"/"} className='text-white fw-bold me-3'>Home</Link>
            <Link to={"/allproducts"} className='text-white fw-bold me-3'>Shop Microgreens</Link>
            <Link to={"/allproducts"} className='text-white fw-bold me-3'>Microgreens Mix</Link>
            <Link to={"/allproducts"} className='text-white fw-bold me-3'>Wheat Grass</Link>
            <Link to={"/profile"} className='text-white fw-bold me-3'>Profile</Link>
            <Link to={"/contactus"} className='text-white fw-bold me-3'>Contact</Link>
            <Link to={"/blogs"} className='text-white fw-bold '>Blogs</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default MainNav