import React from "react";
import { Redirect, Route } from "react-router-dom";

// Utils
// import { isLoggedIn } from "../../helpers/auth";

const isLoggedIn = () => {
  return false
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "login" }} />
      )
    }
  />
);

export default PrivateRoute;
