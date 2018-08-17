import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./ListingCard.css";

const ListingCard = props => {
  const {
    adress,
    rent,
    roomages,
    roomimage,
    availableDate,
    pathPush,
    profilePic,
    id
  } = props;

  return (
    <div className="container-card">
      <Card style={{ backgroundColor: "#fffafa" }}>
        <Image
          className="room-image"
          onClick={() => pathPush(`/listings/${id}`)}
          src={roomimage}
        />
        <Card.Content>
          <Card.Header>{availableDate}</Card.Header>

          <Card.Meta style={{ color: "#8eaebd" }}>{rent}</Card.Meta>

          <Card.Description>
            {adress} {roomages}
          </Card.Description>
          <Card.Description style={{ marginTop: "10px" }} />
        </Card.Content>
        <Card.Content extra>
          <a>
            <Link to="/profile">
              <img src={profilePic} />
            </Link>
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ListingCard;
