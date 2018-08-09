import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div>
        <div class="imgC" />

        <div class="post">
          <h1 className="head1">Post Your Listing in Less Than 3 Minutes</h1>
          <h1 className="para">
            You decide on house rules and move-in dates. We'll get your listing
            in front of thousands of <br />
            verified roommates.
          </h1>
        </div>
        <div>
          <button className="button1">LIST YOUR PLACE FOR FREE</button>
        </div>
        {/* <div className="button">LIST YOUR PLACE FOR FREE</div> */}
        <div class="container">
          <br />
          {/* <h1>Search Rooms and Roommates In These Cities...</h1>s */}
          <div class="innerC">
            <div class="top">
              <div class="ny">
                <Link to="/Location">
                  <h2 class="cali">New York</h2>
                </Link>
              </div>
              <div class="au">
                <h2 class="cali">Texas</h2>
              </div>
              <div class="sd">
                <h2 class="cali">Florida</h2>
              </div>
            </div>
            <div class="middle">
              <div class="bo">
                <h2 class="cali">Kansas</h2>
              </div>
              <div class="ch">
                <h2 class="cali">Nevada</h2>
              </div>
              <div class="sf">
                <h2 class="cali">Michigan</h2>
              </div>
            </div>
            <div class="bottom">
              <div class="la">
                <h2 class="cali">California</h2>
              </div>
              <div class="lo">
                <h2 class="cali">New Mexico</h2>
              </div>
              <div class="wa">
                <h2 class="cali">Utah</h2>
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
