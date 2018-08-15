import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import AddListing from "./components/AddListing/AddListing";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import SearchRooms from "./components/SearchRooms/SearchRooms";
import MyListings from "./components/MyListings/MyListings";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import SearchPeople from "./components/SearchPeople/SearchPeople";
import Listing from "./components/Listing/Listing";

import MyProfile from "./components/Profile/MyProfile";

import Location from "./components/Location/Location";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/listing/:id" component={Listing} />
    <Route path="/location/:state" component={Location} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/wishlist" component={Wishlist} />
    <Route path="/addlisting" component={AddListing} />
    <Route path="/searchrooms" component={SearchRooms} />
    <Route path="/searchpeople" component={SearchPeople} />
    <Route path="/mylistings" component={MyListings} />
    <Route path="/home" component={Home} />
    <Route path="/chat/:id" component={Chat} />
    <Route path="/myprofile/:id" component={MyProfile} />
  </Switch>
);
