import React from "react";

import SideMenuBar from "../Sidebar";

import "./styles.css";

export const Container = ({ children, layout }) => (
  <main className={layout ? "app-container-layout" : "app-container"}>
    {children}
  </main>
);
