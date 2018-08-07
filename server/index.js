const express = require("express");
const { json } = require("body-parser");
const app = express();
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Pulling in the user schema
const User = require("./Models/User");

//middleware
app.use(json());

//WE HAVE TO PUT THIS HERE FOR SOCKET.IO TO WORK
const port = 3001;
app.listen(port, () => {
  console.log(`app is running in server port ${port}`);
});

// requiring auth0 from controller
const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl`);

//setting up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

//Connect to MongoDB
const db = process.env.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("We found it, the rainbow connection!"))
  .catch(err => console.log(err));

//meh
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

//pulling the user and sending the info back to the front-end
passport.serializeUser((user, callback) => {
  const db = app.get("db");
  db.getUserByAuthid([user.id])
    .then(response => {
      if (!response[0]) {
        db.addUserByAuthid([user.displayName, user.id, user.picture])
          .then(res => done(null, res[0]))
          .catch(console.log);
      } else return done(null, response[0]);
    })
    .catch(console.log);
});

function create(user, callback) {
  User.findOne({ email: user.email }, function(err, withSameMail) {
    if (err) return callback(err);
    if (withSameMail) return callback(new Error("the user already exists"));

    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      users.insert(user, function(err, inserted) {
        if (err) return callback(err);
        callback(null);
      });
    });
  });
}

//I'm not sure what this does
passport.deserializeUser((user, done) => done(null, user));

// getting user with "getUser" from authCtrl
app.get("/me", getUser);

//redirects user to the home page after logging in
app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "/",
    successRedirect: "http://localhost:3000/#/",
    // successRedirect: "/#/",
    failureRedirect: "/login"
  })
);
