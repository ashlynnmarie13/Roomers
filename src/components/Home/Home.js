import React, { Component } from "react";
import "./Home.css";
import stateModel from "../Models/stateModel";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Checkbox, Loader, Segment, Input } from "semantic-ui-react";
class Home extends Component {
  state = {
    selectedState: "",
    states: stateModel.states
  };

  componentDidMount() {
    this.searchListings();
  }
  searchListings = () => {
    const {
      adress,
      rent,
      roomages,
      roomimage,
      availableDate,
      pathPush,
      profilePic,
      id
    } = this.state;
  };

  dropdownHandler = (e, data) => {
    const { value } = data;
    this.setState({ selectedState: value }, () => this.searchListings());
  };

  exploreCities = () => {
    this.props.history.push(`/location/${this.state.selectedState}`);
  };

  selectState = state => {
    this.setState(
      {
        selectedState: state
      },
      () => this.exploreCities()
    );
  };

  render() {
    return (
      <div>
        <img
          className="background1"
          src="https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/roommates_4_0.jpg"
        />
        {/* <div className="search-state">
        
          <Select
          
          onChange={(e, data) => this.dropdownHandler(e, data)}
          placeholder="Select State"
          options={this.state.states}
          
          />
        </div>
          <button>EXPLORE</button> */}
        <div>
          <div />
          <div>
            <div class="input-group">
              <Select
                className="search-state"
                onChange={(e, data) => this.dropdownHandler(e, data)}
                placeholder="Select State"
                options={this.state.states}
              />
              <button className="button2" onClick={() => this.exploreCities()}>
                EXPLORE
              </button>
            </div>
          </div>
        </div>
        <div class="post" />

        <div className="HeaD">
          <h1 className="head1">Post Your Listing in Less Than 3 Minutes</h1>
          <h1 className="para">
            You decide on house rules and move-in dates. We'll get your listing
            in front of thousands of <br />
            verified roommates.
          </h1>
          {/* <button className="button1">LIST YOUR PLACE FOR FREE</button> */}
          <Link to="/addlisting" className="button1">
            <i /> LIST YOUR PLACE FOR FREE
          </Link>
        </div>
        {/* <div className="button">LIST YOUR PLACE FOR FREE</div> */}
        <div class="container">
          <br />
          {/* <h1>Search Rooms and Roommates In These Cities...</h1>s */}
          <div class="innerC">
            <div class="top">
              <div class="ny" onClick={() => this.selectState("New York")}>
                <h2 class="cali">New York</h2>
              </div>
              <div class="au" onClick={() => this.selectState("Texas")}>
                <h2 class="cali">Texas</h2>
              </div>
              <div class="sd" onClick={() => this.selectState("Florida")}>
                <h2 class="cali">Florida</h2>
              </div>
            </div>
            <div class="middle" >
              <div class="bo" onClick={() => this.selectState("Kansas")}>
                <h2 class="cali">Kansas</h2>
              </div>
              <div class="ch" onClick={() => this.selectState("Nevada")}>
                <h2 class="cali">Nevada</h2>
              </div>
              <div class="sf" onClick={() => this.selectState("Michigan")}>
                <h2 class="cali">Michigan</h2>
              </div>
            </div>
            <div class="bottom">
              <div class="la" onClick={() => this.selectState("California")}>
                <h2 class="cali">California</h2>
              </div>
              <div class="lo" onClick={() => this.selectState("New Jersey")}>
                <h2 class="cali">New Jersey</h2>
              </div>
              <div class="wa" onClick={() => this.selectState("Nebraska")}>
                <h2 class="cali">Nebraska</h2>
              </div>
            </div>
          </div>
          {/* <h3>Other States:</h3> */}
          {/* <ul>
                    <li>Alabama</li>
                    <li>Alaska</li>
                    <li>Colorado</li>
                    <li>Delaware</li>
                    <li>Iowa</li>
                    <li>Kansas</li> */}
          {/* </ul> */}
        </div>
      </div>
    );
  }
}
export default Home;
