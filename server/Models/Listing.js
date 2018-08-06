const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  human: {
    age: String,
    gender: String
  },
  address: String,

  rent: {
    price: String,
    moveIn: Date,
    length: String
  },
  prefs: {
    smoke: {
      type: Boolean,
      default: false
    },
    clean: {
      type: Boolean,
      default: false
    },
    guests: {
      type: Boolean,
      default: false
    },
    pets: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Listing = mongoose.model("listing", ListingSchema);
