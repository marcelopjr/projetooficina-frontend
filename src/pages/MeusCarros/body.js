import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";
import axios from "axios";
import CarroBody from "../../components/MeusCarros/CarroBody";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";

import "./formstyles.css";

const Body = () => {
  const [meusCarros, setMeusCarros] = useState([]);

  async function validaPlaca(placa) {
    if (placa) {
      if (placa.length === 7) {
        try {
          let res = await axios({
            url: `http://localhost:8000/oficina/carros/existeplaca?placa=${placa}`,
            method: "get",
            timeout: 8000,
            headers: {
              Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
            },
          });
          console.log(!res.data);
          return !res.data;
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

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
    cor: yup.string().required("Preencha o campo"),
    placa: yup
      .string()
      .required("Preencha o campo")
      .min(7, "Placa invalida")
      .test("placa-check", "Placa ja cadastrada", validaPlaca),
  });

  const handleSubmit = (values) => {
    Swal.fire({
      title: "Confirme as informações do veículo abaixo",
      html: `<div class="info-confirm-veiculo"> 
      <p>Modelo: <strong>${values.modelo} </strong> </p> 
      <p>Marca: <strong>${values.marca} </strong> </p> 
      <p>Placa: <strong>${values.placa} </strong> </p> 
      <p>Cor: <strong>${values.cor} </strong> </p> 
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
        console.log(values);
      }
    });
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
                        component="span"
                        name="modelo"
                        className="Form_Error-Input"
                      />
                    </div>
                  </div>
                  <Field
                    id="modelo"
                    name="modelo"
                    className={
                      errors.modelo && touched.modelo
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
                    }
                    autoComplete="off"
                    onInput={() =>
                      (document.getElementById("modelo").value = document
                        .getElementById("modelo")
                        .value.toUpperCase())
                    }
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
                    id="marca"
                    name="marca"
                    className={
                      errors.marca && touched.marca
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
                    }
                    autoComplete="off"
                    onInput={() =>
                      (document.getElementById("marca").value = document
                        .getElementById("marca")
                        .value.toUpperCase())
                    }
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
                    id="cor"
                    name="cor"
                    className={
                      errors.cor && touched.cor
                        ? "Form_Field-Input-nc error"
                        : "Form_Field-Input-nc"
                    }
                    autoComplete="off"
                    onInput={() =>
                      (document.getElementById("cor").value = document
                        .getElementById("cor")
                        .value.toUpperCase())
                    }
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
                        placeholder="AAA9999"
                        mask="aaa9999"
                        maskChar=""
                        id="placa"
                        type="text"
                        className={
                          errors.placa && touched.placa
                            ? "Form_Field-Input-nc error"
                            : "Form_Field-Input-nc"
                        }
                        beforeMaskedValueChange={function (newState) {
                          newState.value = newState.value.toUpperCase();
                          return newState;
                        }}
                        autoComplete="off"
                      />
                    )}
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
