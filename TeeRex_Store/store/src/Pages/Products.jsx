import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { DataFetchingContext } from "../Context/Reducer";
import "../styles/Products.css";

const Products = () => {
  const { state, addToCart, dispatch } =
    useContext(DataFetchingContext);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <div className="card-grid">
      {state.filterData.length? state.filterData?.map((el, i) => {
            // console.log(el)
            return (
              <div key={el.id} className="card">
                <h2>{el.name}</h2>
                <img src={el.imageURL} alt={el.id} />
                <div className="price_div">
                  <h3>Rs{el.price}</h3>
                  <button
                    onClick={() => addToCart(el, dispatch)}
                    className="add-to-cart-btn"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        : state?.data.map((el) => (
            <div key={el.id} className="card">
              <h2>{el.name}</h2>
              <img src={el.imageURL} alt={el.id} />
              <div className="price_div">
                <h3>Rs{el.price}</h3>
                <button
                  onClick={() => addToCart(el, dispatch)}
                  className="add-to-cart-btn"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Products;
