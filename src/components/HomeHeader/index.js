import React from "react";
import "./styles.css";

import logo from "../../assets/logo.png";

import Cookie from "js-cookie";

import UserLogado from "./UserLogado";
import UserDeslogado from "./UserDeslogado";

const Header = () => {
  const isLogged = !!Cookie.get("@token");

  return (
    <>
      <header className="home-header">
        <img className="home-logo" src={logo} alt="logo" />

        <div className="home-user">
          {isLogged ? <UserLogado /> : <UserDeslogado />}
        </div>
      </header>
    </>
  );
};

export default Header;
