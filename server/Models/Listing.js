const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListingSchema = new Schema({
  userID: {
    type: String,
    ref: "users"
  },
  human: {
    age: {
      earlyTwenties: Boolean,
      lateTwenties: Boolean,
      thirties: Boolean,
      fortiesAndOlder: Boolean
    },
    gender: {
      male: Boolean,
      female: Boolean
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    fullAddress: String
  },

  rent: {
    monthlyCost: String,
    depositCost: String,
    moveInDate: String,
    rentLength: String
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
  amenities: {
    washer: Boolean,
    wifi: Boolean,
    utilities: Boolean,
    furnished: Boolean,
    elevator: Boolean,
    doorman: Boolean,
    airConditioning: Boolean,
    heating: Boolean,
    gym: Boolean,
    tv: Boolean,
    privateBathroom: Boolean,
    outdoorSpace: Boolean,
    hasPet: Boolean
  }
});

module.exports = Listing = mongoose.model("listing", ListingSchema);
