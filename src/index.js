import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
