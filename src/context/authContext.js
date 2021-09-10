import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import Swal from "sweetalert2";

import api from "../service/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  var expiracao = new Date(new Date().getTime() + 15 * 60 * 1000);

  function tryLogin(values) {
    const data = {
      email: values.email,
      senha: values.password,
    };
    api
      .post("/auth", data)
      .then((response) => {
        if (response.status === 200) {
          Cookie.set("@token", response.data, {
            expires: expiracao,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push("/");
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
    <AuthContext.Provider value={{ tryLogin, verifyError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
