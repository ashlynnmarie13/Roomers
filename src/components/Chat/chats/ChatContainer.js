import React, { Component } from "react";
import SideBar from "./SideBar";
import {
  COMMUNITY_CHAT,
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  TYPING,
  PRIVATE_MESSAGE
} from "../SocketEvents";
import ChatHeading from "./ChatHeading";
import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import "../Chat.css";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    //initiales everything that we need for our sockets

    this.initSocket(socket);
  }

  //passing socket into the function
  initSocket(socket) {
    //pulling user off props for sender of private message
    const { user } = this.props;
    socket.emit(COMMUNITY_CHAT, this.resetChat);
    //setting socket.on to private message, and when that happens you add a chat
    socket.on(PRIVATE_MESSAGE, this.addChat);
    //this is going to reset the entire chat if someone disconnects
    socket.on("connect", () => {
      socket.emit(COMMUNITY_CHAT, this.resetChat);
    });
    //sender is us, reciever is rando
    socket.emit(PRIVATE_MESSAGE, { reciever: "mike", sender: user.name });
  }

  sendOpenPrivateMessage = reciever => {
    const { socket, user } = this.props;
    //getting socket from props
    //sender is US
    socket.emit(PRIVATE_MESSAGE, { reciever, sender: user.name });
  };
  /*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
  resetChat = chat => {
    return this.addChat(chat, true);
  };

  /*
  FIGURE THIS PART OUT
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*	
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
    */
  //if we just passed in a chat, then the reset value will be equal to false

  //ADD NEW CHAT TO THE DATABASE
  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    console.log(socket);

    const newChats = reset ? [chat] : [...chats, chat];
    console.log(newChats, chat);

    this.setState({
      chats: newChats,
      activeChat: reset ? chat : this.state.activeChat
    });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.chatIdObj}`;
    const typingEvent = `${TYPING}-${chat.chatIdObj}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.chatIdObj));
    socket.on(messageEvent, this.addMessageToChat(chat.chatIdObj));
  };

  /*
	* 	Returns a function that will 
	*	adds message to chat with the chatId passed in. 
	*
	* 	@param chatId {number}
  */

  //ADD NEW MESSAGE TO EXISTING CHAT IN THE DATABASE
  addMessageToChat = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.chatIdObj === chatId) chat.messages.push(message);
        return chat;
      });

      this.setState({ chats: newChats });
      console.log(chats);
    };
  };

  /*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;

        let newChats = chats.map(chat => {
          if (chat.chatIdObj === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  /*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
    console.log(chatId, message);
  };

  /*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
    console.log(chatId, isTyping);
  };
  //sets the chat thats passed in into activechat in state

  //SET ACTIVE CHAT TO WHAT YOU CLICK ON OR THE CHAT NAME FROM THE USER THAT WE CLICKED ON
  setActiveChat = activeChat => {
    this.setState({ activeChat });
    console.log(activeChat);
  };

  render() {
    //pulling in user and logout functions from Chat.js... that's what we're sending back
    const { user, logout } = this.props;
    const { chats, activeChat } = this.state;

    console.log(activeChat, user, chats);
    return (
      <div className="container">
        <SideBar
          logout={logout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          onSendPrivateMessage={this.sendOpenPrivateMessage}
        />
        <div className="chat-room-container">
          {/*if the active chat isnt null, we're going to return a chat heading, all of our messages inside active chat
    and the input to send a new message*/}
          {activeChat !== null ? (
            <div className="chat-room">
              <ChatHeading name={activeChat.name} />
              <Messages
                messages={activeChat.messages}
                user={user}
                typingUsers={activeChat.typingUsers}
              />
              <MessageInput
                sendMessage={message => {
                  this.sendMessage(activeChat.chatIdObj, message);
                }}
                sendTyping={isTyping => {
                  this.sendTyping(activeChat.chatIdObj, isTyping);
                }}
              />
            </div>
          ) : (
            <div className="chat-room choose">
              <h3>Choose a chat!</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
