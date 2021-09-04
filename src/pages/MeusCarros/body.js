import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";

const Body = () => {
  const [meusCarros, setMeusCarros] = useState([]);

  useEffect(() => {
    if (Cookie.get("@token")) {
      api
        .get("/usuarios/meuscarros", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusCarros(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      {meusCarros.length > 0 ? (
        meusCarros.map((carro) => <p>{carro.modelo}</p>)
      ) : (
        <p>Voce nao possue nenhum carro cadastrado</p>
      )}
    </>
  );
};

export default Body;
