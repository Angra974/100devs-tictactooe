import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./app/app";

function g_s(el) {
  return document.querySelector(el);
}

function g_i(el) {
  return document.getElementById(el);
}
const rootElement = g_i("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
