// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";

import React from "react";
const Home = ({ products }) => {
  return (
    <div>
      <Navbar />
      {products.map((product) => (
        <div key={product._id} className="book-container">
          <div className="title-box">
            <label className="book-title">
              <a href={`/product/${product._id}`} className="title-link">
                {product.title}
              </a>
            </label>
          </div>
          <div className="info-box">
            <p className="book-info">Author: </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
