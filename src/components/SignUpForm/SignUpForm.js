import React, { Component } from "react";

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
    clean: false
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkboxHandler = e => {
    this.setState({ [e.target.name]: !e.target.value });
  };

  render() {
    return (
      <form>
        <h1>Basic Info</h1>
        <p>Name:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="name"
          type="text"
        />
        <p>Gender:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="gender"
          type="text"
        />
        <p>Email:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="email"
          type="text"
        />
        <p>Phone:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="phone"
          type="text"
        />
        <p>Date of Birth:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="dob"
          type="text"
        />
        <p>A little about you:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="about"
          type="text"
        />
        <p>Upload a photo:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="profilePic"
          type="file"
        />
        <h1>Career:</h1>
        <p>Job Title:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="title"
          type="text"
        />
        <p>Company Name:</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="companyName"
          type="text"
        />
        <h1>Description:</h1>
        <p>What are you looking for?</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="description"
          type="text"
        />
        <h1>Traits:</h1>
        <input
          onChange={event => this.checkboxHandler(event)}
          name="clean"
          id="checkbox"
          type="checkbox"
          value={this.state.clean}
        />
        <label for="checkbox">Clean</label>
        <input
          onChange={event => this.checkboxHandler(event)}
          name="clean"
          id="checkbox"
          type="checkbox"
          value={this.state.clean}
        />
        <label for="checkbox">Clean</label>
        <input
          onChange={event => this.checkboxHandler(event)}
          name="clean"
          id="checkbox"
          type="checkbox"
          value={this.state.clean}
        />
        <label for="checkbox">Clean</label>
        <input
          onChange={event => this.checkboxHandler(event)}
          name="clean"
          id="checkbox"
          type="checkbox"
          value={this.state.clean}
        />
        <label for="checkbox">Clean</label>
      </form>
    );
  }
}
