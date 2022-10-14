import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./index";
import "antd/dist/antd.css";

const root = document.getElementById("app") as HTMLElement;

createRoot(root).render(
  // <StrictMode>
  <Root />
  // </StrictMode>
);
