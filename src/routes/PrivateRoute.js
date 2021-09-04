import React from "react";

import { Route, Redirect } from "react-router";
import Cookie from "js-cookie";

const PrivateRoute = (props) => {
  const isLogged = !!Cookie.get("@token");
  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
