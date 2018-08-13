import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default props => {
  const { address, amenities, human, prefs, rent, userID, id } = props;

  return (
    <Card style={{ height: "400px" }}>
      <Link to={`/listing/${id}`}>
        <Image src="data:image/jpeg;base64>
      </Link>
      <Card.Content>
        <Card.Header>
          ${rent.monthlyCost} in {address.city}, {address.state}
        </Card.Header>
        <Card.Meta>
          <span className="date">
            {rent.moveInDate} - {rent.rentLength} Months
          </span>
        </Card.Meta>
        <Card.Description />
      </Card.Content>
      <Card.Content extra>
        <a>Add to Wishlist</a>
      </Card.Content>
    </Card>
  );
};
