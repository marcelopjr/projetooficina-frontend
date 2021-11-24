import React from "react";

import Header from "../../components/PainelHeader";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";

import FormCadastro from "./formCadastro";

const Cadastro = () => {
  return (
    <>
      <Container>
        <div className="div_card" style={{ width: "100%" }}>
          <Header />
          <div className="sub_div">
            <h1>Cadastro</h1>
            <FormCadastro />
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Cadastro;
