import Header from "./components/Header";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer/index";
import { SideMenuBar } from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Container>
        <div className="div_sidebar">
          <SideMenuBar></SideMenuBar>
        </div>

        <div className="div_card">
          <Header />
          <div className="sub_div">
            <h1>Bem-vindo a oficina Clean Car!</h1>
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default App;
