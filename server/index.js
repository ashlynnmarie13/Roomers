require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const app = express();
const multer = require("multer");
const ctrl = require("./controllers/controller");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const Auth0Strategy = require("passport-auth0");

//requiring socket.io things
const http = require("http");
const socket = require("socket.io");

//Pulling in the user schema
const User = require("./Models/User");

const upload = multer({ dest: "uploads/" });

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;

//middleware
app.use(json());

const server = http.createServer(app);
const io = (module.exports.io = socket(server));
app.use(express.static(path.join(__dirname, "../build")));
//socket.io related

//WE HAVE TO PUT THIS HERE FOR SOCKET.IO TO WORK
const port = process.env.PORT || 3001;

const SocketManager = require("./controllers/socketCtrl");

//Socket.io stuff

io.on("connection", SocketManager);

// requiring auth0 from controller
const { getUser, logout } = require(`${__dirname}/controllers/authCtrl`);

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
passport.use(
  new Auth0Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      domain: DOMAIN,
      callbackURL: "/login",
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      done(null, profile);
    }
  )
);

//pulling the user and sending the info back to the front-end
passport.serializeUser((user, done) => {
  User.findOne({
    name: user.displayName,
    authID: user.id,
    picture: user.picture
  })
    .then(response => {
      if (!response) {
        const newUser = new User({
          name: user.displayName,
          authID: user.id,
          picture: user.picture,
          newUser: true
        });
        newUser
          .save()
          .then(res => {
            done(null, res);
          })

          .catch(err => console.log(err));
      } else {
        User.findOneAndUpdate({ authID: response.authID }, { new: true }).then(
          user => {
            done(null, user);
          }
        );
      }
    })
    .catch(err => console.log(err));
});

//I'm not sure what this does
passport.deserializeUser((user, done) => done(null, user));

// getting user with "getUser" from authCtrl
app.get("/me", getUser);

//redirects user to the home page after logging in
app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "/",
    successRedirect: `http://localhost:3000/#/signup`,
    // successRedirect: "/#/",
    failureRedirect: "/login"
  })
);

// adds user info
app.post("/api/user/info", upload.single("profilePic"), ctrl.addUserInfo);
app.post("/api/upload", upload.single("profilePic"), ctrl.uploadPhoto);

// retrieves user/profile info for all profiles
app.get("/api/users/info", ctrl.getAllProfiles);
// get profile by id
app.get("/api/user/info/:_id", ctrl.getProfileById);

server.listen(port, () => {
  console.log(`app is running in server port ${port}`);
});
