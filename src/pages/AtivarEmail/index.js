import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Header from "../../components/Header";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";
import AuthContext from "../../context/authContext";
import api from "../../service/api";

import "./styles.css";

import Swal from "sweetalert2";

const AtivarEmail = () => {
  const { verifyError, setLoading } = useContext(AuthContext);
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  function activeMail() {
    api
      .put(
        `/usuarios/ativaremail?chave=${query.get("k")}&email=${query.get("u")}`
      )
      .then((response) => {
        Swal.fire({
          title: "Conta ativada com sucesso!",
          text: "Seu acesso está liberado",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
          cancelButtonText: "Corrigir",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(false);
            history.push("/login");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Houve um problema na ativação",
          text: error.response.data.erros,
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
          cancelButtonText: "Corrigir",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(false);
            history.push("/login");
          }
        });
      });
  }

  useEffect(() => {
    setLoading(true);
    if (query.get("k") && query.get("u")) {
      activeMail();
    } else {
      Swal.fire({
        title: "Link de ativação incorreto",
        text: "Verifique o link enviado no seu email",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
        cancelButtonText: "Corrigir",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false);
          history.push("/login");
        }
      });
    }
  }, []);

  return (
    <>
      <Container>
        <div className="div_card" style={{ width: "100%" }}>
          <Header />
          <div className="sub_div"></div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default AtivarEmail;
