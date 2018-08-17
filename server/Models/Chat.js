const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
  _id: {
    type: String,
    ref: "users"
  },
  chats: [
    {
      chatIdObj: String,
      messages: [
        {
          messageId: String,
          message: String,
          sender: String,
          time: String
        }
      ],
      name: String,
      typingUsers: Array,
      users: Array
    }
  ]
});

module.exports = Chat = mongoose.model("chats", ChatSchema);
