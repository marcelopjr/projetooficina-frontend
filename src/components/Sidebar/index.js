import React, { useEffect, useState } from "react";

import "./styles.css";

import avatar from "../../assets/avatar.png";
import api from "../../service/api";
import Cookie from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const SideMenuBar = () => {
  const history = useHistory();
  const [usuarioLogado, setUsuarioLogado] = useState();

  // var automaticLogout;
  // function secondsToExpire() {
  //   if (JSON.parse(Cookie.get("@token")).expire) {
  //   }

  //   var milisseconds = Math.abs(
  //     new Date(JSON.parse(Cookie.get("@token")).expire) - new Date().getTime()
  //   );
  //   var seconds = Math.round(milisseconds / 1000);

  //   console.log(seconds);
  //   if (seconds === 2) {
  //     clearInterval(automaticLogout);
  //     Swal.fire({
  //       title: "Sessão expirada",
  //       text: "Faça login novamente para continuar!",
  //       icon: "error",
  //       showCancelButton: false,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ok!",
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         history.push("/login");
  //       }
  //     });
  //   }
  // }

  // if (Cookie.get("@token")) {
  //   automaticLogout = setInterval(secondsToExpire, 1000);
  // }

  useEffect(() => {
    if (Cookie.get("@token")) {
      api
        .get("/usuarios/minhasinfos", {
          headers: {
            Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
          },
        })
        .then((response) => setUsuarioLogado(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  function deslogar() {
    setUsuarioLogado();
    Cookie.remove("@token");
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
              <div class="div-opcoes">
                <li>
                  <Link to="/painelhome" className="option-a">
                    <i class="fas fa-home"></i>Home
                  </Link>
                </li>

                <li>
                  <Link to="/meuscarros" className="option-a">
                    <i class="fas fa-car"></i>Meus Carros
                  </Link>
                </li>
                <li>
                  <Link to="/meuspedidos" className="option-a">
                    <i class="fas fa-clipboard-list"></i>Meus Pedidos
                  </Link>
                </li>
              </div>
              <div class="botao-deslogar">
                <li onClick={() => alert("Editar Perfil")}>
                  <i class="fas fa-user-cog"></i>Meu Perfil
                </li>
                <li
                  onClick={() =>
                    Swal.fire({
                      title: "Tem certeza que deseja sair?",
                      // text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sim, sair!",
                      allowOutsideClick: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("Deslogado!", "", "success");
                        deslogar();
                      }
                    })
                  }
                >
                  <i class="fas fa-sign-out-alt"></i>Sair
                </li>
              </div>
            </>
          ) : (
            <>
              <div>
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
              </div>
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
