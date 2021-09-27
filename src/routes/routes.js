import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import MeusCarros from "../pages/MeusCarros";
import MeusPedidos from "../pages/MeusPedidos";
import Cadastro from "../pages/Cadastro";
import AtivarEmail from "../pages/AtivarEmail";
import RecuperarSenha from "../pages/RecuperarSenha";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/meuscarros" component={MeusCarros} />
    <PrivateRoute path="/meuspedidos" component={MeusPedidos} />
    <LoggedRoute path="/login" component={Login} />
    <LoggedRoute path="/cadastro" component={Cadastro} />
    <LoggedRoute path="/ativaremail" component={AtivarEmail} />
    <LoggedRoute path="/alterarsenha" component={RecuperarSenha} />
  </Switch>
);
export default Routes;
