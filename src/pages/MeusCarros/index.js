import React from "react";

import Header from "../../components/PainelHeader";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";
import { SideMenuBar } from "../../components/Sidebar";
import Body from "./body";

// import { Container } from './styles';

const MeusCarros = () => {
  return (
    <>
      <Container>
        <div className="div_sidebar">
          <SideMenuBar></SideMenuBar>
        </div>

        <div className="div_card">
          <Header />
          <div className="sub_div">
            <h1>Seus Carros</h1>
            <Body></Body>
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default MeusCarros;
