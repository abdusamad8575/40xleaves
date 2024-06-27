import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ManageAddress() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    mobile: '',
    country: '',
    // primary: true,
  });
  const [show, setShow] = useState(false);
  const [addressDatas,setAddressDatas] = useState([])


  const fetchAddress = async(urlQ) =>{

try {
  
const response = await axiosInstance.get(urlQ)
setAddressDatas(response.data.data)
//console.log(response.data.data)
} catch (error) {
  console.log(error)
}

  }


  useEffect(()=>{

      fetchAddress('/api/v1/address')

  },[])

  const handleClose = async() => {
    setShow(false);
  }
  const handleShow = async() => {
    setShow(true);
  }

  const onSubmit = async ()=>{

    setShow(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axiosInstance.post('/api/v1/address', formData);
      console.log('Address submitted: ', response.data);
      setFormData('')
      handleClose();
      setAddressDatas([])

await fetchAddress('/api/v1/address')


    } catch (error) {
      console.error('Error submitting address: ', error);
    }
  };

  const setPrimary = async(addId)=>{
console.log(addId)
try {
  const response = await axiosInstance.patch('/api/v1/address/setprimary', {addressId:addId});
// Update the local state to reflect the changes
setAddressDatas((prevAddresses) =>
  prevAddresses.map((addr) =>
    addr._id === addId ? { ...addr, primary: true } : { ...addr, primary: false }
  )
);

} catch (error) {
  console.log(error)
}

  }

  return (
    <div className='p-4 shadow rounded'>
        <div>
            <h6 className='fw-bold'>Manage Addresses</h6>
            <button className='btn btn-outline-success w-100' onClick={handleShow} >Add a new address</button>


          

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="John" 
                    name="firstname" 
                    value={formData.firstname} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Doe" 
                    name="lastname" 
                    value={formData.lastname} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control 
                  placeholder="1234 Main St" 
                  name="address_line_1" 
                  value={formData.address_line_1} 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control 
                  placeholder="1234 Main St" 
                  name="address_line_2" 
                  value={formData.address_line_2} 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control 
                    name="zip" 
                    value={formData.zip} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>



            <div>

            
        {  
        
        addressDatas.map((addr)=>(

<div className='mt-3 border p-3'>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            <span className='bg-secondary-subtle p-1'>
              Home
            </span>
            {
! addr.primary && (
  <div className="d-flex justify-content-end gap-2 mt-4">
  <Button variant="primary" type="submit">
        edit
      </Button>
  <Button variant="primary" type="submit" onClick={(e)=> setPrimary(addr._id)} >
        default
      </Button>
  </div>
)

            }
           
          
          </div>
          <span className='me-5 fw-bold'> {`${addr.firstname} ${addr.lastname}`} </span>
          <span className='fw-bold'>{addr.mobile}</span>
              <p className='text-muted fw-bold'>{addr.address_line_1}</p>
              <p className='text-muted fw-bold'>{addr.address_line_2}</p>
              {addr.zip} <br />
              <p className='text-muted fw-bold'>{addr.city} <br />
              {addr.state} <br />
              {addr.country} <br />
             
               </p>

             
            </div>


        )) }


            </div>
        </div>
    </div>
  )
}

export default ManageAddress