import React, { Component } from "react";
import { Button, Card, Image, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./SearchPeople.css";

export default class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.profile
    };
  }
  render() {
    return (
      <div className="container-card">
        {" "}
        <Card style={{ backgroundColor: "#fffafa" }}>
          <Image src="https://media.licdn.com/dms/image/C4E03AQF2-OGxFrlI5Q/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=cAiBDUqlR09PUKKdtU7fwz8cm9jbyPbEfCB7LlPK5dU" />
          <Card.Content>
            <Card.Header>Grandpa, 88</Card.Header>

            <Card.Meta style={{ color: "#8eaebd" }}>Web Developer</Card.Meta>

            <Card.Description>
              My name is brandon and I have 13 grandchildren.
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
  }
}
