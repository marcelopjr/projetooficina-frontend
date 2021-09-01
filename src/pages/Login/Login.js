import React from "react";

import Header from "../../components/Header";
import { Footer } from "../../components/Footer/index";
import { Container } from "../../components/Container";
import { SideMenuBar } from "../../components/Sidebar";

import { LoginInput } from "./LoginInput";

const Login = () => {
  return (
    <>
      <Container>
        <div className="div_sidebar">
          <SideMenuBar></SideMenuBar>
        </div>

        <div className="div_card">
          <Header />
          <div className="sub_div">
            <h2>Conecte-se</h2>

            <LoginInput />
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Login;
