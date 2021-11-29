import React, { useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";

import Home from "../pages/Home";
import PainelHome from "../pages/PainelHome";
import Login from "../pages/Login/Login";
import MeusCarros from "../pages/MeusCarros";
import MeusPedidos from "../pages/MeusPedidos";
import Cadastro from "../pages/Cadastro";
import AtivarEmail from "../pages/AtivarEmail";
import RecuperarSenha from "../pages/RecuperarSenha";

import TimerContext from "../context/timerContext";
// const { callTimer } = useContext(TimerContext);

const Routes = ({}) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/painelhome" exact component={PainelHome} />
    <PrivateRoute path="/meuscarros" component={MeusCarros} />
    <PrivateRoute path="/meuspedidos" component={MeusPedidos} />
    <LoggedRoute path="/login" component={Login} />
    <LoggedRoute path="/cadastro" component={Cadastro} />
    <LoggedRoute path="/ativaremail" component={AtivarEmail} />
    <LoggedRoute path="/alterarsenha" component={RecuperarSenha} />
  </Switch>
);
export default Routes;
