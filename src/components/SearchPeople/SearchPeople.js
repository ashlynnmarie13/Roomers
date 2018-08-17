import React, { Component } from "react";
import stateModel from "../Models/stateModel";
import { Select, Checkbox, Loader, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import ProfileCard from "../ProfileCard/ProfileCard";
import { getProfiles } from "../../redux/ducks/profileReducer";
import axios from "axios";
import "./SearchPeople.css";

class SearchPeople extends Component {
  state = {
    profiles: [],
    isLoading: true,
    search: "",
    smoker: false,
    clean: false,
    guests: false,
    pets: false,
    organized: false,
    healthy: true,
    professional: false,
    student: true,
    earlyBird: false,
    nightOwl: true,
    fitnessEnthusiast: false,
    creative: false,
    bookworm: false,
    foodie: false,
    partyAnimal: true,
    vegan: false,
    introverted: false,
    selectedState: "",
    states: stateModel.states
  };

  componentDidMount() {
    this.searchPeople();
  }

  searchPeople = () => {
    const {
      smoker,
      guests,
      pets,
      clean,
      selectedState,
      organized,
      healthy,
      professional,
      student,
      earlyBird,
      nightOwl,
      fitnessEnthusiast,
      creative,
      bookworm,
      foodie,
      partyAnimal,
      vegan,
      introverted,
      search
    } = this.state;

    axios
      .get(
        `/api/users/info/?smoke=${smoker}&clean=${clean}&guests=${guests}&pets=${pets}&selectedState=${selectedState}&organized=${organized}&healthy=${healthy}&professional=${professional}&student=${student}&earlyBird=${earlyBird}&nightOwl=${nightOwl}&fitnessEnthusiast=${fitnessEnthusiast}&creative=${creative}&bookworm=${bookworm}&foodie=${foodie}&partyAnimal=${partyAnimal}&vegan=${vegan}&introverted=${introverted}&search=${search}`
      )
      .then(response =>
        this.setState({ profiles: response.data, isLoading: false })
      );
  };

  searchPeopleByName = () => {
    const { search } = this.state;
    axios
      .get(`/api/users/?search=${search}`)
      .then(response =>
        this.setState({ profiles: response.data, isLoading: false })
      );
  };

  inputHandler = e => {
    this.setState({ search: e.target.value }, () => {
      if (this.state.search.length !== 0) {
        this.searchPeopleByName();
      } else {
        this.searchPeople();
      }
    });
  };

  checkboxHandler = (e, data) => {
    const { name, checked } = data;
    this.setState({ [name]: checked }, () => this.searchPeople());
  };

  dropdownHandler = (e, data) => {
    const { value } = data;
    this.setState({ selectedState: value }, () => this.searchPeople());
  };

  render() {
    const profiles = this.state.profiles.map((profile, i) => {
      const { profilePic, birthday, aboutMe, name, title, _id } = profile;

      return (
        <ProfileCard
          key={i}
          profilePic={profilePic}
          birthday={birthday}
          aboutMe={aboutMe}
          name={name}
          title={title}
          id={_id}
          pathPush={this.props.history.push}
        />
      );
    });

    const loader = (
      <Segment style={{ height: "90vh" }}>
        <Loader active>Loading</Loader>
      </Segment>
    );

    return (
      <div>
        <div className="search-people">
          <div className="filter-options">
            <div className="search-people-section">
              <p className="search-section-title">Search</p>
              <Input
                onChange={e => this.inputHandler(e)}
                onChange={e => this.inputHandler(e)}
                style={{ width: "100%", margin: 0 }}
                icon="users"
                iconPosition="right"
                placeholder="Search people..."
              />
            </div>

            <div className="search-people-section">
              <p className="search-section-title">Location</p>
              <Select
                onChange={(e, data) => this.dropdownHandler(e, data)}
                className="search-people-item"
                placeholder="Select State"
                options={this.state.states}
              />
            </div>
            <div className="search-people-section">
              <p className="search-section-title">Preferences</p>
              <div className="search-preferences">
                <Checkbox
                  name="smoker"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  slider
                  label="Smoker"
                />
                <Checkbox
                  name="clean"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  slider
                  label="Clean"
                />
                <Checkbox
                  name="guests"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  slider
                  label="Guests"
                />
                <Checkbox
                  name="pets"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  slider
                  label="Pets"
                />
              </div>
            </div>
            <div className="search-people-section">
              <p className="search-section-title">Traits</p>
              <div className="search-traits">
                <Checkbox
                  name="organized"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Organized"
                />
                <Checkbox
                  defaultChecked
                  name="healthy"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Healthy"
                />
                <Checkbox
                  name="professional"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Professional"
                />
                <Checkbox
                  defaultChecked
                  name="student"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Student"
                />
                <Checkbox
                  name="earlyBird"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Early Bird"
                />
                <Checkbox
                  defaultChecked
                  name="nightOwl"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Night Owl"
                />
                <Checkbox
                  name="creative"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Creative"
                />
                <Checkbox
                  name="bookworm"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Bookworm"
                />
                <Checkbox
                  name="introverted"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Introverted"
                />
                <Checkbox
                  name="creative"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Creative"
                />
                <Checkbox
                  name="bookworm"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Bookworm"
                />
                <Checkbox
                  name="foodie"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Foodie"
                />
                <Checkbox
                  defaultChecked
                  name="partyAnimal"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Party Animal"
                />
                <Checkbox
                  name="vegan"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Vegan"
                />
                <Checkbox
                  name="fitnessEnthusiast"
                  onChange={(event, data) => this.checkboxHandler(event, data)}
                  className="search-people-item"
                  label="Fitness Enthusiast"
                />
              </div>
            </div>
          </div>
          {this.state.isLoading ? (
            loader
          ) : (
            <div className="profile-list">{profiles}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(SearchPeople);
