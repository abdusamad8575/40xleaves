import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainNav() {
  return (
    <div>
     <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-center text-white' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav className="text-white">
            <Nav.Link href="/" className='text-white fw-bold '>Home</Nav.Link>
            <Nav.Link href="/allproducts" className='text-white fw-bold '>Shop Microgreens</Nav.Link>
            <Nav.Link href="/allproducts" className='text-white fw-bold '>Microgreens Mix</Nav.Link>
            <Nav.Link href="/allproducts" className='text-white fw-bold '>Wheat Grass</Nav.Link>
            <Nav.Link href="/contactus" className='text-white fw-bold '>Contact</Nav.Link>
            <Nav.Link href="/blogs" className='text-white fw-bold '>Blogs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default MainNav