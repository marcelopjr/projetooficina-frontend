import React from "react";

import Header from "../../components/PainelHeader";
import { Footer } from "../../components/Footer/index";
import { Container } from "../../components/Container";
import { SideMenuBar } from "../../components/Sidebar";

import { LoginInput } from "./LoginInput";

import "./StylesPage.css";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const Login = () => {
  return (
    <>
      <Container layout="1">
        <div className="login-card">
          <div className="login-part">
            <div class="arrow-btn">
              <Link to="/" class="link-btn-arrow">
                <i class="fas fa-arrow-left fa-3x"></i>
              </Link>
            </div>
            <div class="form-div">
              <h2 className="login-part-title">Iniciar Sessão</h2>
              <LoginInput />
            </div>
          </div>

          <div className="singup-part">
            <div className="singup-contents">
              <h2 className="singup-part-title">Não tem uma conta?</h2>
              <p className="singup-part-text">
                Não perca a chance e cadastre-se abaixo!
              </p>

              <Link to="/cadastro" className="singup-part-btn">
                CADASTRAR
              </Link>
            </div>

            {/* <p className="cadastro-p">
              Não tem uma conta?{" "}
              <a class="cadastro-click" href="/cadastro">
                Cadastrar-se
              </a>
            </p> */}
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default Login;
