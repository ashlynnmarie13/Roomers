import React, { Component } from "react";
import { Input, Checkbox, TextArea } from "semantic-ui-react";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    about: "",
    profilePic: "",
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

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkboxHandler = e => {
    this.setState({ [e.target.name]: !e.target.checked });
  };

  render() {
    return (
      <div className="sign-up">
        <div className="picture" />
        <form className="sign-up-form">
          <div className="section">
            <h1 className="section-title">Basic Info</h1>
            <div className="input">
              <p p className="section-item">
                Name:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="name"
                type="text"
              />
            </div>
            <div className="input">
              <p p className="section-item">
                Gender:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="gender"
                type="text"
              />
            </div>
            <div className="input">
              <p p className="section-item">
                Email:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="email"
                type="text"
              />
            </div>
            <div className="input">
              <p p className="section-item">
                Phone:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="phone"
                type="text"
              />
            </div>
            <div className="input">
              <p p className="section-item">
                Date of Birth:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
                name="dob"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">A little about you:</p>
              <TextArea
                style={{ width: "100%", height: "200px" }}
                onChange={event => this.inputHandler(event)}
                name="about"
                type="text"
              />
            </div>
            <div className="input">
              <p p className="section-item">
                Upload a photo:
              </p>
              <Input
                onChange={event => this.inputHandler(event)}
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
            <p p className="section-item">
              Job Title:
            </p>
            <Input
              onChange={event => this.inputHandler(event)}
              name="title"
              type="text"
            />
            <p p className="section-item">
              Company Name:
            </p>
            <Input
              onChange={event => this.inputHandler(event)}
              name="companyName"
              type="text"
            />
          </div>

          <div className="section">
            <h1 className="section-title">Description:</h1>
            <p p className="section-item">
              What are you looking for?
            </p>
            <TextArea
              style={{ width: "100%", height: "200px" }}
              onChange={event => this.inputHandler(event)}
              name="description"
              type="text"
            />
          </div>

          <div className="section">
            <h1 className="section-title">Preferences:</h1>
            <Checkbox
              onChange={event => this.checkboxHandler(event)}
              name="smoke"
              id="smoke"
              type="checkbox"
              checked={!this.state.smoke}
            />
            <label htmlFor="smoke">
              Smoker <i class="fas fa-smoking" />
            </label>
            <Checkbox
              onChange={event => this.checkboxHandler(event)}
              name="clean"
              id="clean"
              type="checkbox"
              checked={!this.state.clean}
            />
            <label htmlFor="clean">
              Clean <i class="fas fa-shower" />
            </label>
            <Checkbox
              onChange={event => this.checkboxHandler(event)}
              name="guests"
              id="guests"
              type="checkbox"
              checked={!this.state.guests}
            />
            <label htmlFor="guests">
              Guests <i class="fas fa-users" />
            </label>
            <Checkbox
              onChange={event => this.checkboxHandler(event)}
              name="pets"
              id="pets"
              type="checkbox"
              checked={!this.state.pets}
            />
            <label htmlFor="pets">
              Pets <i class="fas fa-paw" />
            </label>
          </div>
        </form>
      </div>
    );
  }
}
