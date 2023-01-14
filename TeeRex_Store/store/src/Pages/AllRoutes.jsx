import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart"
import HomePage from "./HomePage";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AllRoutes;
