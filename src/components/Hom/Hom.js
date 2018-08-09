import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../redux/ducks/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.user)}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user, state }) => ({ ...user, state });

export default connect(
  mapStateToProps,
  { getUser }
)(Home);