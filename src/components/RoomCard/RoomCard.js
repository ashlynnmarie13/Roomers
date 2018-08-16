import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

export default props => {
  const { address, amenities, human, prefs, rent, userID, id, loggedInUser, images } = props;
  console.log(loggedInUser)

  return (
    <Card style={{ height: "400px", marginTop: 0 }}>
      <Link to={`/listing/${id}`}>
        <Image
          style={{ width: "100%", height: "200px" }}
          src={
            images
              ? images[0]
              : "https://images.alphacoders.com/435/thumb-1920-435117.jpg"
          }
        />
      </Link>
      <Card.Content>
        <Card.Header>
          ${rent.monthlyCost} in {address.city}, {address.state}
        </Card.Header>
        <Card.Meta>
          <span className="date">
            {moment(rent.moveInDate).format("MMM Do YYYY")} - {rent.rentLength}{" "}
            Months
          </span>
        </Card.Meta>
        <Card.Description />
      </Card.Content>
      <Card.Content extra>
        <a 
          onClick={() =>
            props.onSubmit(
              id,
              userID,
              loggedInUser,
              rent.monthlyCost,
              address.city,
              address.state,
              rent.moveInDate,
              rent.rentLength,
              images[0]
            )
          }
        >
          {" "}
          {props.text}{" "}
        </a>
      </Card.Content>
    </Card>
  );
};
