import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Profile.css";
import { ENGINE_METHOD_DIGESTS } from "constants";
import moment from "moment";
import MyListings from "../MyListings/MyListings";
import { Button, Card, Image, Icon, Segment } from "semantic-ui-react";

class Profile extends Component {
  state = {
    userInfo: {},
    listings: []
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
    const { userInfo } = this.state;

    const birthday = userInfo.birthday;
    let age = moment().diff(birthday, "years");

    const traits = userInfo.traits;

    var traitsArray = [];

    function RemoveFalse() {
      for (var key in traits) {
        if (traits[key] === false) {
          delete traits[key];
        } else {
          traitsArray.push(key);
        }
      }
    }
    RemoveFalse();

    // for (let i in showTraits) {
    //   console.log(showTraits.traits);
    //   if (showTraits.bookworm === false) {
    //     console.log("bookworm");
    //   } else {
    //     console.log("well this is something");
    //   }
    // }

    // delete Employee.firstname;

    return (
      <div className="profile">
        <div className="person">
          <Card style={{ width: "100%", marginTop: "-50%" }}>
            <Image src={userInfo.profilePic} alt="" className="image" />
            <Card.Content>
              <Card.Header>
                <div className="header">{userInfo.name}</div>
              </Card.Header>
              <div className="age">{age}</div>
              <div className="title">{userInfo.title}</div>
            </Card.Content>
          </Card>
        </div>

        <div className="info">
          <Card style={{ width: "100%", height: "60vh" }}>
            <Card.Content>
              <div className="aboutMe">
                <Card.Header style={{ color: "#30415D" }}>
                  <div className="header"> About {userInfo.name}</div>
                </Card.Header>
                <div className="description"> Summary</div>{" "}
                <div className="description"> {userInfo.aboutMe}</div>
                <div className="description"> I'd describe myself as... </div>
                <div>
                  <div>
                    {traitsArray[0]}
                    {"  "}
                  </div>
                  <div>
                    {traitsArray[1]}
                    {"  "}
                  </div>
                  <div>
                    {traitsArray[2]}
                    {"  "}
                  </div>
                  <div>
                    {traitsArray[3]}
                    {"  "}
                  </div>
                  <div>
                    {traitsArray[4]}
                    {"  "}
                  </div>
                  <div>
                    {traitsArray[5]}
                    {"  "}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card style={{ width: "100%", height: "60vh" }}>
            <Card.Content>
              <div className="looking">
                <Card.Header style={{ color: "#30415D" }}>
                  {" "}
                  <div className="header"> What I'm looking for:</div>
                </Card.Header>
                <div className="description">
                  {" "}
                  {userInfo.interestsDescription}
                </div>
                <div className="description">
                  {" "}
                  {/* {userInfo.prefs} */}
                  PREFS
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card style={{ width: "100%", height: "60vh" }}>
            <Card.Content>
              <div className="listings">
                <MyListings />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Profile);
