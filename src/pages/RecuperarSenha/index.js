import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";

import Header from "../../components/Header";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer/index";
import AuthContext from "../../context/authContext";
import api from "../../service/api";

import Swal from "sweetalert2";
// import { Container } from './styles';

import FormNewPassword from "./formNewPassword";

const RecuperarSenha = () => {
  const { verifyError, setLoading } = useContext(AuthContext);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  function verifyRecovery() {
    api
      .get(
        `/usuarios/validartrocadesenha?chave=${query.get(
          "k"
        )}&email=${query.get("u")}`
      )
      .then((response) => {
        if (response.data) {
          setIsValid(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Link de recuperação incorreto",
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
      verifyRecovery();
    } else {
      Swal.fire({
        title: "Link de recuperação incorreto",
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

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  return (
    <>
      <Container>
        <div className="div_card" style={{ width: "100%" }}>
          <Header />
          <div className="sub_div">
            {isValid ? (
              <FormNewPassword
                confirmKey={query.get("k")}
                user={query.get("u")}
              />
            ) : null}
          </div>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default RecuperarSenha;
