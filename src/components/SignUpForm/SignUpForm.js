import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
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
                onChange={event => this.inputHandler(event)}
                name="about"
                type="text"
              />
            </div>
            <div className="input">
              <p className="section-item">Upload a photo:</p>
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
          <div className="section section-traits">
            <h1 className="section-title">Traits:</h1>
            <div />
            <label htmlFor="clean">Organized</label>
            <Checkbox
              toggle
              onChange={(event, data) => this.checkboxHandler(event, data)}
              name="organized"
              id="organized"
              type="checkbox"
            />
            <label htmlFor="healthy">Healthy</label>
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
                onChange={(event, data) => this.checkboxHandler(event, data)}
                name="smoke"
                id="smoke"
                type="checkbox"
              />
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
              <label className="" htmlFor="pets">
                Clean <i class="fas fa-shower" />
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
