import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import logo from "./logo_transparent.png";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div>
          <Link to="/profile" className='logo'>
            <img src="" alt="logo" />
          </Link>

          <Link to="/wishlist" className="wishlist">
            <i className="WishList" /> Wish List
          </Link>
        </div>
        {/* <p>ROOMERS</p> */}
        <Link to="/home" className='home'><img src={logo} alt="logo" /></Link>
        <div className='listings'>
          <Link to="/addlisting" className="addlistings">
            <i className="Addlistings" /> Add New Listings
          </Link>
          <Link to="/searchrooms" className="searchlistings">
            <i className="Searchlistings" /> Serch Listings
          </Link>
          <Link to="/mylistings" className="mylistings">
            <i className="Mylistings" /> My Listings
          </Link>
        </div>
      </div>
    );
  }
}
export default Nav;

