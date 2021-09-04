import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";
import PedidoBody from "../../components/MeusPedidos/PedidoBody";

const Body = () => {
  const [meusPedidos, setMeusPedidos] = useState([]);

  useEffect(() => {
    if (Cookie.get("@token")) {
      api
        .get("/usuarios/minhasos", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => console.log(error));
    }
  }, []);
  return (
    <>
      {meusPedidos.map((pedido) => (
        <PedidoBody pedido={pedido} />
      ))}
    </>
  );
};

export default Body;
