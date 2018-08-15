import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Profile.css";
import moment from "moment";
import TheirListings from "../TheirListings/TheirListings";
import { Button, Card, Image, Icon, Segment } from "semantic-ui-react";

import ProfileCard from "../ProfileCard/ProfileCard";

class Profile extends Component {
  state = {
    userInfo: {},
    listings: [],
    address: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(response => this.setState({ userInfo: { ...response.data, id } }));
  }

  render() {
    const { userInfo } = this.state;

    const birthday = userInfo.birthday;
    let age = moment().diff(birthday, "years");

    const traits = userInfo.traits;
    const prefs = userInfo.prefs;

    var traitsArray = [];
    var prefsArray = [];
    0;

    function RemoveFalse() {
      for (var key in traits) {
        if (traits[key] === false) {
          delete traits[key];
        } else {
          traitsArray.push(key);
        }
      }
    }
    function RemoveFalsePrefs() {
      for (var key in prefs) {
        if (prefs[key] === false) {
          delete prefs[key];
        } else {
          prefsArray.push(key);
        }
      }
    }
    RemoveFalse();

    RemoveFalsePrefs();
    console.log("myObj: ", traits);
    console.log("myArray: ", traitsArray);
    console.log("myPObj: ", prefs);
    console.log("myPArray: ", prefsArray);

    const finalPrefsArray = [];

    function PrefsReplaceSmoke() {
      for (let i in prefsArray) {
        if (prefsArray.includes("smoke")) {
          return prefsArray.splice(0, 1, "yes");
        } else {
          return prefsArray.splice(0, 1, "no");
        }
      }
    }
    function PrefsReplaceClean() {
      for (let i in prefsArray) {
        if (prefsArray.includes("clean")) {
          return prefsArray.splice(1, 1, "I clean frequently");
        } else {
          return prefsArray.splice(1, 1, "I honestly don't clean often");
        }
      }
    }
    function PrefsReplaceGuests() {
      for (let i in prefsArray) {
        if (prefsArray.includes("guests")) {
          return prefsArray.splice(2, 1, "Guests are fine with me");
        } else {
          return prefsArray.splice(2, 1, "I prefer to not have guests over");
        }
      }
    }

    function PrefsReplacePets() {
      for (let i in prefsArray) {
        if (prefsArray.includes("pets")) {
          return prefsArray.splice(3, 1, "Pets are welcome!");
        } else {
          return prefsArray.splice(3, 1, "No pets allowed");
        }
      }
    }
    PrefsReplaceSmoke();
    PrefsReplaceClean();
    PrefsReplaceGuests();
    PrefsReplacePets();
    console.log(prefsArray);

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
                  Preferences:
                  <div>
                    Do I smoke?
                    <div>{prefsArray[0]}</div>
                  </div>
                  <div>
                    How often I clean...
                    <div>{prefsArray[1]}</div>
                  </div>
                  <div>
                    Guests...
                    <div />
                    {prefsArray[2]}
                  </div>
                  <div>
                    Pets...
                    <div>{prefsArray[3]}</div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card style={{ width: "100%", height: "60vh" }}>
            <Card.Content>
              <div className="listings">
                <TheirListings userInfo={userInfo} />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Profile);
