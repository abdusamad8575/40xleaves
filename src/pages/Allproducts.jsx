import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { getallproductsapi } from '../services/allApi';
import { ServerURL } from '../services/baseUrl';

const Allproducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const product = await getallproductsapi();
    setProducts(product.data.data);
    console.log(product.data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) &&
      (filterCategory === '' || product.category === filterCategory)
    );
  });

  return (
    <>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="input-group w-75">
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
              <div className="d-flex flex-column align-items-center ms-3">
                <select className="form-select" value={filterCategory} onChange={handleFilterCategory}>
                  <option value="">All Categories</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                  <option value="Category C">Category C</option>
                </select>
              </div>
            </div>
            <div className="row">
              {filteredProducts.map((item) => (
                <div key={item._id} className=" col-xs-12 col-sm-6  col-md-4 mb-4">
                  <div className="card">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={`${ServerURL}/uploads/${item.image[0]}`}
                        className="card-img-top"
                        alt={item.name}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title text-muted fw-bold">{item.name}</h5>
                      <p className="card-text m-0">
                        <span className="fw-bold">₹{item.sale_rate}</span>
                      </p>
                      <div className='d-flex justify-content-between '>
                        <div>
                          <span className='m-1 text-muted text-decoration-line-through'>₹{item.price}</span>
                          <span className='text-success fw-bold bg-success-subtle p-1'>{item.discount}% off</span>
                        </div>
                        <p className="text-muted">{item.quantity}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/wishlist/${item._id}`}>
                          <button className="btn btn-outline-success rounded-pill">
                            <i className="fas fa-heart"></i>
                          </button>
                        </Link>
                        <Link to={`/cart/${item._id}`}>
                          <button className="btn btn-success rounded-pill">Add to Cart</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Allproducts;
