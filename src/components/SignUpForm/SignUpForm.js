import React, { Component } from "react";
import { Input, Checkbox, TextArea, Button, Icon } from "semantic-ui-react";
import { addUserInfo } from "../../redux/ducks/userReducer";
import { connect } from "react-redux";
import "./SignUpForm.css";
import axios from "axios";

class SignUpForm extends Component {
  state = {
    userID: "",
    name: "",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    about: "",
    profilePic: {},
    title: "",
    companyName: "",
    description: "",
    clean: true,
    healthy: true,
    professional: true,
    student: true,
    earlyBird: true,
    nightOwl: true,
    fitnessEnthusiast: true,
    creative: true,
    bookworm: true,
    foodie: true,
    partyAnimal: true,
    vegan: true,
    introverted: true,
    smoke: true,
    clean: true,
    guests: true,
    pets: true
  };

  fileSelectHandler = e => {
    console.log(e.target.files[0]);
    this.setState({ profilePic: e.target.files[0] });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkboxHandler = e => {
    this.setState({ [e.target.name]: !e.target.checked });
  };

  submitHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("profilePic", this.state.profilePic);

    axios.post("/api/upload", formData).then(response => {
      console.log(response);
      this.props.addUserInfo({
        ...this.state,
        userID: this.props.user.authID,
        profilePic: response.data
      });
      this.props.history.push("/home");
    });
  };

  render() {
    return (
      <div className="sign-up">
        <div className="picture" />
        <form
          encType="multipart/form-data"
          onSubmit={event => this.submitHandler(event)}
          className="sign-up-form"
        >
          <div className="section">
            <h1 className="section-title">Basic Info</h1>
            <div className="input">
              <p className="section-item">Name:</p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="name"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Gender:</p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="gender"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Email:</p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="email"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Phone:</p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="phone"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Date of Birth:</p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="dob"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">A little about you:</p>
              <TextArea
                style={{ width: "100%", height: "200px", margin: "20px 0" }}
                onChange={event => this.imputHandler(event)}
                name="about"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Upload a photo:</p>
              <input
                onChange={event => this.fileSelectHandler(event)}
                name="profilePic"
                type="file"
              />
            </div>
          </div>
          <div className="section section-traits">
            <h1 className="section-title">Traits:</h1>
            <div />
            <label htmlFor="clean">Clean</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="clean"
              id="clean"
              type="checkbox"
              checked={!this.state.clean}
            />
            <label htmlFor="healthy">Healthy</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="healthy"
              id="healthy"
              type="checkbox"
              checked={!this.state.healthy}
            />
            <label htmlFor="professional">Professional</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="professional"
              id="professional"
              type="checkbox"
              checked={!this.state.professional}
            />
            <label htmlFor="student">Student</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="student"
              id="student"
              type="checkbox"
              checked={!this.state.student}
            />
            <label htmlFor="earlyBird">Early Bird</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="earlyBird"
              id="earlyBird"
              type="checkbox"
              checked={!this.state.earlyBird}
            />
            <label htmlFor="nightOwl">Night Owl</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="nightOwl"
              id="nightOwl"
              type="checkbox"
              checked={!this.state.nightOwl}
            />
            <label htmlFor="fitnessEnthusiast">Fitness Enthusiast</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="fitnessEnthusiast"
              id="fitnessEnthusiast"
              type="checkbox"
              checked={!this.state.fitnessEnthusiast}
            />
            <label htmlFor="creative">Creative</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="creative"
              id="creative"
              type="checkbox"
              checked={!this.state.creative}
            />
            <label htmlFor="bookworm">Bookworm</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="bookworm"
              id="bookworm"
              type="checkbox"
              checked={!this.state.bookworm}
            />
            <label htmlFor="foodie">Foodie</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="foodie"
              id="foodie"
              type="checkbox"
              checked={!this.state.foodie}
            />
            <label htmlFor="partyAnimal">Party Animal</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="partyAnimal"
              id="partyAnimal"
              type="checkbox"
              checked={!this.state.partyAnimal}
            />
            <label htmlFor="vegan">Vegan</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="vegan"
              id="vegan"
              type="checkbox"
              checked={!this.state.vegan}
            />
            <label htmlFor="introverted">Introverted</label>
            <Checkbox
              toggle
              onChange={event => this.checkboxHandler(event)}
              name="introverted"
              id="introverted"
              type="checkbox"
              checked={!this.state.introverted}
            />
          </div>
          <div className="section">
            <h1 className="section-title">Career:</h1>
            <p className="section-item">Job Title:</p>
            <Input
              onChange={event => this.inputHandler(event)}
              name="title"
              type="text"
            />
            <p className="section-item">Company Name:</p>
            <Input
              onChange={event => this.inputHandler(event)}
              name="companyName"
              type="text"
            />
          </div>

          <div className="section">
            <h1 className="section-title">Description:</h1>
            <p className="section-item">What are you looking for?</p>
            <TextArea
              style={{ width: "500px", height: "200px", margin: "20px 0" }}
              onChange={event => this.inputHandler(event)}
              name="description"
              type="text"
            />
          </div>

          <div className="section">
            <h1 className="section-title">Preferences:</h1>
            <div className="pref-item">
              <Checkbox
                onChange={event => this.checkboxHandler(event)}
                name="smoke"
                id="smoke"
                type="checkbox"
                checked={!this.state.smoke}
              />
              <label htmlFor="smoke">
                Smoker <i className="fas fa-smoking" />
              </label>
            </div>
            <div className="pref-item">
              <Checkbox
                onChange={event => this.checkboxHandler(event)}
                name="guests"
                id="guests"
                type="checkbox"
                checked={!this.state.guests}
              />
              <label htmlFor="guests">
                Guests <i className="fas fa-users" />
              </label>
            </div>
            <div className="pref-item">
              <Checkbox
                onChange={event => this.checkboxHandler(event)}
                name="pets"
                id="pets"
                type="checkbox"
                checked={!this.state.pets}
              />
              <label className="" htmlFor="pets">
                Pets <i className="fas fa-paw" />
              </label>
            </div>
          </div>
          <div className="button">
            <Button style={{ margin: "0 auto" }} animated>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  state => state,
  { addUserInfo }
)(SignUpForm);
