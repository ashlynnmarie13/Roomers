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
    age: Number,
    gender: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },

  rent: {
    price: String,
    moveIn: String,
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
  availableDate: String,
  listingLength: {
    type: String
  },
  roommages: {
    type: Array
  }

});

module.exports = Listing = mongoose.model("listing", ListingSchema);
