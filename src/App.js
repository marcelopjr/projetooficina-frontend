import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/authContext";
import { TimerProvider } from "./context/timerContext";
import Loader from "./components/Loader";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <TimerProvider>
        <AuthProvider>
          <Loader />
          <Routes />
        </AuthProvider>
      </TimerProvider>
    </BrowserRouter>
  );
};

export default App;
