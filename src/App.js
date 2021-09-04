import Header from "./components/Header";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer/index";
import { SideMenuBar } from "./components/Sidebar";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
