import React, { Component } from "react";
import { VERIFY_USER } from "./SocketEvents";
import "./Chat.css";
import { connect } from "react-redux";
class SetUser extends Component {
  constructor(props) {
    super(props);

    //WE NEED TO CHANGE THIS TO WHERE IT'S USING THE USER TO SET A NICKNAME
    this.state = {
      nickname: "",
      error: ""
    };
  }

  //setting a new user
  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  //On submit, we're verifying the user by taking in the nickname and the callback function
  //to set the user
  handleSubmit = e => {
    e.preventDefault();
    const { socket } = this.props;
    console.log(this.props);
    socket.emit(VERIFY_USER, this.props.user.name, this.setUser);
  };

  //typing
  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={"Username"}
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

export default connect(state => state)(SetUser);
