import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Profile.css";
import { ENGINE_METHOD_DIGESTS } from "constants";
import moment from "moment";
import TheirListings from "../TheirListings/TheirListings";
import { Button, Card, Image, Icon, Segment } from "semantic-ui-react";

class Profile extends Component {
  state = {
    userInfo: {},
    listings: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/user/info/${id}`)
      .then(response => this.setState({ userInfo: { ...response.data, id } }));
  }

  render() {
    const { userInfo } = this.state;
    console.log(userInfo);

    const birthday = userInfo.birthday;
    let age = moment().diff(birthday, "years");

    const traits = userInfo.traits;
    const prefs = userInfo.prefs;

    var traitsArray = [];
    var prefsArray = [];

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
    return (
      <div className="profile">
        <div className="person">
          <Card style={{ width: "90%", height: "60%" }}>
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
          <Card style={{ width: "85%", height: "50vh" }}>
            <Card.Content>
              <div className="aboutMe">
                <Card.Header style={{ color: "#30415D" }}>
                  <div className="header"> About {userInfo.name}</div>
                </Card.Header>
                <div className="description">
                  {" "}
                  <div className="middle-header">Summary</div>{" "}
                  <div> {userInfo.aboutMe}</div>
                </div>
                <div className="description middle-header">
                  {" "}
                  I'd describe myself as...{" "}
                </div>
                <div className="traits">
                  <Card.Group>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[0]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[1]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[2]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[3]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[4]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[5]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[6]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[7]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[8]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[9]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[10]}
                      {"  "}
                    </Card>
                    <Card
                      style={{
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5vh"
                      }}
                    >
                      {finalTraits[11]}
                      {"  "}
                    </Card>
                  </Card.Group>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card style={{ width: "85%", height: "40vh" }}>
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
                <div className="description pref-column middle-header">
                  <div className="middle-header"> Preferences:</div>

                  <div className="preferences">
                    <div className="scoot">
                      <div className="bold">Do I smoke?</div>
                      <div>{prefsArray[0]}</div>
                    </div>
                    <div>
                      <div className="bold">How often I clean...</div>
                      <div>{prefsArray[1]}</div>
                    </div>
                  </div>
                  <div className="preferences">
                    <div>
                      <div className="bold">Guests...</div>

                      {prefsArray[2]}
                    </div>
                    <div className="scoot-pets">
                      <div className="bold">Pets...</div>
                      <div>{prefsArray[3]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card style={{ width: "85%", height: "60vh" }}>
            <Card.Content>
              <TheirListings userInfo={userInfo} />
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Profile);
