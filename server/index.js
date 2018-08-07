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
passport.serializeUser((user, done) => {
  User.findOne({ name: user.displayName, user: user.id, picture: user.picture })
    .then(response => {
      if (!response) {
        const newUser = new User({
          name: user.displayName,
          authID: user.id,
          picture: user.picture
        });
        newUser
          .save()
          .then(res => done(null, newUser))
          .catch(console.log);
      } else return done(null, user.id);
    })
    .catch(console.log);
});

//we need to pass in the new user

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
