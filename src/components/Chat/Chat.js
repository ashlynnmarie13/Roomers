import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "./SocketEvents";
import SetUser from "./SetUser";
import ChatContainer from "./chats/ChatContainer";
import "./Chat.css";
import { getUserById } from "../../redux/ducks/userReducer";
import { connect } from "react-redux";

const uuidv4 = require("uuid/v4");

//needs to be set to our server
const socketUrl = "http://localhost:3001";

class Chat extends Component {
  constructor(props) {
    super(props);
    //initial state of socket and user is null
    this.state = {
      socket: null,
      user: null
    };
  }

  /* to get to your own chat page-
  <Link to={`/chat/${_id}`} className="link">
  {user.name}
</Link>
*/

  //THIS IS ALL SETTING THE SOCKET TO OUR URL
  //calling the function below, which declares the socket variable as equal to the socket URL
  //which is http://localhost:3001
  //then, we're getting the user by their id so that we have
  componentDidMount() {
    console.log(this.state.socket);
    if (this.props.match.params.id) {
      getUserById(this.props.match.params.id);
    }
    this.initSocket();

    const { socket } = this.state;
    console.log(socket);
    this.setState(
      {
        user: {
          id: this.props.user.authID,
          name: this.props.user.name
        }
      },
      () => this.setUser(this.state.user)
    );
    console.log(this.props);
  }

  // Connect to and initializes the socket.
  //setting the state of the socket to the  URL (3001)
  initSocket = () => {
    const socket = io(socketUrl);
    console.log(socket);
    socket.on("connect", () => {
      console.log("Connected");
    });
    console.log(socket);
    this.setState({ socket });
    console.log(socket);
  };

  //THIS IS SETTING THE ACTUAL USER
  /*
		Sets the user property in state 
    @param user {id:number, name:string}
    WE NEED TO SET THE STATE OF THE USER TO THE CURRENT USER LOGGED IN
  */

  setUser = user => {
    const { socket } = this.state;
    console.log(socket);
    console.log(user);
    socket.emit(VERIFY_USER, this.props.user.name, this.createUser);
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
    console.log(socket);
    console.log(user);
  };

  createUser = ({ name = "", socketId = null } = {}) => ({
    id: "google-oauth2|109803081908967859150",
    name,
    socketId
  });

  render() {
    const { profile } = this.props;
    console.log(this.props);
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          // <SetUser socket={socket} setUser={this.setUser} />
          <div />
        ) : (
          //if there is a user, then we're going to put a chat container on the
          //it gets a socket, a user, and a logout function
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}

export default connect(state => state)(Chat);
