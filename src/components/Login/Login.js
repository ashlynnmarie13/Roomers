import React from "../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import { Link } from "../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom";
import { connect } from "../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-redux";
import { getItems } from "../../redux/ducks/userReducer";

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
