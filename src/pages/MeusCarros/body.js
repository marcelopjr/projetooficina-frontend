import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";
import CarroBody from "../../components/MeusCarros/CarroBody";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";

import "./formstyles.css";

const Body = () => {
  const [meusCarros, setMeusCarros] = useState([]);
  const [placa2, setPlaca] = useState("");

  useEffect(() => {
    if (Cookie.get("@token")) {
      api
        .get("/usuarios/meuscarros", {
          headers: {
            Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
          },
        })
        .then((response) => setMeusCarros(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  function mostrar() {
    var element = document.getElementById("novo-carro-div");
    element.classList.remove("hide-novo-carro-div");
  }

  function ocultar() {
    var element = document.getElementById("novo-carro-div");
    element.classList.add("hide-novo-carro-div");
  }

  const validations = yup.object().shape({
    modelo: yup.string().required("Preencha o campo"),
    marca: yup.string().required("Preencha o campo"),
    placa: yup.string().required("Preencha o campo"),
    cor: yup.string().required("Preencha o campo"),
  });

  const handleSubmit = (values) => {
    console.log("aq");
    console.log(values);
  };

  return (
    <>
      <div class="novo-carro-click-div">
        <p class="novo-carro-click" onClick={() => mostrar()}>
          Cadastrar novo carro
        </p>
      </div>
      <div id="novo-carro-div" class="hide-novo-carro-div">
        <div class="nc-header">
          <h3>Novo Carro</h3>
          <button class="btn-close" onClick={() => ocultar()}>
            <i class="fas fa-times fa-2x"></i>
          </button>
        </div>
        <Formik
          initialValues={{ modelo: "", marca: "", placa: "", cor: "" }}
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
              <Form className="Form-Input-nc">
                <div className="Form_Group-Input-nc">
                  <div className="div-title-and-error-nc">
                    <div class="title-input-nc">
                      <p>Modelo:</p>
                    </div>

                    <div class="error-msg-nc">
                      <ErrorMessage
                        id="errormodelo"
                        component="span"
                        name="modelo"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    name="modelo"
                    className={
                      errors.modelo
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
                    }
                    autoComplete="off"
                  />
                </div>

                <div className="Form_Group-Input-nc">
                  <div className="div-title-and-error-nc">
                    <div class="title-input-nv">
                      <p>Marca: </p>
                    </div>

                    <div class="error-msg-nc">
                      <ErrorMessage
                        component="span"
                        name="marca"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    name="marca"
                    className={
                      errors.marca
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
                    }
                    autoComplete="off"
                  />
                </div>

                <div className="Form_Group-Input-nc">
                  <div className="div-title-and-error-nc">
                    <div class="title-input-nc">
                      <p>Placa: </p>
                    </div>

                    <div class="error-msg-nc">
                      <ErrorMessage
                        component="span"
                        name="placa"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    name="placa"
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        mask="aaa-9999"
                        id="placa"
                        type="text"
                        className={
                          errors.placa
                            ? "Form_Field-Input-nc error"
                            : "Form_Field-Input-nc"
                        }
                      />
                    )}
                  />
                </div>

                <div className="Form_Group-Input-nc">
                  <div className="div-title-and-error-nc">
                    <div class="title-input-nc">
                      <p>Cor: </p>
                    </div>

                    <div class="error-msg-nc">
                      <ErrorMessage
                        component="span"
                        name="cor"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    name="cor"
                    className={
                      errors.cor
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
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

      {meusCarros.length > 0 ? (
        meusCarros.map((carro) => <CarroBody carro={carro} />)
      ) : (
        <p>Voce nao possue nenhum carro cadastrado</p>
      )}
    </>
  );
};

export default Body;
