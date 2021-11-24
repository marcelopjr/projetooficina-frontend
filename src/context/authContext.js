import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookie, { getJSON } from "js-cookie";
import Swal from "sweetalert2";

import api from "../service/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [meusPedidos, setMeusPedidos] = useState([]);
  const [meusPedidosAtualizado, setMeusPedidosAtualizado] = useState([]);
  const [isLoading, setLoading] = useState(false);

  var expiracao = new Date(new Date().getTime() + 10 * 60 * 1000);

  var automaticLogout;
  function secondsToExpire() {
    if (JSON.parse(Cookie.get("@token")).expire) {
    }

    var milisseconds = Math.abs(
      new Date(JSON.parse(Cookie.get("@token")).expire) - new Date().getTime()
    );
    var seconds = Math.round(milisseconds / 1000);

    console.log(seconds);
    if (seconds === 2) {
      clearInterval(automaticLogout);
      Swal.fire({
        title: "Sessão expirada",
        text: "Faça login novamente para continuar!",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok!",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    }
  }

  if (Cookie.get("@token")) {
    automaticLogout = setInterval(secondsToExpire, 1000);
  }

  function findOs(filtro) {
    if (filtro === "Todas") {
      api
        .get("/usuarios/minhasos", {
          headers: {
            Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Abertas") {
      api
        .get("/usuarios/minhasosabertas", {
          headers: {
            Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Fechadas") {
      api
        .get("/usuarios/minhasosfechadas", {
          headers: {
            Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    }
  }

  function tryLogin(values) {
    console.log("tentei logar");
    const login = {
      email: values.email,
      senha: values.password,
    };
    api
      .post("/auth", login)
      .then((response) => {
        if (response.status === 200) {
          const data = {
            token: response.data,
            expire: expiracao,
          };
          Cookie.set("@token", JSON.stringify(data), {
            expires: expiracao,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push("/painelhome");
        }
      })
      .catch((error) =>
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.erros,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  }

  function verifyError(error) {
    if (error.response.status === 403) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Sessao expirada!",
        showConfirmButton: false,
        timer: 1500,
      }).then(history.push("/login"));
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocorreu um erro inesperado!",
        text: error.response.data.erros,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        tryLogin,
        verifyError,
        findOs,
        meusPedidos,
        setMeusPedidos,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
