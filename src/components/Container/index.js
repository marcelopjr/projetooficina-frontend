import React from "react";

import SideMenuBar from "../Sidebar";

import "./styles.css";

export const Container = ({ children }) => (
  <main className="app-container">{children}</main>
);
