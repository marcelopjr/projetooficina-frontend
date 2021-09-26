import React, { useContext, useState } from "react";
import "./formstyles.css";
import { useHistory } from "react-router-dom";
import api from "../../service/api";
import axios from "axios";
import CarroBody from "../../components/MeusCarros/CarroBody";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
import AuthContext from "../../context/authContext";

const FormCadastro = () => {
  const history = useHistory();
  const { verifyError, setLoading } = useContext(AuthContext);
  var isCpfValid = false;
  var isEmailValid = false;

  async function checkEmail(email) {
    console.log("check mails ", email);

    try {
      let res = await axios({
        url: `http://localhost:8000/oficina/usuarios/checaremail?email=${email}`,
        method: "get",
        timeout: 8000,
      });

      if (res.data) {
        isEmailValid = false;
      } else {
        isEmailValid = true;
      }

      return !res.data;
    } catch (err) {}
  }

  async function checkCpf(cpf) {
    console.log(cpf);
    try {
      let res = await axios({
        url: `http://localhost:8000/oficina/usuarios/checarcpf?cpf=${cpf}`,
        method: "get",
        timeout: 8000,
      });

      if (res.data) {
        isCpfValid = false;
      } else {
        isCpfValid = true;
      }

      return !res.data;
    } catch (err) {}
  }

  const cpfValueSchema = yup
    .string()
    .required("Preencha o campo")
    .min(14, "CPF invalido");

  const emailValueSchema = yup
    .string()
    .required("Preencha o campo")
    .email("Email inválido");

  const validations = yup.object().shape({
    nome: yup.string().required("Preencha o campo"),
    cpf: cpfValueSchema.test(
      "cpf-check",
      "CPF ja cadastrado",
      async (value) => {
        if (await cpfValueSchema.isValid(value)) {
          if (isCpfValid) {
            return true;
          } else {
            return checkCpf(value);
          }
        }
      }
    ),
    telefone: yup.string().required("Preencha o campo"),
    email: emailValueSchema.test(
      "email-check",
      "Email ja cadastrado",
      async (value) => {
        if (await emailValueSchema.isValid(value)) {
          if (isEmailValid) {
            return true;
          } else {
            return checkEmail(value);
          }
        }
      }
    ),
    senha: yup.string().required("Preencha o campo"),
  });

  function signIn(values) {
    api
      .post("/usuarios/cadastro", values)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Cadastro Realizado com sucesso!",
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
            history.push("/login");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        verifyError(error);
      });
  }

  const handleSubmit = (values) => {
    Swal.fire({
      title: "Confirme suas informações abaixo",
      html: `<div class="info-confirm-user"> 
      <p>Nome: <strong>${values.nome} </strong> </p> 
      <p>CPF: <strong>${values.cpf} </strong> </p> 
      <p>Telefone: <strong>${values.telefone} </strong> </p> 
      <p>E-mail: <strong>${values.email} </strong> </p> 
      </div> `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Corretas",
      cancelButtonText: "Corrigir",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        signIn(values);
      }
    });
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            nome: "",
            cpf: "",
            telefone: "",
            email: "",
            senha: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <Form className="Form-Input-nu">
                <div className="Form_Group-Input-nu">
                  <div className="div-title-and-error-nu">
                    <div class="title-input-nu">
                      <p>Nome completo:</p>
                    </div>

                    <div class="error-msg-nu">
                      <ErrorMessage
                        component="span"
                        name="nome"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    id="nome"
                    name="nome"
                    className={
                      errors.nome && touched.nome
                        ? "Form_Field-Input-nu error"
                        : "Form_Field-Input-nu"
                    }
                    autoComplete="off"
                  />
                </div>

                <div className="Form_Group-Input-nu">
                  <div className="div-title-and-error-nu">
                    <div class="title-input-nu">
                      <p>CPF: </p>
                    </div>

                    <div class="error-msg-nu">
                      <ErrorMessage
                        component="span"
                        name="cpf"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    id="cpf"
                    name="cpf"
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            isCpfValid = false;
                          }
                        }}
                        placeholder="999.999.999-99"
                        mask="999.999.999-99"
                        maskChar=""
                        id="cpf"
                        type="text"
                        className={
                          errors.cpf && touched.cpf
                            ? "Form_Field-Input-nu error"
                            : "Form_Field-Input-nu"
                        }
                        autoComplete="off"
                      />
                    )}
                  />
                </div>

                <div className="Form_Group-Input-nu">
                  <div className="div-title-and-error-nu">
                    <div class="title-input-nu">
                      <p>Telefone: </p>
                    </div>

                    <div class="error-msg-nu">
                      <ErrorMessage
                        component="span"
                        name="telefone"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    id="telefone"
                    name="telefone"
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        placeholder="DDD 99999-9999"
                        mask="99 99999-9999"
                        maskChar=""
                        id="telefone"
                        type="text"
                        className={
                          errors.telefone && touched.telefone
                            ? "Form_Field-Input-nu error"
                            : "Form_Field-Input-nu"
                        }
                        autoComplete="off"
                      />
                    )}
                  />
                </div>

                <div className="Form_Group-Input-nu">
                  <div className="div-title-and-error-nu">
                    <div class="title-input-nu">
                      <p>Email: </p>
                    </div>

                    <div class="error-msg-nu">
                      <ErrorMessage
                        component="span"
                        name="email"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    name="email"
                    type="text"
                    autoComplete="off"
                    onChangeCapture={() => {
                      isEmailValid = false;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        isEmailValid = false;
                      }
                    }}
                    className={
                      errors.email && touched.email
                        ? "Form_Field-Input-nu error"
                        : "Form_Field-Input-nu"
                    }
                  />
                </div>

                <div className="Form_Group-Input-nu">
                  <div className="div-title-and-error-nu">
                    <div class="title-input-nu">
                      <p>Senha: </p>
                    </div>

                    <div class="error-msg-nu">
                      <ErrorMessage
                        component="span"
                        name="senha"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    id="senha"
                    name="senha"
                    type="password"
                    className={
                      errors.senha && touched.senha
                        ? "Form_Field-Input-nu error"
                        : "Form_Field-Input-nu"
                    }
                    autoComplete="off"
                  />
                </div>

                <button className="Form_Btn-Input" type="submit">
                  Cadastrar
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default FormCadastro;
