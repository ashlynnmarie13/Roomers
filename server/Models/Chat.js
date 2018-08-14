const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
  convoId: Number,
  senderId: Number,
  messages: [
    {
      message: String,
      sender: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Chat = mongoose.model("chats", ChatSchema);
