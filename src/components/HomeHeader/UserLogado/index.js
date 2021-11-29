import React, { useEffect, useState } from "react";

import avatar from "../../../assets/avatar.png";
import api from "../../../service/api";
import Cookie from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./styles.css";

const UserLogado = () => {
  const history = useHistory();
  const [usuarioLogado, setUsuarioLogado] = useState();
  const [isOpen, setIsOpen] = useState(false);

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

  function openOrClose() {
    setIsOpen((prevIsOpen) => !prevIsOpen);

    if (!isOpen) {
      var element = document.getElementById("user-info-mh");
      element.classList.add("open");
    } else {
      var element = document.getElementById("user-info-mh");
      element.classList.remove("open");
    }
  }

  function deslogar() {
    setUsuarioLogado();
    Cookie.remove("@token");
    history.push("/");
  }

  return (
    <div id="user-info-mh" onClick={() => openOrClose()}>
      <p>{usuarioLogado ? usuarioLogado.nome : null}</p>
      <img src={avatar} alt="" style={{ height: 45 }} />
      {isOpen ? (
        <div class="menu-user-mh-outside">
          <nav id="menu-user-mh" onMouseLeave={() => openOrClose()}>
            <ul class="list-items">
              <li>
                <Link to="/painelhome" class="ea-option">
                  Painel
                </Link>
              </li>
              <li onClick={() => alert("Editar meu perfil")}>
                <Link class="ea-option">Meu Perfil</Link>
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
                <Link class="ea-option">Sair</Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

export default UserLogado;
