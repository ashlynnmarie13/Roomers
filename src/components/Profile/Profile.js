import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  state = {
    userInfo: {}
  };

  componentDidMount() {
    const { authID } = this.props.user;
    axios
      .get(`/api/user/info/${authID}`)
      .then(response =>
        this.setState({ userInfo: { ...response.data, authID } })
      );
  }

  render() {
    return <div>Profile</div>;
  }
}

export default connect(state => state)(Profile);
