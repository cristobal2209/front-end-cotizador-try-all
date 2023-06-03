import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Article from "../Article/Article";
import Login from "../login/login";

export default function Router() {
  const shouldRenderNavbar = location.pathname !== '/login';
  return (
    <BrowserRouter>
      {shouldRenderNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/articles/:articleId" element={<Article/>} />
      </Routes>
    </BrowserRouter>
  );
}
