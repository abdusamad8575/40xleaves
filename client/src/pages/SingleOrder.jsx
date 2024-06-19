import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
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
    orderDetails: {
      orderId: '12345678',
      orderDate: '2023-05-15',
      items: [
        {
          name: 'Radish White Microgreen seeds',
          quantity: 1,
          price: 999,
          imageUrl: 'https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg',
          category: 'Seeds',
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Anytown USA',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      total: 999,
    },
  };

  // Update progress and status based on data from backend
  useEffect(() => {
    const backendStatus = dataFromBackend.status.toLowerCase().replace(/ /g, '_');
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
      <div className="progress-container mb-4">
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
      <Container className="mt-4 mb-4">
        <Card className="shadow">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img
                      src={dataFromBackend.orderDetails.items[0].imageUrl}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <h5>{dataFromBackend.orderDetails.items[0].name}</h5>
                    <p className="text-muted mb-0">{dataFromBackend.orderDetails.items[0].category}</p>
                    <h5 className="mb-0">₹{dataFromBackend.orderDetails.items[0].price}</h5>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3 mb-md-0">
                <div className="text-center">
                  {renderProgressBar()}
                  <h6 className="text-muted mb-0">
                    <span className="fw-bold text-dark">{status.replace(/_/g, ' ')}</span>
                  </h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center">
                  <p className="fw-bold mb-2">Review this product</p>
                  <div>
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-success" />
                    <i className="fas fa-star text-muted" />
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="shadow mt-4">
          <Card.Body>
            <h5>Order Details</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Order ID</span>
                  <span>{dataFromBackend.orderDetails.orderId}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Order Date</span>
                  <span>{dataFromBackend.orderDetails.orderDate}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span>₹{dataFromBackend.orderDetails.total}</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="shadow mt-4">
          <Card.Body>
            <h5>Delivery Address</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Name</span>
                  <span>{dataFromBackend.orderDetails.shippingAddress.name}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>Address</span>
                  <span>{dataFromBackend.orderDetails.shippingAddress.address}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <span>City, State, ZIP</span>
                  <span>
                    {dataFromBackend.orderDetails.shippingAddress.city},{' '}
                    {dataFromBackend.orderDetails.shippingAddress.state}{' '}
                    {dataFromBackend.orderDetails.shippingAddress.zip}
                  </span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default SingleOrder;