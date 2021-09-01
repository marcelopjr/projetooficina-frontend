import React from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import Cookie from "js-cookie";

import { useHistory } from "react-router-dom";

import api from "../../service/api";
import "./styles.css";

export const LoginInput = () => {
  const history = useHistory();

  var expiracao = new Date(new Date().getTime() + 15 * 60 * 1000);

  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      senha: values.password,
    };
    api
      .post("/auth", data)
      .then((response) => {
        if (response.status === 200) {
          // localStorage.setItem("Token", response.data);
          Cookie.set("@token", response.data, {
            expires: expiracao,
          });
          alert("Logado");
          history.push("/");
        }
      })
      .catch((error) => alert("Login ou senha invalido!"));
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Deslogado");
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

          <button className="Form_Btn-Input" type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <button
        className="Form_Btn-Input"
        onClick={() => console.log("Cadastro Screen")}
      >
        Cadastrar-se
      </button>
    </>
  );
};
