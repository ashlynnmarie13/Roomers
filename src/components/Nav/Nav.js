import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import logo from "./logo_transparent.png";
import { NavLink, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div className="box1">
          <NavLink to="/profile" className="logo">
            <img src="" alt="logo" />
          </NavLink>
          <Button>
            <Link
              to="/mylistings"
              className="mylistings"
              activeStyle={{ color: "#CF6766" }}
            >
              <i className="Mylistings" /> My Listings
            </Link>
          </Button>

          <NavLink
            to="/wishlist"
            className="wishlist"
            activeStyle={{ color: "#CF6766" }}
          >
            <i activeClassName="WishList" /> Wish List
          </NavLink>
        </div>

        <Link to="/home" className="home">
          <img src={logo} alt="logo" />
        </Link>

        <div className="listings">
          <NavLink
            to="/searchrooms"
            className="searchlistings"
            activeStyle={{ color: "#CF6766" }}
          >
            <i activeClassName="Searchlistings" /> Search Listings
          </NavLink>
          <Link to="/addlisting" className="addlistings">
            <i className="Addlistings" /> Add New Listing
          </Link>
          <Link to="/chat">
            <i class="fa fa-comment" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }
}
export default Nav;
