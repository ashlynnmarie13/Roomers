const express = require("express");
const { json } = require("body-parser");
const app = express();
require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
app.use(json());
const port = 3001;
const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl`);
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

massive(process.env.CONNECTION_STRING).then(dbinstance => {
  app.set("db", dbinstance);
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  const db = app.get("db");

  db.getUserByAuthid([user.id])
    .then(response => {
      if (!response[0]) {
        db.addUserByAuthid([user.displayName, user.id, user.picture])
          .then(res => {
            done(null, res[0]);
          })
          .catch(console.log);
      } else return done(null, response[0]);
    })
    .catch(console.log);
});

passport.deserializeUser((user, done) => done(null, user));

app.get("/me", getUser);

app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "/",
    successRedirect: "http://localhost:3000/#/",
    // successRedirect: "/#/",
    failureRedirect: "/login"
  })
);

app.listen(port, () => {
  console.log(`app is running in server port ${port}`);
});
