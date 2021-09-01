import React from "react";

import "./styles.css";

export const Footer = () => (
  <footer className="app-footer">
    <span className="app-footer__message">
      <div id="criadores">
        <ul className="footer_ul">
          <li>
            <strong>Criado por:</strong>
            <a href="mailto:marcelopjrdev@gmail.com" rel="author">
              Marcelo Pires
            </a>
          </li>
        </ul>
      </div>
    </span>
  </footer>
);
