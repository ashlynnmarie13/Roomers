import React, { Component } from "react";
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
    states: [
      { text: "Alabama" },
      { text: "Alaska" },
      { text: "Arizona" },
      { text: "Arkansas" },
      { text: "California" },
      { text: "Colorado" },
      { text: "Connecticut" },
      { text: "Delaware" },
      { text: "Florida" },
      { text: "Georgia" },
      { text: "Guam" },
      { text: "Hawaii" },
      { text: "Idaho" },
      { text: "Illinois" },
      { text: "Indiana" },
      { text: "Iowa" },
      { text: "Kansas" },
      { text: "Kentucky" },
      { text: "Louisiana" },
      { text: "Maine" },
      { text: "Maryland" },
      { text: "Massachusetts" },
      { text: "Michigan" },
      { text: "Minnesota" },
      { text: "Mississippi" },
      { text: "Missouri" },
      { text: "Montana" },
      { text: "Nebraska" },
      { text: "Nevada" },
      { text: "New Hampshire" },
      { text: "New Jersey" },
      { text: "New Mexico" },
      { text: "New York" },
      { text: "North Carolina" },
      { text: "North Dakota" },
      { text: "Ohio" },
      { text: "Oklahoma" },
      { text: "Oregon" },
      { text: "Pennsylvania" },
      { text: "Rhode Island" },
      { text: "South Carolina" },
      { text: "South Dakota" },
      { text: "Tennessee" },
      { text: "Texas" },
      { text: "Utah" },
      { text: "Vermont" },
      { text: "Virgin Islands" },
      { text: "Virginia" },
      { text: "Washington" },
      { text: "West Virginia" },
      { text: "Wisconsin" },
      { text: "Wyoming" }
    ]
  };

  componentDidMount() {
    this.searchPeople();
  }

  searchPeople = () => {
    axios
      .get(`/api/users/info/?smoke=${false}`)
      .then(response =>
        this.setState({ profiles: response.data, isLoading: false }, () =>
          console.log(response.data)
        )
      );
  };

  inputHandler = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const profiles = this.state.profiles.map(profile => {
      const { profilePic, birthday, aboutMe, name, title } = profile;

      return (
        <ProfileCard
          profilePic={profilePic}
          birthday={birthday}
          aboutMe={aboutMe}
          name={name}
          title={title}
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
                style={{ width: "100%", margin: 0 }}
                icon="users"
                iconPosition="right"
                placeholder="Search people..."
              />
            </div>

            <div className="search-people-section">
              <p className="search-section-title">Location</p>
              <Select
                className="search-people-item"
                placeholder="Select State"
                options={this.state.states}
              />
            </div>
            <div className="search-people-section">
              <p className="search-section-title">Traits</p>
              <Checkbox className="search-people-item" slider label="Smoker" />
              <Checkbox className="search-people-item" slider label="Clean" />
              <Checkbox className="search-people-item" slider label="Guests" />
              <Checkbox className="search-people-item" slider label="Pets" />
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
