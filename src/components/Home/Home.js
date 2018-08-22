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
          <div>
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

            <div className="renting-content">
              <h1 className="para">Want to rent out a room?</h1>

              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "#cf6766",
                  border: "solid #cf6766 2px",
                  color: "white",
                  width: "80%",
                  height: "100%"
                }}
              >
                <Link className="renting-content2" to="/addlisting">
                  LIST YOUR PLACE
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="button">LIST YOUR PLACE FOR FREE</div> */}
        <div className="container">
          <br />
          {/* <h1>Search Rooms and Roommates In These Cities...</h1>s */}
          <div className="innerC">
            <div className="top">
              <div className="ny" onClick={() => this.selectState("New York")}>
                <h2 className="cali">NEW YORK</h2>
              </div>
              <div className="au" onClick={() => this.selectState("Texas")}>
                <h2 className="cali">TEXAS</h2>
              </div>
              <div className="sd" onClick={() => this.selectState("Florida")}>
                <h2 className="cali">FLORIDA</h2>
              </div>
            </div>

            <div className="middle">
              <div className="bo" onClick={() => this.selectState("Kansas")}>
                <h2 className="cali">KANSAS</h2>
              </div>
              <div className="ch" onClick={() => this.selectState("Nevada")}>
                <h2 className="cali">NEVADA</h2>
              </div>
              <div className="sf" onClick={() => this.selectState("Michigan")}>
                <h2 className="cali">MICHIGAN</h2>
              </div>
            </div>
            <div className="bottom">
              <div
                className="la"
                onClick={() => this.selectState("California")}
              >
                <h2 className="cali">CALIFORNIA</h2>
              </div>
              <div
                className="lo"
                onClick={() => this.selectState("New Jersey")}
              >
                <h2 className="cali">NEW JERSEY</h2>
              </div>
              <div className="wa" onClick={() => this.selectState("Nebraska")}>
                <h2 className="cali">NEBRASKA</h2>
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
