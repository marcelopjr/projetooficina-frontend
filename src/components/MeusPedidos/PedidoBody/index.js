import { set } from "js-cookie";
import React, { useState } from "react";

import "./styles.css";
import DetalhesPedido from "../DetalhesPedidoBody";

const PedidoBody = ({ pedido }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="body-div-pedido">
        <div className="id-div-pedido">
          <div className="title-div-pedido">
            <h4>
              <strong>NÚMERO DO PEDIDO</strong>
            </h4>
          </div>
          <p>#{pedido.id}</p>
        </div>

        <div className="status-div">
          <div className="title-div-pedido">
            <h4>
              <strong>STATUS ATUAL</strong>
            </h4>
          </div>

          <p>{pedido.status_atual}</p>
        </div>

        <div className="data-div">
          <div className="title-div-pedido">
            <h4>
              <strong>ABERTURA</strong>
            </h4>
          </div>
          <p>{pedido.data_abertura}</p>
        </div>

        <div className="detalhes-div">
          <button
            className="btn-abrirdetalhes"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          >
            <p>Detalhes do pedido</p>
            {isOpen ? (
              <i class="fas fa-angle-up fa-3x"></i>
            ) : (
              <i class="fas fa-angle-down fa-3x"></i>
            )}
          </button>
        </div>
      </div>

      {isOpen ? <DetalhesPedido pedido={pedido} /> : null}
    </>
  );
};

export default PedidoBody;
