import React, { useEffect, useState } from "react";

import avatar from "../../../assets/avatar.png";
import api from "../../../service/api";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const UserLogado = () => {
  const history = useHistory();
  const [usuarioLogado, setUsuarioLogado] = useState();

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

  return <p>Bem vindo: {usuarioLogado ? usuarioLogado.nome : null}</p>;
};

export default UserLogado;
