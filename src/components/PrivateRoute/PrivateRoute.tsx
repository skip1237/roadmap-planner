import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase, db } from "../../firebase";

// Utils
// import { isLoggedIn } from "../../helpers/auth";

// const isLoggedIn = () => {
//   console.log("isLoggedIn");

//   firebase.auth.onAuthStateChanged(authUser => {
//     if (authUser) {
//       console.log("authUser", authUser);
//       return true;
//     } else {
//       console.log("authUser is null");
//       return false;
//     }
//   });
//   return false;
// };

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
