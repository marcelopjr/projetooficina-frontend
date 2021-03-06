import React from "react";

import Header from "../../components/PainelHeader";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";
import { SideMenuBar } from "../../components/Sidebar";
import Body from "./body";

// import { Container } from './styles';

const MeusPedidos = () => {
  return (
    <>
      <Container>
        <div className="div_sidebar">
          <SideMenuBar></SideMenuBar>
        </div>

        <div className="div_card">
          <Header />
          <div className="sub_div">
            <h1 style={{ marginBottom: 10 }}>Meus Pedidos</h1>
            <Body></Body>
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default MeusPedidos;
