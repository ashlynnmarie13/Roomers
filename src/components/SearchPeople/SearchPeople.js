import React, { Component } from "react";
import stateModel from "../Models/stateModel";
import { Select, Checkbox, Loader, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import ProfileCard from "../ProfileCard/ProfileCard";
import { getProfiles } from "../../redux/ducks/profileReducer";
import axios from "axios";
import "./SearchPeople.css";

class Profiles extends Component {
  state = {
    profiles: [],
    isLoading: true,
    search: "",
    smoker: true,
    clean: true,
    guests: true,
    pets: true,
    selectedState: "",
    states: stateModel.states
  };

  componentDidMount() {
    this.searchPeople();
  }

  searchPeople = () => {
    const { smoker, clean, guests, pets, selectedState } = this.state;

    axios
      .get(
        `/api/users/info/?smoke=${smoker}&guests=${guests}&pets=${pets}&state=${selectedState}&clean=${clean}`
      )
      .then(response =>
        this.setState({ profiles: response.data, isLoading: false }, () =>
          console.log(response.data)
        )
      );
  };

  inputHandler = e => {
    this.setState({ search: e.target.value }, () => this.searchPeople());
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
    console.log(this.state.states);
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
              <p className="search-section-title">Traits</p>
              <Checkbox
                defaultChecked
                name="smoker"
                onChange={(event, data) => this.checkboxHandler(event, data)}
                className="search-people-item"
                slider
                label="Smoker"
              />
              <Checkbox
                defaultChecked
                name="clean"
                onChange={(event, data) => this.checkboxHandler(event, data)}
                className="search-people-item"
                slider
                label="Clean"
              />
              <Checkbox
                defaultChecked
                name="guests"
                onChange={(event, data) => this.checkboxHandler(event, data)}
                className="search-people-item"
                slider
                label="Guests"
              />
              <Checkbox
                defaultChecked
                name="pets"
                onChange={(event, data) => this.checkboxHandler(event, data)}
                className="search-people-item"
                slider
                label="Pets"
              />
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
)(Profiles);
