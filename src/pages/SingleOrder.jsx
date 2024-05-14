import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import './SingleOrder.css';

function SingleOrder() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('order_confirmed');

  // Sample data from backend, you should replace this with your actual data fetching logic
  const dataFromBackend = {
    status: 'out_for_delivery', // Change this status to see the progress bar move
  };

  // Update progress and status based on data from backend
  useEffect(() => {
    const backendStatus = dataFromBackend.status;
    setStatus(backendStatus);

    switch (backendStatus) {
      case 'order_confirmed':
        setProgress(0);
        break;
      case 'shipped':
        setProgress(33);
        break;
      case 'out_for_delivery':
        setProgress(66);
        break;
      case 'delivered':
        setProgress(100);
        break;
      default:
        setProgress(0);
        break;
    }
  }, [dataFromBackend]);

  const renderProgressBar = () => {
    const steps = [
      { name: 'Order Confirmed', completed: progress >= 0 },
      { name: 'Shipped', completed: progress >= 33 },
      { name: 'Out for Delivery', completed: progress >= 66 },
      { name: 'Delivered', completed: progress >= 100 },
    ];

    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`round-point ${step.completed ? 'completed' : ''}`}
            style={{ left: `${index * 33}%` }}
          >
            <p>{step.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <Container className="mt-4">
          <Row>
                  <Col md={3} className='mb-4'>
                   <div className='d-flex'>
                        <div>
                          <img
                            src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div>
                          <h5>Radish White Microgreen seeds</h5>
                          <p>Category</p>
                          <h5>₹999</h5>
                        </div>
                   </div>
                  </Col>
                  <Col md={6} className='d-flex align-items-center mb-4'>
                   <div className='w-100' >
                      <div>  
                        {renderProgressBar()}
                    </div>
                    <div>
                    <h6 className="mt-3 text-muted text-center"><span className='fw-bold text-dark'>{status.replace(/_/g, ' ')}</span></h6>
                    </div>
                   </div>
                  </Col>
                  <Col md={3}>
                    <div>
                        review the product
                    </div>
                  </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SingleOrder;