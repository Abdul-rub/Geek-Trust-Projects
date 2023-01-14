import React, { useReducer, useEffect } from "react";

const initialState = {
  loading: true,
  data: [],
  error: null,
  cartItems: [],
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "INCREASE_QUANTITY":
      const increaseProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      increaseProduct.quantity += 1;
      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case "DECREASE_QUANTITY":
      const decreaseProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (decreaseProduct.quantity > 0) {
        decreaseProduct.quantity -= 1;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      throw new Error();
  }
};

const DataFetchingContext = React.createContext();

const DataFetchingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      const data = await response.json();

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: error.message });
    }
  };
  //Add to Cart
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  //Inc Quantity
  const increaseQuantity = (product) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  //Dec Quantity
  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  //Delete Cart Item
  const DeleteItem = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload:product });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataFetchingContext.Provider
      value={{
        state,
        fetchData,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        DeleteItem,
      }}
    >
      {children}
    </DataFetchingContext.Provider>
  );
};

export { DataFetchingContext, DataFetchingProvider };
