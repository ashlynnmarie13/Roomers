import React, { Component } from "react";
import Login from "../Login/Login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      top: null,
      bottom: null
    };
  }

  expand(above, below) {
    if (this.state[above] === above) {
      return { height: "85vh", zIndex: 3 };
    } else if (this.state[above] === below) {
      return { height: "15vh", opacity: "0.3", zIndex: "2" };
    }
    return { width: "50vh" };
  }

  size(first, second) {
    this.setState({ [first]: first, [second]: first });
  }
  leave() {
    this.setState({ top: null, bottom: null });
  }

  render() {
    return (
      <div className="Landing">
        <div
          style={this.expand("top", "bottom")}
          onMouseEnter={() => this.size("top", "bottom")}
          onMouseLeave={() => this.leave()}
          className="Landing-top split"
        >
          <h1 className="Landing__header">Owners</h1>

          <Link className="myButton" to="/signup">
            Sign In
          </Link>
        </div>
        <div
          style={this.expand("top", "bottom")}
          onMouseEnter={() => this.size("top", "bottom")}
          onMouseLeave={() => this.leave()}
          className="Landing-bottom split"
        >
          <h1 className="Landing__header">Residents</h1>
          <Login className="myButton" />
          <Link className="myButton" to="/signup">
            Sign In
          </Link>
        </div>
      </div>
    );
  }
}
