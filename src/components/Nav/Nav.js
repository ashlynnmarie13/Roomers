import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import { NavLink, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getUser } from "../../redux/ducks/userReducer";
import axios from "axios";
import { connect } from "react-redux";

class Nav extends Component {
  state = {
    userInfo: {}
  };

  async componentDidMount() {
    await this.props.getUser();
    const { authID } = this.props.user;
    axios
      .get(`/api/user/info/${authID}`)
      .then(response =>
        this.setState({ userInfo: { ...response.data, authID } })
      );
  }

  render() {
    const { profilePic } = this.state.userInfo;
    return (
      <div className="Nav">
        <div className="box1">
          <NavLink to="/myprofile" className="nav-pic">
            <img src={profilePic} alt="pic" className="profile-pic-nav" />
          </NavLink>

          <NavLink
            to="/chat/ "
            style={{ color: "#031424" }}
            className="expand-link"
          >
            <Button
              className="nav-button"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "white",
                border: "solid #031424 2px",
                color: "#031424",
                width: "70%",
                height: "38%",
                fontSize: "1em"
              }}
            >
              {" "}
              Messages
            </Button>
          </NavLink>
          <div style={{ marginRight: "20%", height: "52%" }}>
            <a href={process.env.REACT_APP_LOGOUT}>
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "#031424",
                  border: "solid #031424 4px",
                  color: "white",
                  width: "100%",
                  height: "100%",
                  fontSize: "1em"
                }}
              >
                Log Out
              </Button>
            </a>
          </div>
        </div>

        <Link to="/home" className="logo">
          ROOMERS
        </Link>

        <div className="listings">
          <Button
            className="nav-button"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "white",
              border: "solid #031424 2px",
              color: "#031424",
              width: "25%",
              height: "85%",
              fontSize: "1em",
              marginLeft: "35%"
            }}
          >
            <NavLink
              to="/search/rooms/ "
              style={{ color: "#031424" }}
              className="expand-link"
            >
              {" "}
              Search
            </NavLink>
          </Button>
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#031424",

              color: "white",
              width: "25%",
              height: "85%",
              fontSize: "1em",
              paddingRight: "5%"
            }}
          >
            <Link
              to="/addlisting"
              style={{ color: "white" }}
              className="expand-link"
            >
              {" "}
              Add Listing
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { getUser }
)(Nav);
