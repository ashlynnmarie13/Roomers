import React, { Component } from "react";
import { Button, Card, Image, Icon, Segment } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = props => {
  const { profilePic, birthday, aboutMe, name, title, id, pathPush } = props;
  let age = moment().diff(birthday, "years");

  return (
    <div className="container-card">
      {" "}
      <Card style={{ backgroundColor: "#fffafa" }}>
        <Image
          className="profile-image"
          onClick={() => pathPush(`/profile/${id}`)}
          src={profilePic}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Meta style={{ color: "#8eaebd" }}>{title}</Card.Meta>

          <Card.Description>{aboutMe}</Card.Description>
          <Card.Description style={{ marginTop: "10px" }}>
            Age: {age}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Link to="/chat">
              <Button
                style={{
                  backgroundColor: "#8eaebd",
                  color: "white",
                  textShadow: ".5px .5px #000000"
                }}
              >
                Message
              </Button>
            </Link>
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileCard;
