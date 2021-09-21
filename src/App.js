import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
