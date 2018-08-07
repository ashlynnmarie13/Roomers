require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const app = express();

const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const Auth0Strategy = require("passport-auth0");

//Pulling in the user schema
const User = require("./Models/User");

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;

//middleware
app.use(json());

//WE HAVE TO PUT THIS HERE FOR SOCKET.IO TO WORK
const port = 3001;
app.listen(port, () => {
  console.log(`app is running in server port ${port}`);
});

// requiring auth0 from controller
// const { getUser, logout } = require(`${__dirname}/controllers/authCtrl`);

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
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      domain: process.env.DOMAIN,
      callbackURL: "/login",
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, user, done) => {
      User.findOne({
        name: user.displayName,
        user: user.id,
        picture: user.picture
      }).then(response => {
        if (!response) {
          const newUser = new User({
            name: user.displayName,
            authID: user.id,
            picture: user.picture
          });
          newUser
            .save()

            .then(response => done(null, user.id))

            .catch(err => console.log(err));
        } else return done(null, user.id);
      });

      passport.serializeUser((user, done) => done(null, user));

      passport.deserializeUser((user, done) => done(null, user));
    }
  )
);

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
          .then(res => done(null, user))

          .catch(console.log);
      } else return done(null, user);
    })
    .catch(console.log);
});

//I'm not sure what this does
// passport.deserializeUser((user, done) => done(null, user));

// getting user with "getUser" from authCtrl
app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "/",
    successRedirect: "http://localhost:3000/#/",
    // successRedirect: "/#/",
    failureRedirect: "/login"
  })
);

function authenticated(req, res) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get("/me", authenticated, (req, res, next) => {
  res.status(200).send(req.user);
});

const getUser = (req, res) => {
  console.log(req);
  if (req.user) res.status(200).json(req.user);
  else res.status(403).json({ message: "Not Logged In" });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
    // res.redirect("/#/");
  });
};

//redirects user to the home page after logging in
