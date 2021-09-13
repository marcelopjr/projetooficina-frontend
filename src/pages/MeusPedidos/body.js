import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";
import api from "../../service/api";
import PedidoBody from "../../components/MeusPedidos/PedidoBody";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "./styles.css";
import "./formstyles.css";
import { FormikProvider } from "formik";
import Swal from "sweetalert2";

const Body = () => {
  const [meusPedidos, setMeusPedidos] = useState([]);
  const [meusCarros, setMeusCarros] = useState([]);
  // const [filtro, setFiltro] = useState("");
  const history = useHistory();
  const { verifyError } = useContext(AuthContext);

  useEffect(() => {
    if (Cookie.get("@token")) {
      BuscarOS("Todas");
      BuscarMeusCarros();
    }
  }, []);

  function solicitarServico() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Servico Solicitado",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function ocultar() {
    var element = document.getElementById("novo-servico-div");
    element.classList.add("hide");
  }

  function mostrar() {
    var element = document.getElementById("novo-servico-div");
    element.classList.remove("hide");
  }

  function BuscarMeusCarros() {
    api
      .get("/usuarios/meuscarros", {
        headers: {
          Authorization: `Bearer ${Cookie.get("@token")}`,
        },
      })
      .then((response) => setMeusCarros(response.data))
      .catch((error) => verifyError(error));
  }

  function BuscarOS(filtro) {
    if (filtro === "Todas") {
      api
        .get("/usuarios/minhasos", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Abertas") {
      api
        .get("/usuarios/minhasosabertas", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    } else if (filtro === "Fechadas") {
      api
        .get("/usuarios/minhasosfechadas", {
          headers: {
            Authorization: `Bearer ${Cookie.get("@token")}`,
          },
        })
        .then((response) => setMeusPedidos(response.data))
        .catch((error) => verifyError(error));
    }
  }

  const validations = yup.object().shape({
    carro: yup.string().required("Por favor selecione seu carro"),
    data: yup.string().required("Escolha a data de entrega"),
  });

  const handleSubmit = (values) => {
    console.log("GG");
  };

  return (
    <>
      <div className="select-div">
        <label for="pedido-select">
          Filtrar por:
          <select
            name="pedido"
            id="pedido-select"
            onChange={() =>
              BuscarOS(document.getElementById("pedido-select").value)
            }
          >
            <option value="Todas" selected>
              Todas
            </option>
            <option value="Abertas">Abertas</option>
            <option value="Fechadas">Fechadas</option>
          </select>
        </label>

        <p class="solicitar-serviço-click" onClick={() => mostrar()}>
          Solicitar um novo serviço
        </p>
      </div>

      <div id="novo-servico-div" class="hide">
        <div class="nv-header">
          <h3>Novo serviço</h3>
          <button class="btn-close" onClick={() => ocultar()}>
            <i class="fas fa-times fa-2x"></i>
          </button>
        </div>
        <Formik
          initialValues={{ carro: "", data: "" }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className="Form-Input-nv">
            <div className="Form_Group-Input-nv">
              <div className="div-title-and-error-nv">
                <div class="title-input-nv">
                  <p>Carro:</p>
                </div>

                <div class="error-msg-nv">
                  <ErrorMessage
                    component="span"
                    name="carro"
                    className="Form_Error-Input"
                  />
                </div>
              </div>
              <Field
                name="carro"
                className="Form_Field-Input-nv"
                placeholder="E-mail"
                autoComplete="off"
                as="select"
              >
                <option>Carro:</option>
                {meusCarros.map((carro) => (
                  <option value={carro.id}>{carro.modelo}</option>
                ))}
              </Field>
            </div>

            <div className="Form_Group-Input-nv">
              <div className="div-title-and-error-nv">
                <div class="title-input-nv">
                  <p>Data de entrega do carro: </p>
                </div>

                <div class="error-msg-nv">
                  <ErrorMessage
                    component="span"
                    name="password"
                    className="Form_Error-Input"
                  />
                </div>
              </div>
              <Field
                name="password"
                type="date"
                className="Form_Field-Input-nv"
                placeholder="Senha"
              />{" "}
              <br />
            </div>

            <button className="Form_Btn-Input" type="submit">
              Solicitar
            </button>
          </Form>
        </Formik>
      </div>

      {meusPedidos.map((pedido) => (
        <PedidoBody pedido={pedido} />
      ))}
    </>
  );
};

export default Body;
