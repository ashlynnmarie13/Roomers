import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/chat" component={Chat} />
    <Route path="/home" component={Home} />
  </Switch>
);
