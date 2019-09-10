import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSession();
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
