import React, { useContext } from "react";
import Swal from "sweetalert2";
import PedidoStatus from "../PedidoListaStatus";
import "./styles.css";
import api from "../../../service/api";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/authContext";

const DetalhesPedido = ({ pedido }) => {
  const { findOs } = useContext(AuthContext);
  const history = useHistory();
  var position = 1;

  function cancelarPedido() {
    Swal.fire({
      title: "Tem certeza que deseja cancelar?",
      text: "Não é possível reverter essa ação",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .put(`/ordemservicos/cancelaros/${pedido.id}`, null, {
            headers: {
              Authorization: `Bearer ${Cookie.get("@token")}`,
            },
          })
          .then((resp) => {
            Swal.fire("Cancelado!", `${resp.data}`, "success");
            findOs("Fechadas");
            document.getElementById("pedido-select").value = "Fechadas";
          })

          .catch((error) =>
            Swal.fire("Error!", `${error.response.data.status}`, "error")
          );
      }
    });
  }

  function mudarPosicao() {
    if (position == 1) {
      position = 2;
      return 1;
    } else {
      position = 1;
      return 2;
    }
  }

  return (
    <>
      <div className="main-div">
        <div className="pedido-infos-div">
          <h3>Resumo do Pedido</h3>
          <div className="group-info-div">
            <p style={{ fontSize: 25 }}>
              PEDIDO: <strong>{pedido.id}</strong>
            </p>
            <p>
              Realizado em: <strong>{pedido.data_abertura}</strong>
            </p>
          </div>
          <div className="group-info-div">
            <div className="carro-infos">
              <p>
                Valor:
                <strong> {pedido.valor ? pedido.valor : "0, 00"}</strong>
              </p>

              <p>
                Status:
                <strong>{pedido.os_aberta ? "ABERTA" : "FECHADA"}</strong>
              </p>
              <p>
                Entrega do Carro:
                <strong>{pedido.data_entrega_carro}</strong>
              </p>
              <p>
                Conclusão:
                <strong>
                  {" "}
                  {pedido.data_finalizada
                    ? pedido.data_finalizada
                    : "Nao finalizado"}
                </strong>
              </p>
            </div>
          </div>

          <div className="group-info-div">
            <h3 className="title-details">CARRO</h3>
            <div className="carro-infos">
              <p>
                Modelo:
                <strong> {pedido.carro.modelo} </strong>
              </p>

              <p>
                Marca:
                <strong> {pedido.carro.marca}</strong>
              </p>

              <p>
                Cor:
                <strong> {pedido.carro.cor}</strong>
              </p>

              <p>
                Placa:
                <strong>{pedido.carro.placa}</strong>
              </p>
            </div>
          </div>
          {pedido.os_aberta &&
          pedido.status_atual === "Aguardando Entrega do Carro" ? (
            <button
              onClick={() => cancelarPedido()}
              class="btn-cancelar-pedido"
            >
              Cancelar Pedido?
            </button>
          ) : null}
        </div>

        <div className="status-div-detalhes">
          <h3 className="title-details">STATUS</h3>
          {pedido.listaStatus.map((status) => (
            <PedidoStatus
              status={status}
              posicao={mudarPosicao()}
              listaAcoes={
                status.nome === "Em Reparo" ? pedido.listaAcoes : null
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DetalhesPedido;
