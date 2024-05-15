import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaRegTrashAlt } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('Ananthu xyz house yeroor po yeroor Yeroor KOLLAM, KERALA 691312');
  const [paymentOption, setPaymentOption] = useState('razorpay');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Radish Pink Microgreen Seeds',
      image: 'https://t3.ftcdn.net/jpg/06/25/41/12/240_F_625411283_dlpdiRmZxoptmfMX1NNh6jmIv4t3pwK3.jpg',
      price: 1999,
      quantity: 1,
    }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 100; // Exaggerated delivery fee
    const tax = 0.1 * subtotal; // Exaggerated tax
    return subtotal + deliveryFee + tax;
  };

  const removeProduct = (id) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );
  };

  const placeOrder = () => {
    Swal.fire({
      title: 'Success',
      text: 'Your order has been placed!',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000
    });
    navigate('/');
  };

  const progressPercentage = (currentStep / 3) * 100; // Assuming there are 3 steps

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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* <div className="progress mb-4">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
            </div> */}
            {currentStep === 1 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 1: Shipping Address</h5>
                </div>
                <div className="card-body ">
                  <div className="row">
                    <div className="address-box border p-3  col-md-6 ">
                      <p className="card-text">{deliveryAddress}</p>
                      <button className="btn btn-outline-success change-address-btn" onClick={() => setCurrentStep(2)}>Use This address</button>
                    </div>
                    <div className="address-box border p-3 d-flex align-items-center justify-content-center  col-md-6">
                       <button className='btn btn-outline-success '>Change Address</button>
                    </div>
                </div>
                  
                  </div>
              </div>
            )}
  
            {currentStep === 2 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 3: Review Items and Shipping</h5>
                </div>
                <div className="card-body">
                  {products.map(product => (
                    <div key={product.id} className="row mb-3 align-items-center border-bottom pb-3">
                      <div className="col-md-3">
                        <img src={product.image} alt={product.name} className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <h5 className='fw-bold text-muted '>{product.name}</h5>
                        <p className='text-muted'>Microgreen</p>
                        <p className='fw-bold'>₹{product.price}</p>
                        <span className='m-1 text-muted text-decoration-line-through '>₹999</span>
                          <span className='text-success fw-bold bg-success-subtle p-1'>70% off</span>
                      </div>
                      <div className="col-md-3">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                            disabled={product.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={product.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-link text-danger"
                            onClick={() => removeProduct(product.id)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-success me-2" onClick={() => setCurrentStep(1)}>Back</button>
                  <button className="btn btn-success" onClick={() => setCurrentStep(3)}>Continue</button>
                </div>
              </div>
            )}
  
            {currentStep === 3 && (
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Step 2: Payment Options</h5>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentOption"
                      id="razorpayOption"
                      value="razorpay"
                      checked={paymentOption === 'razorpay'}
                      onChange={() => setPaymentOption('razorpay')}
                    />
                    <label className="form-check-label fw-bold " htmlFor="razorpayOption">
                      Online Payment
                    </label>
                    <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentOption"
                      id="codOption"
                      value="cod"
                      checked={paymentOption === 'cod'}
                      onChange={() => setPaymentOption('cod')}
                    />
                    <label className="form-check-label fw-bold " htmlFor="codOption">
                      Cash on Delivery / Pay on Delivery
                    </label>
                    <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <button className="btn btn-success me-2" onClick={() => setCurrentStep(2)}>Back</button>
                  <button className="btn btn-danger" onClick={placeOrder}>Place Your Order</button>
                </div>
              </div>
            )}
  
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Delivery Fee:</span>
                  <span>₹100.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="font-weight-bold">Tax:</span>
                  <span>₹{(0.1 * calculateSubtotal()).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Total:</span>
                  <span className="font-weight-bold">₹{calculateTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  
  );
};

export default Checkout;
