import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/authContext";
import Loader from "./components/Loader";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Loader />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
