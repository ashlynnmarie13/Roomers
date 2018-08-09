import React from "react";

const ListingCard = props => {
  return (
    <div className="ListingCard">
    <div className="image-container">
      <img className="card-image" src={props.listing.image_url} />
    </div>
    <div className="description">
      {props.listing.name}
      <div>{props.listing.adress}</div>
      <div>{props.listing.price}</div>
    </div>
  </div>
  );
};

export default ListingCard;
