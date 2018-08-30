import React, { Component } from "react";
import { Button } from "semantic-ui-react";
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
      <div className="home-page">
        <div className="home-image">
          <img
            className="background1"
            src="https://images.unsplash.com/photo-1508490451314-a56ac7c2d250?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad037c6d4d39b63dedfe7c6a59182fe3&auto=format&fit=crop&w=1404&q=80"
          />
        </div>

        {/* <div className="search-state">
        
          <Select
          
          onChange={(e, data) => this.dropdownHandler(e, data)}
          placeholder="Select State"
          options={this.state.states}
          
          />
        </div>
          <button>EXPLORE</button> */}
        <div className="home-content">
          <div className="head-content">
            <h1 className="head1">Have you heard the roomers?</h1>
            <h1 className="para solution">We have your housing solution!</h1>
          </div>
          <div className="looking-renting">
            <div className="explore-content">
              <h1 className="para">Looking for a room?</h1>
              <div class="input-group">
                <Select
                  className="search-state"
                  onChange={(e, data) => this.dropdownHandler(e, data)}
                  placeholder="Select State"
                  options={this.state.states}
                />
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#cf6766",
                    border: "solid #cf6766 2px",
                    color: "white",
                    width: "30%",
                    height: "50%",

                    marginLeft: "2%"
                  }}
                  onClick={() => this.exploreCities()}
                >
                  EXPLORE
                </Button>
              </div>
            </div>
            <div className="home-icon">
              <i class="fas fa-home" />
            </div>
            <div className="renting-content">
              <h1 className="para">Want to rent out a room?</h1>
              <Link className="renting-content2" to="/addlisting">
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#cf6766",
                    border: "solid #cf6766 2px",
                    color: "white",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  LIST YOUR PLACE
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="button">LIST YOUR PLACE FOR FREE</div> */}
        <div className="state-container">
          <br />
          {/* <h1>Search Rooms and Roommates In These Cities...</h1>s */}
          <div className="innerC">
            <div
              className="state-img state-img-1"
              style={{
                backgroundImage:
                  "url('http://www.wallpaperbetter.com/wallpaper/21/90/360/hudson-river-new-york-city-1080P-wallpaper-middle-size.jpg')"
              }}
              onClick={() => this.selectState("New York")}
            >
              <h2 className="state-name">NEW YORK</h2>
            </div>
            <div
              className="state-img state-img-2"
              style={{
                backgroundImage:
                  "url('http://paperlief.com/images/dallas-texas-at-night-wallpaper-4.jpg')"
              }}
              onClick={() => this.selectState("Texas")}
            >
              <h2 className="state-name">TEXAS</h2>
            </div>
            <div
              className="state-img state-img-3"
              style={{
                backgroundImage:
                  "url('http://wallscollection.net/wp-content/uploads/2017/01/Florida-Wallpapers-HD-1920x1080.jpg')"
              }}
              onClick={() => this.selectState("Florida")}
            >
              <h2 className="state-name">FLORIDA</h2>
            </div>

            <div
              className="state-img state-img-4"
              style={{
                backgroundImage:
                  "url('https://bloggerlocal.com/wp-content/uploads/2013/08/kansas_city_skyline_2.jpg')"
              }}
              onClick={() => this.selectState("Kansas")}
            >
              <h2 className="state-name">KANSAS</h2>
            </div>
            <div
              className="state-img state-img-5"
              style={{
                backgroundImage:
                  "url('https://roomicities.imgix.net/Chicago.jpg')"
              }}
              onClick={() => this.selectState("Nevada")}
            >
              <h2 className="state-name">NEVADA</h2>
            </div>
            <div
              className="state-img state-img-6"
              style={{
                backgroundImage:
                  "url('http://jonvilma.com/images/detroit-at-sunrise-michigan-1.jpg')"
              }}
              onClick={() => this.selectState("Michigan")}
            >
              <h2 className="state-name">MICHIGAN</h2>
            </div>

            <div
              className="state-img state-img-7"
              style={{
                backgroundImage:
                  "url('http://www.wallpaperbetter.com/wallpaper/1008/644/858/paradise-pier-sunset-california-1080P-wallpaper.jpg')"
              }}
              onClick={() => this.selectState("California")}
            >
              <h2 className="state-name">CALIFORNIA</h2>
            </div>
            <div
              className="state-img state-img-8"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/4d/9d/d6/4d9dd63aedcf8c0064ec1e41cc4783ab.jpg')"
              }}
              onClick={() => this.selectState("Nebraska")}
            >
              <h2 className="state-name">NEBRASKA</h2>
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
