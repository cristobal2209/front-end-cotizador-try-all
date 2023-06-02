import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Login from "../login/login";
import Navbar from "../navbar/navbar";

export default function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
