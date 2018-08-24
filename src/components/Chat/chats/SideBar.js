import React, { Component } from "react";
// import FAChevronDown from "react-icons";
// import FAMenu from "react-icons";
// import FASearch from "react-icons";
// import MdEject from "react-icons";
import "../Chat.css";
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    const { userName } = props;
    console.log(userName);

    this.state = {
      userName,
      reciever: "Blake Engquist"
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.handleSubmit();
      }.bind(this),
      1000
    );
  }

  handleSubmit = () => {
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;
    console.log(reciever, onSendPrivateMessage);
    //sends reciever to container, then openprivatemessage, then it makes a new event and goes to socket
    //manager... sending private message to that reciever and also to the sender's container
    onSendPrivateMessage(reciever);
  };

  render() {
    const { chats, activeChat, user, setActiveChat, logout } = this.props;
    const { reciever } = this.state;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">Messages {/*<FAChevronDown */}</div>
          {/* <div className="menu">Menu{/*<FAChevronDown }</div> */}
        </div>
        <form onSubmit={() => this.handleSubmit()} className="search">
          <i className="search-icon">
            Search
            {/*<FAChevronDown */}
          </i>
          <input
            placeholder="Search"
            type="text"
            value={reciever}
            onChange={e => {
              this.setState({ reciever: e.target.value });
            }}
          />
          <div className="plus" />
        </form>
        {/*this is the list of chats that we currently have  for the user thats logged in*/}
        <div
          className="users"
          ref="users"
          //if I click in this container, its going to set the active chat to null
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {/*for each chat, if theres a name then we're going to return this thing
    user is user that's connected to chat that is NOT you
    if we can't find a user that' not you, we're going to make it say "community chat"
    */}
          {chats &&
            chats.map(chat => {
              if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const chatSideName =
                  chat.users.find(name => {
                    return name !== user.name;
                  }) || "Cristian";
                const classNames =
                  activeChat && activeChat.chatIdObj === chat.chatIdObj
                    ? "active"
                    : "";

                return (
                  <div
                    key={chat.chatIdObj}
                    className={`user ${classNames}`}
                    onClick={() => {
                      setActiveChat(chat);
                    }}
                  >
                    <div className="user-photo">
                      {chatSideName[0].toUpperCase()}
                    </div>
                    <div className="user-info">
                      <div className="name">{chatSideName}</div>
                      {/*prints out last message in sidebar*/}
                      {lastMessage && (
                        <div className="last-message">
                          {lastMessage.message}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return null;
            })}
        </div>
        <div className="current-user">
          {user.name}
          <div
            onClick={() => {
              logout();
            }}
            title="Logout"
            className="logout"
          >
            {/*<FAChevronDown */}
          </div>
        </div>
      </div>
    );
  }
}
