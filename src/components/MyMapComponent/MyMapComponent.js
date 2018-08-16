import React from "react";
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  TrafficLayer,
  Marker
} = require("react-google-maps");

const MapWithATrafficLayer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLEMAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} center={{ lat: props.lat, lng: props.lng }}>
    <TrafficLayer autoUpdate />
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

export default MapWithATrafficLayer;
