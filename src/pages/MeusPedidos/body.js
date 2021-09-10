import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";
import PedidoBody from "../../components/MeusPedidos/PedidoBody";

import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "./styles.css";
import { FormikProvider } from "formik";

const Body = () => {
  const [meusPedidos, setMeusPedidos] = useState([]);
  // const [filtro, setFiltro] = useState("");
  const history = useHistory();
  const { verifyError } = useContext(AuthContext);

  useEffect(() => {
    if (Cookie.get("@token")) {
      BuscarOS("Todas");
    }
  }, []);

  function BuscarOS(filtro) {
    if (filtro === "Todas") {
      api
        .get("/usuarios/minhasos", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Abertas") {
      api
        .get("/usuarios/minhasosabertas", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Fechadas") {
      api
        .get("/usuarios/minhasosfechadas", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    }
  }

  return (
    <>
      <div className="select-div">
        <label for="pedido-select">
          Filtrar por:
          <select
            name="pedido"
            id="pedido-select"
            onChange={() =>
              BuscarOS(document.getElementById("pedido-select").value)
            }
          >
            <option value="Todas" selected>
              Todas
            </option>
            <option value="Abertas">Abertas</option>
            <option value="Fechadas">Fechadas</option>
          </select>
        </label>
      </div>
      {meusPedidos.map((pedido) => (
        <PedidoBody pedido={pedido} />
      ))}
    </>
  );
};

export default Body;
