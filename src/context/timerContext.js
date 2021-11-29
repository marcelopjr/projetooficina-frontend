import React, { createContext } from "react";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import { useHistory, Link } from "react-router-dom";

const TimerContext = createContext({});

export const TimerProvider = ({ children }) => {
  const history = useHistory();
  let automaticLogout;
  function secondsToExpire() {
    if (Cookie.get("@token")) {
      var milisseconds = Math.abs(
        new Date(JSON.parse(Cookie.get("@token")).expire) - new Date().getTime()
      );
      var seconds = Math.round(milisseconds / 1000);
      console.log(seconds);
      if (seconds === 2) {
        clearInterval(automaticLogout);
        Cookie.remove("@token");
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
            history.replace("/login");
            history.go();
          }
        });
      }
    } else {
      console.log("parei");
      clearInterval(automaticLogout);
    }
  }

  function callTimer() {
    if (Cookie.get("@token")) {
      automaticLogout = setInterval(secondsToExpire, 1000);
    }
  }

  window.addEventListener("load", function (event) {
    callTimer();
  });

  return (
    <TimerContext.Provider value={{ callTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
