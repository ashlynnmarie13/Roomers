import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import logo from "./logo_transparent.png";
import { NavLink, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getUserById } from "../../redux/ducks/userReducer";

class Nav extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     userInfo: {}
  //   };
  // }

  // componentDidMount() {
  //   if (this.props.match.params.id) {
  //     getUserById(this.props.match.params.id);
  //   }
  //   console.log(this.props);
  //   // const navUser =
  //   // this.setState({userInfo: {...response.data, id}})
  // }

  render() {
    return (
      <div className="Nav">
        <div className="box1">
          <NavLink to="/myprofile/:id" className="logo">
            <img src="" alt="logo" />
          </NavLink>
          <Button>
            <Link to="/mylistings">My Listings</Link>
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
