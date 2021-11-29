import React, { useContext } from "react";

import Header from "../../components/PainelHeader";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";
import { SideMenuBar } from "../../components/Sidebar";
import TimerContext from "../../context/timerContext";
// import { Container } from './styles';

const Home = () => {
  const {} = useContext(TimerContext);

  return (
    <>
      <Container>
        <div className="div_sidebar">
          <SideMenuBar></SideMenuBar>
        </div>

        <div className="div_card">
          <Header />
          <div className="sub_div">
            <h1>Bem-vindo a oficina SPEED CAR!</h1>
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Home;
