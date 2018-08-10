import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";

class Profile extends Component {
  state = {
    userInfo: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(
        response => this.setState({ userInfo: { ...response.data, id } }),
        () => console.log(this.state.userInfo)
      );
  }

  render() {
    return <div>Profile</div>;
  }
}

export default Profile;
