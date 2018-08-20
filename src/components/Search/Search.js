import React, { Component } from "react";
import SearchRooms from "../SearchRooms/SearchRooms";
import SearchPeople from "../SearchPeople/SearchPeople";
import { Icon, Menu } from "semantic-ui-react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./Search.css";

class Search extends Component {
  render() {
    return (
      <div>
        <Menu icon="labeled">
          <NavLink to="/search/people">
            <Menu.Item>
              <Icon name="user" />
              People
            </Menu.Item>
          </NavLink>
          <NavLink to="/search/rooms">
            <Menu.Item>
              <Icon name="home" />
              Rooms
            </Menu.Item>
          </NavLink>
        </Menu>
        <div>
          <Switch>
            <Route exact path="/search/people" component={SearchPeople} />
            <Route exact path="/search/rooms" component={SearchRooms} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Search;
