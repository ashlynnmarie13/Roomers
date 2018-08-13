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

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/listing/:id" component={Listing} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/profile" component={Profile} />
    <Route path="/wishlist" component={Wishlist} />
    <Route path="/addlisting" component={AddListing} />
    <Route path="/searchrooms" component={SearchRooms} />
    <Route path="/searchpeople" component={SearchPeople} />
    <Route path="/myListings" component={MyListings} />
    <Route path="/home" component={Home} />
    <Route path="/chat" component={Chat} />
  </Switch>
);
