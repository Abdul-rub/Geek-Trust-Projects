import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">TeeRex Store</Link>
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link to="/">Products</Link>
          </li>
          <li>
         <Link to="/cart" ><i style={{fontSize:"50px"}} className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;