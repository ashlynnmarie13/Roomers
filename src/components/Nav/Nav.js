import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import logo from "./logo_transparent.png";
import { NavLink, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getUserById } from "../../redux/ducks/userReducer";
import axios from "axios";
import { connect } from "react-redux";
class Nav extends Component {
  state = {
    userInfo: {}
  };

  getProfile() {
    const { authID } = this.props.user;
    console.log(authID);
    axios.get(`/api/user/info/${authID}`).then(response => {
      return response.data.profilePic;
    });
  }

  render() {
    let profilePic = this.getProfile();

    return (
      <div className="Nav">
        <div className="box1">
          <NavLink to="/myprofile/:id" className="nav-pic">
            <img src={profilePic} alt="pic" className="profile-pic-nav" />
          </NavLink>
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "white",
              border: "solid #031424 2px",
              color: "#031424",
              width: "30%",
              height: "70%",
              fontSize: "1.2em"
            }}
          >
            <Link to="/chat" style={{ color: "#031424" }}>
              Messages
            </Link>
          </Button>
        </div>

        <Link to="/home" className="home">
          ROOMERS
        </Link>

        <div className="listings">
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "white",
              border: "solid #031424 2px",
              color: "#031424",
              width: "35%",
              height: "100%",
              fontSize: "1.2em"
            }}
          >
            <Link to="/searchrooms" style={{ color: "#031424" }}>
              {" "}
              Search
            </Link>
          </Button>
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#031424",
              border: "solid #031424 2px",
              color: "white",
              width: "35%",
              height: "100%",
              fontSize: "1.2em"
            }}
          >
            <Link to="/addlisting" style={{ color: "white" }}>
              {" "}
              Add Listing
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(state => state)(Nav);
