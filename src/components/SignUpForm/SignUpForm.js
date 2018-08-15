import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
import {
  Input,
  Checkbox,
  TextArea,
  Button,
  Icon,
  Card
} from "semantic-ui-react";
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
    street: "",
    city: "",
    state: "",
    zip: "",
    apt: "",
    profilePic: {},
    title: "",
    companyName: "",
    description: "",
    organized: false,
    clean: false,
    healthy: false,
    professional: false,
    student: false,
    earlyBird: false,
    nightOwl: false,
    fitnessEnthusiast: false,
    creative: false,
    bookworm: false,
    foodie: false,
    partyAnimal: false,
    vegan: false,
    introverted: false,
    smoke: false,
    clean: false,
    guests: false,
    pets: false
  };

  fileSelectHandler = e => {
    console.log(e.target.files[0]);
    this.setState({ profilePic: e.target.files[0] });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkboxHandler = (e, data) => {
    const { name, checked } = data;
    this.setState({ [e.target.name]: checked });
  };

  submitHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("profilePic", this.state.profilePic);

    axios
      .post("/api/upload", formData)
      .then(response => {
        console.log(response);
        this.props.addUserInfo({
          ...this.state,
          userID: this.props.user.authID,
          profilePic: response.data
        });
        this.props.history.push("/home");
      })
      .catch(err => console.log("Please add an image"));
  };

  render() {
    return (
      <div className="sign-up">
        <div className="picture" />
        <form
          encType="multipart/form-data"
          onSubmit={e => this.submitHandler(e)}
          className="sign-up-form"
        >
          <div className="section section-basic">
            <div className="first-section">
              <h1 className="section-title">
                <i class="fas fa-smile" /> Basic Info
              </h1>
              <div className="input-item">
                <p className="section-item">Name</p>
                <Input
                  placeholder="Name"
                  onChange={event => this.inputHandler(event)}
                  name="name"
                  type="text"
                />
              </div>
              <div className="input-item">
                <p className="section-item">Gender</p>
                <Input
                  placeholder="Male"
                  onChange={event => this.inputHandler(event)}
                  name="gender"
                  type="text"
                />
              </div>
              <div className="input-item">
                <p className="section-item">Email</p>
                <Input
                  placeholder="me@me.com"
                  onChange={event => this.inputHandler(event)}
                  name="email"
                  type="text"
                />
              </div>
              <div className="input-item">
                <p className="section-item">Phone</p>
                <Input
                  placeholder="999-999-9999"
                  onChange={event => this.inputHandler(event)}
                  name="phone"
                  type="text"
                />
              </div>
              <div className="input-item">
                <p className="section-item">Date of Birth</p>
                <Input
                  placeholder="01/01/2000"
                  onChange={event => this.inputHandler(event)}
                  name="dob"
                  type="text"
                />
              </div>
            </div>
            <div className="second-section">
              <div className="input-item-about">
                <p className="section-item">About you</p>
                <TextArea
                  placeholder="Interests, hobbies, habits..."
                  style={{ width: "100%", height: "50%", marginTop: "-5%" }}
                  onChange={event => this.inputHandler(event)}
                  name="about"
                  type="text"
                />
              </div>
              <div className="address-box">
                <p className="section-item-address">Address</p>
                <p className="section-address">Street</p>
                <Input
                  style={{ height: "4vh" }}
                  onChange={event => this.inputHandler(event)}
                  name="street"
                  type="text"
                />
                <div className="address-side-one">
                  <div className="address-boxes">
                    <p className="section-address">City</p>
                    <Input
                      style={{ height: "4vh" }}
                      onChange={event => this.inputHandler(event)}
                      name="city"
                      type="text"
                    />
                  </div>
                  <div className="address-boxes">
                    <p className="section-adress">State</p>
                    <Input
                      style={{ height: "4vh" }}
                      onChange={event => this.inputHandler(event)}
                      name="state"
                      type="text"
                    />
                  </div>
                </div>
                <div className="address-side-two">
                  <div className="address-boxes">
                    <p className="section-address">Zip</p>
                    <Input
                      style={{ height: "4vh" }}
                      onChange={event => this.inputHandler(event)}
                      name="zip"
                      type="text"
                    />
                  </div>
                  <div className="address-boxes">
                    <p className="section-address">Suite</p>
                    <Input
                      style={{ height: "4vh" }}
                      onChange={event => this.inputHandler(event)}
                      name="apt"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="input-item-photo">
                <p className="section-item">Upload a photo</p>
                <ReactS3Uploader
                  signingUrl="/s3/sign"
                  signingUrlMethod="GET"
                  accept="image/*"
                  s3path="/uploads/"
                  preprocess={this.onUploadStart}
                  onSignedUrl={this.onSignedUrl}
                  onProgress={this.onUploadProgress}
                  onError={this.onUploadError}
                  onFinish={this.onUploadFinish}
                  // signingUrlHeaders={{ additional: headers }}
                  // signingUrlQueryParams={{ additional: query - params }}
                  signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
                  uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                  contentDisposition="auto"
                  scrubFilename={filename =>
                    filename.replace(/[^\w\d_\-.]+/gi, "")
                  }
                  server="http://cross-origin-server.com"
                  inputRef={cmp => (this.uploadInput = cmp)}
                  autoUpload={true}
                />
              </div>
            </div>
          </div>

          <div className="section-traits">
            <h1 className="section-title">
              <i class="fas fa-laugh" /> Traits
            </h1>

            <div className="traits-one">
              <label htmlFor="clean">Organized</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="organized"
                id="organized"
                type="checkbox"
              />
              <label htmlFor="clean">Healthy</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="healthy"
                id="healthy"
                type="checkbox"
              />
              <label htmlFor="professional">Professional</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="professional"
                id="professional"
                type="checkbox"
              />
              <label htmlFor="student">Student</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="student"
                id="student"
                type="checkbox"
              />
              <label htmlFor="earlyBird">Early Bird</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="earlyBird"
                id="earlyBird"
                type="checkbox"
              />
              <label htmlFor="nightOwl">Night Owl</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="nightOwl"
                id="nightOwl"
                type="checkbox"
              />
            </div>
            <div className="traits-two">
              <label htmlFor="fitnessEnthusiast">Fitness Enthusiast</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="fitnessEnthusiast"
                id="fitnessEnthusiast"
                type="checkbox"
              />
              <label htmlFor="creative">Creative</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="creative"
                id="creative"
                type="checkbox"
              />

              <label htmlFor="bookworm">Bookworm</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="bookworm"
                id="bookworm"
                type="checkbox"
              />
              <label htmlFor="foodie">Foodie</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="foodie"
                id="foodie"
                type="checkbox"
              />
              <label htmlFor="partyAnimal">Party Animal</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="partyAnimal"
                id="partyAnimal"
                type="checkbox"
              />
              <label htmlFor="vegan">Vegan</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="vegan"
                id="vegan"
                type="checkbox"
              />
              <label htmlFor="introverted">Introverted</label>
              <Checkbox
                toggle
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="introverted"
                id="introverted"
                type="checkbox"
              />
            </div>
          </div>
          <div className="third-section">
            <div className="section-description">
              <h1 className="section-title">
                <i class="fas fa-pencil-alt" /> Description
              </h1>

              <TextArea
                placeholder="What are you looking for?"
                style={{ width: "500px", height: "180px" }}
                onChange={event => this.inputHandler(event)}
                name="description"
                type="text"
              />
            </div>

            <div className="section-career">
              <h1 className="section-title">
                <i class="fas fa-briefcase" /> Career
              </h1>
              <p className="section-item">Job Title</p>
              <Input
                style={{ height: "17%" }}
                onChange={event => this.inputHandler(event)}
                name="title"
                type="text"
              />
              <p className="section-item">Company Name</p>
              <Input
                style={{ height: "17%" }}
                onChange={event => this.inputHandler(event)}
                name="companyName"
                type="text"
              />
            </div>

            <div className="section-prefs">
              <h1 className="section-title">
                <i class="fas fa-thumbs-up" /> Preferences
              </h1>
              <div className="pref-item">
                <Checkbox
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  name="smoke"
                  id="smoke"
                  type="checkbox"
                />
                {"  "}
                <label htmlFor="smoke">
                  Smoker <i className="fas fa-smoking" />
                </label>
              </div>
              <div className="pref-item">
                <Checkbox
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  name="guests"
                  id="guests"
                  type="checkbox"
                />
                {"  "}
                <label htmlFor="guests">
                  Guests <i className="fas fa-users" />
                </label>
              </div>
              <div className="pref-item">
                <Checkbox
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  name="pets"
                  id="pets"
                  type="checkbox"
                />
                {"  "}
                <label className="" htmlFor="pets">
                  Pets <i className="fas fa-paw" />
                </label>
              </div>
              <div className="pref-item">
                <Checkbox
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  name="organized"
                  id="organized"
                  type="checkbox"
                />
                {"  "}
                <label className="" htmlFor="pets">
                  Clean <i class="fas fa-shower" />
                </label>
              </div>
            </div>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#031424",
                color: "white",
                height: "75px",
                width: "175px",
                fontSize: "20px"
              }}
              type="submit"
              animated
            >
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
