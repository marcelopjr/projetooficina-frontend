import React, { useState } from "react";

import "./styles.css";

const CarrosBody = ({ carro }) => {
  const [show, setShow] = useState(false);

  function ocultar() {
    var element = document.getElementById(`action-div-carro-${carro.id}`);
    var btn = document.getElementById(`div-carro-btn-${carro.id}`);
    element.classList.add("hide-action-div");
    btn.classList.add("hide-div-carro-btn");
    setShow(false);
  }

  function mostrar() {
    var element = document.getElementById(`action-div-carro-${carro.id}`);
    var btn = document.getElementById(`div-carro-btn-${carro.id}`);
    element.classList.remove("hide-action-div");
    btn.classList.remove("hide-div-carro-btn");
    setShow(true);
  }

  return (
    <>
      <div class="main-div-carro">
        <div class="body-div-carro">
          <h2>{carro.modelo}</h2>

          <p>
            Marca: <strong>{carro.marca}</strong>
          </p>
          <p>
            Placa: <strong>{carro.placa}</strong>
          </p>
          <p>
            Cor: <strong>{carro.cor}</strong>
          </p>

          {!show ? (
            <i
              class="fas fa-arrow-right fa-1x"
              id="icon"
              onClick={() => mostrar()}
            ></i>
          ) : (
            <i
              class="fas fa-arrow-left fa-1x"
              id="icon"
              onClick={() => ocultar()}
            ></i>
          )}
        </div>

        <div
          id={`action-div-carro-${carro.id}`}
          class="hide-action-div"
          style={{
            width: 50,
            maxWidth: 60,
            height: 80,

            transitionDuration: "0.5s",
            msTransitionDuration: "0.5s",
            MozTransition: "0.5s",
          }}
        >
          <div
            id={`div-carro-btn-${carro.id}`}
            class="hide-div-carro-btn"
            style={{
              opacity: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",

              transitionDuration: "0.2s",
              msTransitionDuration: "0.2s",
              MozTransition: "0.2s",
            }}
          >
            <button class="carro-btn">
              <i class="far fa-edit fa-2x"></i>
            </button>

            <button class="carro-btn">
              <i class="far fa-trash-alt fa-2x" id="icon-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarrosBody;
