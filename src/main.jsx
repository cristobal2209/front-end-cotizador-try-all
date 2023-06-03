import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/router/router";
import { RouterProvider } from "react-router-dom";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <Router />
    {/* <RouterProvider router={Router} /> */}
  </React.StrictMode>
);
