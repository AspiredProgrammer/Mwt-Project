import logo from "../assets/e-Shop.png";
import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/product/:id" element={<Product />} />
        {/* <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
