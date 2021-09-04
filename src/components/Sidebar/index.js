import React, { useEffect, useState } from "react";

import "./styles.css";

import avatar from "../../assets/avatar.png";
import api from "../../service/api";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

export const SideMenuBar = () => {
  const history = useHistory();
  const [usuarioLogado, setUsuarioLogado] = useState();

  useEffect(() => {
    if (Cookie.get("@token")) {
      api
        .get("/usuarios/minhasinfos", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setUsuarioLogado(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  function deslogar() {
    setUsuarioLogado();
    Cookie.remove("@token");
    alert("Deslogado");
    history.push("/");
  }

  return (
    <>
      <nav id="sidebar">
        {usuarioLogado ? (
          <div class="user">
            <div class="user-img">
              <img src={avatar} alt="" style={{ height: 80 }} />
            </div>

            <div class="user-info">
              <p>Nome: {usuarioLogado.nome}</p>
              <p>CPF: {usuarioLogado.cpf}</p>
              <p>E-mail: {usuarioLogado.email}</p>
            </div>
          </div>
        ) : (
          <div class="user">
            <div class="user-img">
              <img src="" alt="" style={{ height: 80 }} />
            </div>

            <div class="user-info">
              <h2>Conecte-se</h2>
            </div>
          </div>
        )}

        <ul class="list-items">
          {Cookie.get("@token") ? (
            <>
              <li>
                <a href="/">
                  <i class="fas fa-home"></i>Home
                </a>
              </li>

              <li>
                <a href="/meuscarros">
                  <i class="fas fa-car"></i>Meus Carros
                </a>
              </li>
              <li>
                <a href="/meuspedidos">
                  <i class="fas fa-clipboard-list"></i>Meus Pedidos
                </a>
              </li>
              <div class="botao-deslogar">
                <li onClick={() => alert("Editar Perfil")}>
                  <i class="fas fa-user-cog"></i>Meu Perfil
                </li>
                <li onClick={() => deslogar()}>
                  <i class="fas fa-sign-out-alt"></i>Sair
                </li>
              </div>
            </>
          ) : (
            <>
              <li>
                <a href="/">
                  <i class="fas fa-home"></i>Home
                </a>
              </li>
              <li>
                <a href="/login">
                  <i class="fas fa-user"></i>Login
                </a>
              </li>
            </>
          )}

          {/* <div class="icons">
            <a href="/">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="/">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i class="fab fa-github"></i>
            </a>
            <a href="/">
              <i class="fab fa-youtube"></i>
            </a>
          </div> */}
        </ul>
      </nav>
    </>
  );
};
