import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";

const Header = () => (
  <header className="app-header">
    <Link to="/">
      <img className="logo" src="" alt="logo" />
    </Link>
  </header>
);

export default Header;
