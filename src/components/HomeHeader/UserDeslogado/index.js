import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";

const UserDeslogado = () => {
  return (
    <div className="user-deslogado-main">
      {/* <Link to="/login">
        <p className="logarse-p">Login/Cadastrar-se</p>
      </Link> */}
      <a href="/login">Login/Cadastrar-se</a>
    </div>
  );
};

export default UserDeslogado;
