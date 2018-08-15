import React, { Component } from "react";
import Login from "../Login/Login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Button, Header } from "semantic-ui-react";

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
      return { height: "75vh", zIndex: 3 };
    } else if (this.state[above] === below) {
      return { height: "25vh", filter: "blur(5px)", zIndex: "2" };
    }
    return { height: "50vh" };
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
        <div className="fixed-corner">
          <Login />
        </div>
        <div
          style={this.expand("bottom", "top")}
          onMouseEnter={() => this.size("bottom", "top")}
          onMouseLeave={() => this.leave()}
          className="Landing-top split"
        >
          <div className="top-overlay">
            <div id="container">
              <h1 className="header-text">Find a Room</h1>

              <Link to="/signup">
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#031424",
                    border: "solid #031424 2px",
                    color: "white",
                    width: "100%",
                    height: "100%",
                    fontSize: "1.2em"
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          style={this.expand("top", "bottom")}
          onMouseEnter={() => this.size("top", "bottom")}
          onMouseLeave={() => this.leave()}
          className="Landing-bottom split"
        >
          <div className="bottom-overlay">
            <div id="container">
              <h1 className="header-text">Rent a Room</h1>

              <Link to="/signup">
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "white",
                    border: "solid #031424 2px",
                    color: "#031424",
                    width: "100%",
                    height: "100%",
                    fontSize: "1.2em"
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
