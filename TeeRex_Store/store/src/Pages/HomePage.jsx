import React from "react";
import Filter from "../components/Filter";
import Products from "./Products";
import "../styles/Home.css";

const HomePage = () => {
  return (
    <div className="main">
      <div className="filter">
        <Filter />
      </div>
      <div className="prod">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
