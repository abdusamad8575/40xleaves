import React from 'react';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="text-success">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to={'/'}  className="text-light">Home</Link></li>
              <li><Link to={'/about'}  className="text-light">About</Link></li>
              <li><Link to={'/allproducts'}  className="text-light">Products</Link></li>
              <li><Link to={'/privacypolicy'}  className="text-light">Privacy Policy</Link></li>
              <li><Link to={'/shippingpolicy'}  className="text-light">Shipping Policy</Link></li>
              <li><Link to={'/termsandcondition'}  className="text-light">Terms & Conditions</Link></li>
              <li><Link to={'/refund-policy'}  className="text-light">Return & Refund policy</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="text-success">Connect With Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Instagram</a></li>
              <li><a href="#" className="text-light">Facebook</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
              <li><a href="#" className="text-light">Blog</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="text-success">Contact</h5>
            <ul className="list-unstyled">
              <li><a href="tel:7736225610" className="text-light">Call: +91 7736225610</a></li>
              <li><a href="mailto:40xleaves@gmail.com" className="text-light">Email: 40xleaves@gmail.com</a></li>
              <li><a href="https://maps.app.goo.gl/uc96wrTnx9wfqmhJA" className="text-light">Address: Avilunni Vilakath Veed, Narivanmood,Parambukkonam, Thirivananthapuram, 695528</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-success" />
        <Row className="align-items-center">
          <Col className="text-center text-muted text-white ">
            <p className="mb-0 text-white ">Copyright &copy; FORTY X LEAVES MICROGREENS PRIVATE LIMITED {new Date().getFullYear()}  </p>
            {/* <p className="mb-0 text-white ">Designed by <a href="https://www.acmeflare.in/" className="text-success">Acmeflare</a></p> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;