import React, { useContext } from "react";
import { DataFetchingContext } from "../Context/Reducer";
import "../styles/Products.css";

const Products = () => {
  const { state,addToCart } = useContext(DataFetchingContext);
  console.log(state)

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <div className="card-grid">
      {state.data.map((el) => (
        <div key={el.id} className="card">
          <h2>{el.name}</h2>
          <img src={el.imageURL} alt={el.id} />
          <div className="price_div">
            <h3>Rs{el.price}</h3>
            <button
              onClick={() => addToCart(el)}
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
