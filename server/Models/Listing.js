const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  human: {
    age: {
      type: String
    },
    gender: {
      type: String
    }
  },
  address: {
    type: String
  },
  rent: {
    price: {
      type: String
    },
    moveIn: {
      type: Date
    },
    length: {
      type: String
    }
  },
  prefs: {
    smoke: {
      type: Boolean
    },
    clean: {
      type: Boolean
    },
    guests: {
      type: Boolean
    },
    pets: {
      type: Boolean
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Listing = mongoose.model("listing", ListingSchema);
