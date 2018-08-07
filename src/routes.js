import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import AddListing from './components/AddListing/AddListing';
import Profile from './components/Profile/Profile';
import Wishlist from './components/Wishlist/Wishlist';
import SearchRooms from './components/SearchRooms/SearchRooms';
import MyListings from './components/MyListings/MyListings';
import Home from './components/Home/Home'

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/profile" component={Profile}/>
    <Route path="/wishlist" component={Wishlist}/>
    <Route path="/addlisting" component={AddListing}/>
    <Route path="/searchrooms" component={SearchRooms}/>
    <Route path="/myListings" component={MyListings}/>
    <Route path="/home" component={Home}/>
  </Switch>
);
