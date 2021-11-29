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
import Swal from "sweetalert2";

const Body = () => {
  const [meusCarros, setMeusCarros] = useState([]);
  const [meusPedidosAtt, setMeusPedidosAtt] = useState([]);
  // const [filtro, setFiltro] = useState("");
  const history = useHistory();
  const { verifyError, findOs, meusPedidos, setMeusPedidos } =
    useContext(AuthContext);

  useEffect(() => {
    if (Cookie.get("@token")) {
      findOs("Todas");
      BuscarMeusCarros();
    }
  }, []);

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
          Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
        },
      })
      .then((response) => setMeusCarros(response.data))
      .catch((error) => verifyError(error));
  }

  const validations = yup.object().shape({
    carro: yup.string().required("Por favor selecione seu carro"),
    data: yup.string().required("Escolha a data de entrega"),
  });

  const handleSubmit = (values) => {
    const data = {
      data_entrega_carro: values.data,
      carro_id: values.carro,
    };

    api
      .post("/ordemservicos/novaos", data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(Cookie.get("@token")).token}`,
        },
      })
      .then((resp) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: resp.data,
          showConfirmButton: false,
          timer: 1500,
        });
        findOs("Abertas");
        document.getElementById("pedido-select").value = "Abertas";
        ocultar();
      })
      .catch((error) => verifyError(error));
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
              findOs(document.getElementById("pedido-select").value)
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
                placeholder="carro"
                autoComplete="off"
                as="select"
              >
                <option value="">Carro:</option>
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
                    name="data"
                    className="Form_Error-Input"
                  />
                </div>
              </div>
              <Field
                name="data"
                type="date"
                className="Form_Field-Input-nv"
                placeholder="data"
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
