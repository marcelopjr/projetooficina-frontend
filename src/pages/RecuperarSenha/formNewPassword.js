import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import api from "../../service/api";
import Swal from "sweetalert2";
import AuthContext from "../../context/authContext";
// import { Container } from './styles';

const FormNewPassword = ({ confirmKey, user }) => {
  const { verifyError, setLoading } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = (values) => {
    setLoading(true);
    api
      .put(
        `/usuarios/trocarsenha?email=${user}&chave=${confirmKey}&senha=${values.password}`,
        null
      )
      .then((response) => {
        Swal.fire({
          title: "Senha alterada com sucesso",
          text: response.data,
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
          title: "Houve um problema na alteracao da senha",
          text: error.response.data.erros,
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
      });
  };

  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg,
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  yup.addMethod(yup.string, "equalTo", equalTo);

  const validations = yup.object().shape({
    password: yup
      .string()
      .min(4, "Minimo de 4 caracteres")
      .required("Insira sua senha"),
    confirmPassword: yup
      .string()
      .equalTo(yup.ref("password"), "Os campos precisam ser iguais"),
  });
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={handleSubmit}
      validationSchema={validations}
    >
      <Form className="Form-Input">
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
            className="Form_Field-Input"
            placeholder="Senha"
            autoComplete="off"
            type="password"
          />{" "}
          <br />
        </div>

        <div className="Form_Group-Input">
          <div className="div-msg-error">
            <ErrorMessage
              component="span"
              name="confirmPassword"
              className="Form_Error-Input"
            />
          </div>
          <Field
            name="confirmPassword"
            type="password"
            className="Form_Field-Input"
            placeholder="Confirme sua senha"
          />{" "}
          <br />
        </div>

        <button className="Form_Btn-Input" type="submit">
          Alterar Senha
        </button>
      </Form>
    </Formik>
  );
};

export default FormNewPassword;
