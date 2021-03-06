import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => (
  <header className="painel-header">
    <Link to="/">
      <img
        className="painel-logo"
        src={logo}
        alt="logo"
        style={{ height: 80, width: 150 }}
      />
    </Link>
  </header>
);

export default Header;
