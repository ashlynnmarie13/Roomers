const io = require("../index.js").io;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE
} = require("../../src/components/Chat/SocketEvents");

const {
  createUser,
  createMessage,
  createChat
} = require("../../src/components/Chat/SocketFactories");

//has to be let because we're changing it
let connectedUsers = {};

let communityChat = createChat();

module.exports = function(socket) {
  // console.log('\x1bc'); //clears console
  console.log("Socket Id:" + socket.id);

  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  //Verify Username
  //This is being taken from HANDLE SUBMIT from SetUser.js
  //either is already a user, so no new user is created
  //otherwise, a new user is created
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({
        isUser: false,
        //socketId is passed for in private messaging here
        user: createUser({ name: nickname, socketId: socket.id })
      });
    }
  });

  //User Connects with username
  //WE NEED TO USE THIS TO PASS OUR USER IN AND GIVE THEM A CHAT USERNAME
  //setting "user" as a variable so we can use it
  socket.on(USER_CONNECTED, user => {
    //if the user disconnects then we want to make sure that that id is updated
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);
    // console.log(io);
    //broadcast to all the users connected, updates the list
    io.emit(USER_CONNECTED, connectedUsers);

    console.log(connectedUsers);
  });

  //User disconnects
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log("Disconnect", connectedUsers);
    }
  });

  // //User logsout
  // socket.on(LOGOUT, () => {
  //   connectedUsers = removeUser(connectedUsers, socket.user.name);
  //   io.emit(USER_DISCONNECTED, connectedUsers);
  //   console.log("Disconnect", connectedUsers);
  // });

  //Get Community Chat
  socket.on(COMMUNITY_CHAT, callback => {
    // callback(communityChat);
  });

  // socket.on(MESSAGE_SENT, ({ chatId, message }) => {
  //   sendMessageToChatFromUser(chatId, message);
  // });

  // socket.on(TYPING, ({ chatId, isTyping }) => {
  //   sendTypingFromUser(chatId, isTyping);
  // });

  //Private message event
  //so we know who is sending and recieving the message
  socket.on(PRIVATE_MESSAGE, ({ reciever, sender }) => {
    console.log(reciever, sender);
    //if the reciever is in our list of users(object that they get added onto)
    if (reciever in connectedUsers) {
      //then we make a new chat, including a name for the chat and the users
      const newChat = createChat({
        name: `${reciever}&${sender}`,
        users: [reciever, sender],
        messages: [{ message: "yooooo" }, { message: "supppppp" }]
      });
      //sending to the current socket that the person who's requesting to make a private chat is going to get
      //off of our connected users list, we putt the socketId off of that reciever
      const recieverSocket = connectedUsers[reciever].socketId;
      //sending an event to the socket we just made, emiting the private message and sending the newChat
      socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat);
      // also emitting to this socket and sending the newChat
      socket.emit(PRIVATE_MESSAGE, newChat);
    }
  });
};
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
  };
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(
      `${MESSAGE_RECIEVED}-${chatId}`,
      createMessage({ message, sender })
    );
  };
}

/*
WE NEED TO EDIT THIS PART
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username) {
  return username in userList;
}
