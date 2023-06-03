import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Article from "../Article/Article";

// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "articulos/:idArticulo",
//     element: <Article />,
//   },
// ]);
// export default Router;

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/articulos/:articleId" element={<Article/>} />
      </Routes>
    </BrowserRouter>
  );
}
