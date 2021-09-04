import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";

import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import MeusCarros from "../pages/MeusCarros";
import MeusPedidos from "../pages/MeusPedidos";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/meuscarros" component={MeusCarros} />
    <PrivateRoute path="/meuspedidos" component={MeusPedidos} />
    <LoginRoute path="/login" component={Login} />
  </Switch>
);
export default Routes;
