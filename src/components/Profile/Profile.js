import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import { Carousel } from "react-bootstrap";
import ProfileCard from "../ProfileCard/ProfileCard";
class Profile extends Component {
  state = {
    userInfo: {}
  };

  componentDidMount() {
    const { name, id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(
        response => this.setState({ userInfo: { ...response.data, name } }),
        () => console.log(this.state.userInfo)
      );
  }

  render() {
    console.log(this.state.userInfo);
    return (
      <div>
        {" "}
        <ProfileCard profilePic={this.state.userInfo} />
      </div>
    );
  }
}

export default Profile;
