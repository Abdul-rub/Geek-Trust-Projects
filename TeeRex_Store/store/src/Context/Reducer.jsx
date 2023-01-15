import React, { useReducer, useEffect } from "react";

const initialState = {
  loading: true,
  data: [],
  error: null,
  cartItems: [],
  filterData: [],
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
    case "FILTER_PRODUCT":
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      throw new Error();
  }
};

const DataFetchingContext = React.createContext();

const DataFetchingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const fetchData = async (params) => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await fetch(
        `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`,
        params
      );
      const data = await response.json();

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE", payload: error.message });
    }
  };
  //Add to Cart
  const addToCart = (product,dispatch) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  //Inc Quantity
  const increaseQuantity = (product,dispatch) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  //Dec Quantity
  const decreaseQuantity = (product,dispatch) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  //Delete Cart Item
  const DeleteItem = (product,dispatch) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  //FilterData
  const getFilteredData = (data, colors, prices, genders, type, dispatch) => {
    let temp = data;
    if (prices.length) {
      temp = data.filter((el) => {
        if (prices.includes(0)) {
          if (el.price > 0 && el.price <= 250) {
            return el;
          }
        }
        if (prices.includes(250)) {
          if (el.price > 251 && el.price <= 450) {
            return el;
          }
        }
        if (prices.includes(450)) {
          if (el.price >= 451) {
            return el;
          }
        }
      });
    }

    if (colors.length) {
      temp = temp.filter((el) => {
        return colors.includes(el.color);
      });
    }


    if (genders.length) {
      temp = temp.filter((el) => {
        return genders.includes(el.gender);
      });
    }

    if (type.length) {
      temp = temp.filter((el) => {
        console.log(temp)
        return type.includes(el.type);
      });
    }
    dispatch({ type: "FILTER_PRODUCT", payload: temp });
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
        getFilteredData,
        dispatch
      }}
    >
      {children}
    </DataFetchingContext.Provider>
  );
};

export { DataFetchingContext, DataFetchingProvider };
