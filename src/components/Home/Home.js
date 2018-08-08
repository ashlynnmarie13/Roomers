import React, { Component } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// const Wraper = styled.section`
//   width: 50vh;
//   height: 20vh;
// `;

class Home extends Component {
  render() {
    return (
      <div className="Local">
        {/* <Wraper> */}
        <img className="nope" alt="banner" src={require("../img/new.jpg")} />
        {/* </Wraper> */}
        <h2>Post Your Listing in Less Than 3 Minutes</h2>
        <p>
          You decide on house rules and move-in dates. We'll get your listing in
          front of thousands of verified roommates.
        </p>
        <Button variant="contained" color="secondary">
          List Your Place for Free
        </Button>
      </div>
    );
  }
}
export default Home;
