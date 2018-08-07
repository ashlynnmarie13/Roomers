import React, { Component } from "react";
import "./Nav.css"
import "../../App";
import { Link } from "react-router-dom";


class Nav extends Component {




  render(){

    return (
      
      <div className="Nav">
      <div>
      <Link to="/Wishlist">
            <i className="WishList"/>Wish List
          </Link>
      </div>
      
      
      </div>

    )
  }
}
export default Nav;