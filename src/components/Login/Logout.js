import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
const Logout = props => {
  console.log(props);

  return (
    <div>
      <a href={process.env.REACT_APP_LOGOUT}>
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#031424",
            border: "solid #031424 2px",
            color: "white",
            width: "100%",
            height: "60px",
            fontSize: "1.2em"
          }}
        >
          Log Out
        </Button>
      </a>
    </div>
  );
};
const mapStatetoProps = state => state;
export default connect(mapStatetoProps)(Logout);
