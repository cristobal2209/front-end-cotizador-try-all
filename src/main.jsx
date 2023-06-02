import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/router/router"
import App from "./App";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
