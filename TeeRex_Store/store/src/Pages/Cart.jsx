import React, { useContext } from "react";
import { DataFetchingContext } from "../Context/Reducer";
import "../styles/Cart.css";

const Cart = () => {
  const { state,increaseQuantity, decreaseQuantity, DeleteItem} = useContext(DataFetchingContext);



  const totalAmount = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0)

  return (
    <div className="cart-grid">
      {state.cartItems.map((item) => (
        <div key={item.id} className="cart-_box">
          <img className="cart_img" src={item.imageURL} alt={item.id} />
          <h2>{item.name}</h2>
          <h2>Rs{item.price}</h2>
          <div>
            <button onClick={() => decreaseQuantity(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item)}>+</button>
          </div>
          <button onClick={() => DeleteItem(item)}>Delete</button>
        </div>
      ))}
      <div className="total">
        <span>Total Price of Cart</span>
        <span>Rs- {totalAmount}</span>
      </div>
    </div>
  );
};

export default Cart;
