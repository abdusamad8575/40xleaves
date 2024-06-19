import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './Category.css'

function Category() {

    const categories = [
        {
          name: 'Microgreens Offers',
          description: 'Description for category 1',
          imageUrl: 'https://t4.ftcdn.net/jpg/05/78/03/99/240_F_578039941_qj049T0C7Al81ofJOHM8tGaWFHqIy3xp.jpg',
        },
        {
          name: 'All in a group - mixed microgreens',
          description: 'Description for category 2',
          imageUrl: 'https://t3.ftcdn.net/jpg/00/70/62/06/240_F_70620687_WyyZOfm8R6qXU9bWio8VbEXGSX4eX1eu.jpg',
        },
        {
          name: 'Wheat Grass',
          description: 'Description for category 3',
          imageUrl: 'https://t3.ftcdn.net/jpg/03/40/37/62/240_F_340376293_8KKAtyMn6badZqrCMRajj576ckJoz7Tx.jpg',
        },
        {
          name: 'Membership Offers',
          description: 'Description for category 4',
          imageUrl: 'https://t4.ftcdn.net/jpg/03/88/04/41/240_F_388044101_IidJjwi2bonGwWDGZZqgPz7oxaowhsjp.jpg',
        },
      ];
 
  return (
    <div className="container mt-5">
    <div className="categories-section">
      <Container>
        <Row className='d-flex justify-content-center align-items-center '>
          {categories.map((category, index) => (
            <Col key={index} xs={6} md={6} lg={3} className="category-item">
              <div className="category-content text-center shadow mt-3 rounded p-1">
                <img src={category.imageUrl} alt={category.name} width={150}height={150}  className="rounded catimg"/>
                <h5 className='text-center fw-bold '>{category.name}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  </div>
  )
}

export default Category