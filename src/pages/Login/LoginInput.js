import React, { useContext } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import Cookie from "js-cookie";
import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import api from "../../service/api";
import "./styles.css";

export const LoginInput = () => {
  const { tryLogin } = useContext(AuthContext);

  function newPassword() {
    Swal.fire({
      title: "Insira seu email",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Solicitar nova senha",
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return api
          .put(`/usuarios/solicitartrocadesenha?email=${email}`, null)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            Swal.showValidationMessage(
              `Houve um problema: ${error.response.data.erros}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `${result.value}`,
        });
      }
    });
  }

  const handleSubmit = (values) => {
    tryLogin(values);
  };

  const validations = yup.object().shape({
    email: yup.string().required("Insira seu email"),
    password: yup.string().required("Insira sua senha"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Form-Input">
          <div className="Form_Group-Input">
            <div className="div-msg-error">
              <ErrorMessage
                component="span"
                name="email"
                className="Form_Error-Input"
              />
            </div>
            <Field
              name="email"
              className="Form_Field-Input"
              placeholder="E-mail"
              autoComplete="off"
            />{" "}
            <br />
          </div>

          <div className="Form_Group-Input">
            <div className="div-msg-error">
              <ErrorMessage
                component="span"
                name="password"
                className="Form_Error-Input"
              />
            </div>
            <Field
              name="password"
              type="password"
              className="Form_Field-Input"
              placeholder="Senha"
            />{" "}
            <br />
          </div>

          <div class="esqueceu-senha-div">
            <p onClick={() => newPassword()} class="esqueceu-senha-p">
              Esqueceu a senha?
            </p>
          </div>

          <button className="Form_Btn-Input" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <p>
        Não tem uma conta?{" "}
        <a class="cadastro-click" href="/cadastro">
          Cadastrar-se
        </a>
      </p>
    </>
  );
};
