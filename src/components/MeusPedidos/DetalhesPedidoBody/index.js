import React, { useState } from "react";

import PedidoStatus from "../PedidoListaStatus";
import "./styles.css";

const DetalhesPedido = ({ pedido }) => {
  var position = 1;

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
        <div className="carro-div">
          <h3 className="title-details">INFORMACOES</h3>
          <div className="carro-infos">
            <p>
              <strong>VALOR: </strong>
              {pedido.valor ? pedido.valor : "0, 00"}
            </p>

            <p>
              <strong>STATUS: </strong>
              {pedido.os_aberta ? "ABERTA" : "FECHADA"}
            </p>
            <p>
              <strong>ENTREGA DO CARRO: </strong>
              {pedido.data_entrega_carro}
            </p>
            <p>
              <strong>CONCLUSAO: </strong>
              {pedido.data_finalizada
                ? pedido.data_finalizada
                : "Nao finalizado"}
            </p>
          </div>
        </div>

        <div className="carro-div">
          <h3 className="title-details">CARRO</h3>
          <div className="carro-infos">
            <p>
              <strong>Modelo: </strong>
              {pedido.carro.modelo}
            </p>

            <p>
              <strong>Marca: </strong>
              {pedido.carro.marca}
            </p>

            <p>
              <strong>Cor: </strong>
              {pedido.carro.cor}
            </p>

            <p>
              <strong>Placa: </strong>
              {pedido.carro.placa}
            </p>
          </div>
        </div>
        <div className="carro-div">
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
