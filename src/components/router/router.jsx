import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Article from "../Article/Article";
import Login from "../login/login";
import TableArticle from "../TableArticle/TableArticle";
import TableQuote from "../TableQuote/TableQuote";
import TableUser from "../TableUser/TableUser";
import SearchResults from "../SearchResults/SearchResults";
import MainLayout from "../MainLayout/MainLayout";
import PruebaUploadDownload from "../PruebaUploadDownload/PruebaUploadDownload";
import QuoteDetails from "../QuoteDetails/QuoteDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="articles" element={<TableArticle />} />
          <Route path="quotes" element={<TableQuote />} />
          <Route path="manage/users" element={<TableUser />} />
          <Route path="articles/:articleId" element={<Article />} />
          <Route path="quoteDetails/:quoteId" element={<QuoteDetails />} />
          <Route path="search/:articleSearch" element={<SearchResults />} />
          <Route path="uploadDownload" element={<PruebaUploadDownload />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
