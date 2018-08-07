import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div>
          <Link to="/profile">
            <img src="" alt="logo" />
          </Link>

          <Link to="/wishlist">
            <i className="WishList" /> Wish List
          </Link>
        </div>
        {/* <p>ROOMERS</p> */}
        <Link to="/home">ROOMERS</Link>
        <div className='listings'>
          <Link to="/addlisting">
            <i className="Addlistings" /> Add New Listings
          </Link>
          <Link to="/searchrooms">
            <i className="Searchlistings" /> Serch Listings
          </Link>
          <Link to="/mylistings">
            <i className="Mylistings" /> My Listings
          </Link>
        </div>
      </div>
    );
  }
}
export default Nav;
