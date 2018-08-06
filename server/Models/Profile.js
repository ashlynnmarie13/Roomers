const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  profilepic: {
    type: String
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
  career: {
    type: String
  },
  company: {
    type: String
  },
  seeking: {
    type: String
  },
  traits: {
    clean: {
      type: Boolean
    },
    healthy: {
      type: Boolean
    },
    professional: {
      type: Boolean
    },
    student: {
      type: Boolean
    },
    earlyBird: {
      type: Boolean
    },
    nightOwl: {
      type: Boolean
    },
    fitnessEnthusiast: {
      type: Boolean
    },
    creative: {
      type: Boolean
    },
    bookworm: {
      type: Boolean
    },
    foodie: {
      type: Boolean
    },
    partyAnimal: {
      type: Boolean
    },
    vegan: {
      type: Boolean
    },
    introverted: {
      type: Boolean
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
