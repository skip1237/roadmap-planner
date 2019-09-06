import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Page404, Page500, Hello, Login, Register } from "./Pages/index";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/register" name="Login" component={Register} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <PrivateRoute path="/" name="Home" component={Hello} />
      </Switch>
    </Router>
  );
}

export default App;
