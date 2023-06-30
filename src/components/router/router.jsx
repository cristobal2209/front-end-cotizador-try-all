import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Article from "../Article/Article";
import Login from "../login/login";
import TableArticle from "../TableArticle/TableArticle";
import TableQuote from "../TableQuote/TableQuote";
import TableUser from "../TableUser/TableUser";
import SearchResults from "../SearchResults/SearchResults";
import NewQuote from "../NewQuote/NewQuote";
import MainLayout from "../MainLayout/MainLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="manage" element={<TableArticle />} />
          <Route path="manage/articles" element={<TableArticle />} />
          <Route path="manage/quotes" element={<TableQuote />} />
          <Route path="manage/users" element={<TableUser />} />
          <Route path="articles/:articleId" element={<Article />} />
          <Route path="newquote" element={<NewQuote />} />
          <Route path="search/:articleSearch" element={<SearchResults />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
