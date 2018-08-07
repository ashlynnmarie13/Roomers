import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Login = props => {
  console.log(props);

  return (
    <div>
      <a href={process.env.REACT_APP_LOGIN}>
        <button>LOG IN</button>
      </a>
    </div>
  );
};
const mapStatetoProps = state => state;
export default connect(mapStatetoProps)(Login);
