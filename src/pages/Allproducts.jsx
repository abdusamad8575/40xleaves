import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const Allproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sortOption, setSortOption] = useState('');

  const products = [
    { id: 1, name: 'Product 1', imageUrl: 'https://t3.ftcdn.net/jpg/06/25/41/12/240_F_625411283_dlpdiRmZxoptmfMX1NNh6jmIv4t3pwK3.jpg', price: 120, quantity: 500, category: 'Category A', rating: 4 },
    { id: 2, name: 'Product 2', imageUrl: 'https://t3.ftcdn.net/jpg/06/66/74/62/240_F_666746258_1AXo03QTBbKAZi6WFDnb3msBkTLIObqk.jpg', price: 150, quantity: 500, category: 'Category B', rating: 3 },
    { id: 3, name: 'Product 3', imageUrl: 'https://t4.ftcdn.net/jpg/06/83/41/17/240_F_683411706_zX1jW7hz5SHMO5CCHfuCk3Hcp9NfPlef.jpg', price: 180, quantity: 500, category: 'Category A', rating: 5 },
    { id: 4, name: 'Product 4', imageUrl: 'https://t3.ftcdn.net/jpg/06/99/07/80/240_F_699078038_KP59bO8zGU2U19722SParQzr87yyoVDQ.jpg', price: 200, quantity: 600, category: 'Category C', rating: 4 },
    { id: 5, name: 'Product 5', imageUrl: 'https://t3.ftcdn.net/jpg/07/04/24/42/240_F_704244214_X8pLFeamlxLbD4bIvikLm3EIbydU2zey.jpg', price: 250, quantity: 700, category: 'Category B', rating: 3 },
    { id: 6, name: 'Product 6', imageUrl: 'https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg', price: 350, quantity: 750, category: 'Category c', rating: 4 },
  ];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleFilterPrice = (e) => {
    setFilterPrice(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterRating = (e) => {
    setFilterRating(e.target.value);
  };

  const handleSortOption = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPrice === '' || product.price === parseInt(filterPrice)) &&
      (filterCategory === '' || product.category === filterCategory) &&
      (filterRating === '' || product.rating === parseInt(filterRating))
  );

  const sortedProducts = sortOption
    ? filteredProducts.sort((a, b) => {
        if (sortOption === 'priceLowToHigh') {
          return a.price - b.price;
        } else if (sortOption === 'priceHighToLow') {
          return b.price - a.price;
        }
        return 0;
      })
    : filteredProducts;

  return (
   <>
     <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-header">Categories</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filterCategory === ''}
                    onChange={handleFilterCategory}
                  />
                  <label className="ms-2">All Categories</label>
                </li>
                <li className="list-group-item">
                  <input
                    type="radio"
                    name="category"
                    value="Category A"
                    checked={filterCategory === 'Category A'}
                    onChange={handleFilterCategory}
                  />
                  <label className="ms-2">Category A</label>
                </li>
                <li className="list-group-item">
                  <input
                    type="radio"
                    name="category"
                    value="Category B"
                    checked={filterCategory === 'Category B'}
                    onChange={handleFilterCategory}
                  />
                  <label className="ms-2">Category B</label>
                </li>
                <li className="list-group-item">
                  <input
                    type="radio"
                    name="category"
                    value="Category C"
                    checked={filterCategory === 'Category C'}
                    onChange={handleFilterCategory}
                  />
                  <label className="ms-2">Category C</label>
                </li>
              </ul>
            </div>
            {/* Add other filters here */}
          </div>
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="input-group w-75 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="d-flex flex-column  align-items-center ms-3">
                {/* <label className="me-2">Sort by:</label> */}
                <select className="form-select" value={sortOption} onChange={handleSortOption}>
                  <option value="">Sort by</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="row">
              {sortedProducts.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card">
                      <Link to={'/product'}>
                      <img src={item.imageUrl} className="card-img-top" alt={item.name} /></Link>                  
                      <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        <span className="fw-bold">₹{item.price}</span> &nbsp;
                        <span className="text-muted">{item.quantity} gm</span>
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                      <Link to={'/wishlist'}>
                          <button className="btn btn-outline-success rounded-pill">
                            <i className="fas fa-heart"></i>
                          </button>
                      </Link>
                        <Link to={'/cart'}><button className="btn btn-success rounded-pill">Add to Cart</button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default Allproducts;