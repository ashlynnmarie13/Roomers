import React, { Component } from "react";
import "./Nav.css";
import "../../App";
import { NavLink, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getUserById, getUser } from "../../redux/ducks/userReducer";
import axios from "axios";
import Logout from "../Login/Logout";
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
              height: "70%",
              fontSize: "1.2em"
            }}
          >
            <Link
              to="/chat"
              style={{ color: "#031424" }}
              className="expand-link"
            >
              Messages
            </Link>
          </Button>
          <Logout>
            <Button>
              style=
              {{
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
            </Button>
          </Logout>
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
            <NavLink
              to="/search/rooms"
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
              border: "solid #031424 2px",
              color: "white",
              width: "35%",
              height: "100%",
              fontSize: "1.2em"
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
