import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login/Login'


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />

      <Route path="/login" component={Login} />


    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
