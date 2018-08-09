import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../redux/ducks/profileReducer";

class Profiles extends Component {
  //   componentDidMount() {
  //     this.props.getProfiles();
  //   }

  render() {
    // const { profiles } = this.props;
    // let profileItems;

    // if (profiles.length > 0) {
    //   profileItems = profiles.map(profile => (
    //     <ProfileItem key={profile._id} profile={profile} />
    //   ));
    // } else {
    //   profileItems = <h4>No profiles found...</h4>;
    // }

    return (
      <div>
        <div className="profiles-new">
          <div className="tuneders-box">
            <h1 className="text-center">Search Profiles</h1>
          </div>
          <ProfileItem />
          {/* {profileItems} */}
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
