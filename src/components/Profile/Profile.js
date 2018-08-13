import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";

import ProfileCard from "../ProfileCard/ProfileCard";

class Profile extends Component {
  state = {
    userInfo: [],
    userP: [],
    Prefs: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(
        response =>
          this.setState({
            userInfo: [{ ...response.data, id }],
            userP: [{ ...response.data.prefs, id }]
          }),
        () => console.log(this.state.userInfo)
      );
  }

  render() {
    const userInfo = this.state.userInfo.map((user, i) => {
      const { profilePic, birthday, aboutMe, name, title, phone, prefs } = user;
      return (
        <div>
          <div className="profilec">
            <ProfileCard
              key={i}
              profilePic={profilePic}
              birthday={birthday}
              name={name}
            />
          </div>
          <div className="rightBox">
            <div className="header">
              <h2>ABOUT {name}</h2>
              <br />
            </div>
            <div className="innerB">
              <div className="sum">
                <h2>Summary</h2>
                <br /> {aboutMe}
              </div>
              <br />
              <div className="Work">
                <h2>Work Information</h2>
                <br />
                {title}
              </div>
              <div className="phone">
                <h2>Phone</h2>
                <br />
                {phone}
              </div>
            </div>
          </div>
        </div>
      );
    });
    console.log(this.state.userP);
    console.log(this.state.userInfo);
    return (
      <div>
        <div className="profileM">{userInfo}</div>
      </div>
    );
  }
}

export default Profile;
