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
    id: "",
    address: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(response =>
        this.setState({ userInfo: { ...response.data, id }, id: id })
      );
  }

  render() {
    const { userInfo } = this.state;
    const id = this.state;
    console.log(userInfo);

    const birthday = userInfo.birthday;
    let age = moment().diff(birthday, "years");

    const traits = userInfo.traits;
    const prefs = userInfo.prefs;

    var traitsArray = [];
    var prefsArrayFalse = [];
    var prefsArrayTrue = [];

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
          prefsArrayTrue.push(key);
        }
      }
    }

    function RemoveTruePrefs() {
      for (var key in prefs) {
        if (prefs[key] === true) {
          prefsArrayFalse.push(key);
        }
      }
    }

    RemoveFalse();
    RemoveFalsePrefs();
    RemoveTruePrefs();

    const prefsStringTrue = prefsArrayTrue.join();

    const truePrefsString = prefsStringTrue
      .replace(/smoke/gi, "I don't smoke")
      .replace(/clean/gi, "I don't clean very often...")
      .replace(/guests/gi, "I'd prefer not to have guests over")
      .replace(/pets/gi, "I don't have any pets");

    const prefsStringFalse = prefsArrayFalse.join();

    const falsePrefsString = prefsStringFalse
      .replace(/smoke/gi, "I'm a smoker")
      .replace(/clean/gi, "I'm very clean and organized")
      .replace(/guests/gi, "Guests are welcome!")
      .replace(/pets/gi, "I have pets");

    const finalPrefsTrue = truePrefsString.split(",");
    const finalPrefsFalse = falsePrefsString.split(",");

    const finalPrefs = finalPrefsTrue.concat(finalPrefsFalse);
    console.log(finalPrefs);

    let preferences = finalPrefs.map(val => {
      return <p className="list-item">{val}</p>;
    });

    const traitsString = traitsArray.join();
    console.log(traitsString);
    const newString = traitsString
      .replace(/earlyBird/gi, "Early Bird")
      .replace(/organized/gi, "Organized")
      .replace(/healthy/gi, "Healthy")
      .replace(/professional/gi, "Professional")
      .replace(/student/gi, "Student")
      .replace(/nightOwl/gi, "Night Owl")
      .replace(/fitnessEnthusiast/gi, "Fitness Enthusiast")
      .replace(/creative/gi, "Creative")
      .replace(/bookworm/gi, "Bookworm")
      .replace(/foodie/gi, "Foodie")
      .replace(/partyAnimal/gi, "Party Animal")
      .replace(/vegan/gi, "Vegan")
      .replace(/introverted/gi, "Introverted");
    console.log(newString);

    const finalTraits = newString.split(",");
    console.log(finalTraits);

    let myTraits = finalTraits.map(val => {
      return <p className="list-item">{val}</p>;
    });

    return (
      <div className="profile">
        <div className="person">
          <Card style={{ width: "90%", height: "50%" }}>
            <Image
              style={{ objectFit: "cover" }}
              src={userInfo.profilePic}
              alt=""
              className="image"
            />
            <Card.Content>
              <Card.Header>
                <div className="header-two">{userInfo.name}</div>
              </Card.Header>
              <div className="age">{age}</div>
              <div className="title">{userInfo.title}</div>
            </Card.Content>
          </Card>
        </div>

        <div className="info">
          <Card
            style={{
              width: "90%",
              height: "40vh",
              padding: "3%",
              border: "1px solid rgb(142, 174, 189, 0.4)",
              marginTop: "3%"
            }}
          >
            <Card.Content>
              <div className="aboutMe">
                <Card.Header style={{ color: "#30415D" }}>
                  <div className="header-two">
                    {" "}
                    <i class="fas fa-user-circle" /> {"  "}
                    About {userInfo.name}
                  </div>
                </Card.Header>
                <div className="about-content">
                  <div className="description">
                    {" "}
                    <div className="middle-header">Summary</div>{" "}
                    <div> {userInfo.aboutMe}</div>
                  </div>
                  <div className="middle-header">
                    {" "}
                    I'd describe myself as...{" "}
                  </div>
                  <div className="traits">{myTraits}</div>
                </div>
              </div>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "90%",
              height: "30vh",
              padding: "3%",
              border: "1px solid rgb(142, 174, 189, 0.4)"
            }}
          >
            <Card.Content>
              <div className="looking">
                <Card.Header style={{ color: "#30415D" }}>
                  {" "}
                  <div className="header-two">
                    <i class="fas fa-eye" /> {"  "} What I'm looking for:
                  </div>
                </Card.Header>
                <div className="description">
                  {" "}
                  {userInfo.interestsDescription}
                </div>
                <div className="description pref-column">
                  <div className="middle-header"> Preferences</div>
                  <div className="my-preferences">{preferences}</div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <div className="listing-box">
            <div className="header-two" style={{ marginTop: "2%" }}>
              <i class="fas fa-home" /> {"  "}
              My Listings{" "}
            </div>
            <div className="my-listings">
              <TheirListings userInfo={userInfo} id={id} />
            </div>
          </div>
        </div>
        <div className="pictureprofile" />
      </div>
    );
  }
}

export default connect(state => state)(Profile);
