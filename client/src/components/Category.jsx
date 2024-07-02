import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

import './Category.css';

function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/category`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/allproducts?category=${categoryId}`);
  };

  return (
    <div className="container mt-5">
      <div className="categories-section">
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            {categories.slice(0, 4).map((category, index) => (
              <Col
                key={index}
                xs={6}
                md={6}
                lg={3}
                className="category-item"
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="category-content text-center shadow mt-3 rounded p-1">
                  <img
                    src={`http://localhost:5000/uploads/${category.image}`}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="rounded catimg"
                  />
                  <h5 className="text-center fw-bold">{category.name}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Category;
