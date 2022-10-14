import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from ".";

const root = document.getElementById("app") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
