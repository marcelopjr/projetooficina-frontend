import React, { useState } from "react";

import "./styles.css";
import PedidoAcoes from "../PedidoListaDeAcoes";

const PedidoListaStatus = ({ status, posicao, listaAcoes }) => {
  return (
    <>
      <div className="status-main-div">
        {posicao == 2 ? <div className="espacamento"></div> : null}
        {posicao == 1 ? null : <div className="timeline-2"></div>}

        <div className={`status-body-div-${posicao}`}>
          <div className="status-data-div">
            <p>{status.data}</p>
          </div>
          <p>
            <strong>{status.nome}</strong>
          </p>
          <p>{status.mensagem ? `Mensagem: ${status.mensagem}` : null}</p>
          {listaAcoes ? (
            <div class="div-acoes">
              <p class="div-acoes-title">O que foi feito: </p>
              {listaAcoes.map((acao) => (
                <PedidoAcoes
                  acao={acao}
                  last={
                    listaAcoes.indexOf(acao) === listaAcoes.length - 1
                      ? true
                      : false
                  }
                />
              ))}
            </div>
          ) : null}
        </div>
        {posicao == 2 ? null : <div className="timeline-1"></div>}
      </div>
    </>
  );
};

export default PedidoListaStatus;
