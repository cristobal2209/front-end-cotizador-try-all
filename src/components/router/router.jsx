import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Home from "../home/home";
import Login from "../login/login";
import Navbar from "../navbar/navbar";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
