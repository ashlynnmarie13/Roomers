const uuidv4 = require("uuid/v4");

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object} 
*		name {string}
WE WILL NEED TO EDIT IT THIS TO MATCH AN ID TO A USER THAT HAS BEEN PASSED IN
*/
const createUser = ({ name = "", socketId = null } = {}) => ({
  id: uuidv4(),
  name,
  socketId
});

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object} 
*		message {string}
*		sender {string}
*/
const createMessage = ({ message = "", sender = "" } = {}) => ({
  messageId: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender
});

/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop name {string}
* 	@prop messages {Array.Message}
* 	@prop users {Array.string}
*	@param {object} 
*		messages {Array.Message}
*		name {string}
*		users {Array.string}
* 
*/
const createChat = ({
  messages = [],
  name = "Community",
  users = []
} = {}) => ({
  chatIdObj: uuidv4(),
  name,
  messages,
  users,
  typingUsers: []
});

/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
WE NEED TO CHANGE IT TO WHERE ITS NOT ON 24 HOUR TIME
*/
const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createChat,
  createUser
};
