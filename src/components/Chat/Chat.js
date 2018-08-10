import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "./SocketEvents";
import SetUser from "./SetUser";
import ChatContainer from "./chats/ChatContainer";
import "./Chat.css";

//needs to be set to our server
const socketUrl = "http://localhost:3001";
export default class Chat extends Component {
  constructor(props) {
    super(props);
    //initial state of socket and user is null
    this.state = {
      socket: null,
      user: null
    };
  }

  /* to get to your own chat page-
  <Link to={`/chat/${profile.handle}`} className="link">
  {user.name}
</Link>
*/

  //loading the function below as soon as the page renders
  //get current profile here????
  componentDidMount() {
    this.initSocket();
    console.log(this.props);
  }

  /*
	*	Connect to and initializes the socket.
	*/
  initSocket = () => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected");
    });

    this.setState({ socket });
  };

  /*
	* 	Sets the user property in state 
    *	@param user {id:number, name:string}
    WE NEED TO SET THE STATE OF THE USER TO THE CURRENT USER LOGGED IN
	*/

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  /*
    *	Sets the user property in state to null.
    WE NEED THIS TO HAPPEN WHEN OUR USER LOGS OUT
	*/
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <SetUser socket={socket} setUser={this.setUser} />
        ) : (
          //if there is a user, then we're going to put a chat container on the dom
          //it gets a socket, a user, and a logout function
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
