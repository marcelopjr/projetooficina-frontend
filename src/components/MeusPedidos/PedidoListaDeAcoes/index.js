import React from "react";

import "./styles.css";

const PedidoListaDeAcoes = ({ acao, last }) => {
  return (
    <>
      <div class="acoes-main-div">
        <p>
          <strong>{acao.nome}</strong>
        </p>

        <p>Peca: {acao.nome_peca}</p>
        <p>{acao.data}</p>
      </div>
      {last ? null : <div class="bottom-line"></div>}
    </>
  );
};

export default PedidoListaDeAcoes;
