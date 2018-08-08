import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import Location from "./components/Location/Location";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/Location" component={Location} />
  </Switch>
);
