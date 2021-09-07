import React from "react";

import "./styles.css";

const PedidoListaStatus = ({ status, posicao }) => {
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
        </div>
        {posicao == 2 ? null : <div className="timeline-1"></div>}
      </div>
    </>
  );
};

export default PedidoListaStatus;
