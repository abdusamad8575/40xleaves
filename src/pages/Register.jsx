import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Register() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
      });
      const [showPassword, setShowPassword] = useState(false);
  return (
   <>
    <div className='bg-success-subtle'>
      <div className='container p-3'>
        <div className='d-flex justify-content-between align-items-center'>
         <Link to={'/'}>
            <div>
              <img src={logo} className='img-fluid' width={150} alt="" />
            </div>
         </Link>
          <div>
            <p className='d-none d-md-block fw-bold'>Discovering the incredibles of microgreens</p>
          </div>
          <div>
            <div> 
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="container p-5 mt-5 ">
      <div>
        <Row>
          <Col md={6} className='d-none d-md-block '>
            <img
              src="https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8MjEwMDExNXx8ZW58MHx8fHx8"
              alt="" style={{width:'100%'}}
            />
          </Col>
          <Col className='shadow p-3 ' md={6}>
            <div className='text-center'>
              <h3>Register</h3>
              <p> Unlocking Doors to Innovation </p>
            </div>
            <div>
              <FloatingLabel
                controlId="floatingname"
                label="Username"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="xyz" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="position-relative"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? '👁' : '👁‍🗨'}
                </span>
              </FloatingLabel>
              <div className='mt-3 d-flex justify-content-between align-items-center'>
                <button className='btn btn-outline-success'>Sign Up</button>
                <span>
                  Already a user?
                  <Link to={'/login'} className='text-primary'>
                   Login
                  </Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      </div>
   </>
  )
}

export default Register