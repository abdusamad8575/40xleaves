import React from 'react';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="text-success">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/allproducts" className="text-light">Products</a></li>
              <li><a href="/privacypolicy" className="text-light">Privacy Policy</a></li>
              <li><a href="/shippingpolicy" className="text-light">Shipping Policy</a></li>
              <li><a href="/termsandcondition" className="text-light">Terms & Conditions</a></li>
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
              <li><a href="#" className="text-light">WhatsApp: +1234567890</a></li>
              <li><a href="#" className="text-light">Email: example@example.com</a></li>
              <li><a href="#" className="text-light">Address: 123 Main Street, City, State</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-success" />
        <Row className="align-items-center">
          <Col className="text-center text-muted text-white ">
            <p className="mb-0 text-white ">Designed by <a href="https://www.acmeflare.in/" className="text-success">Acmeflare</a></p>
            <p className="mb-0 text-white ">Copyright &copy; {new Date().getFullYear()} </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;