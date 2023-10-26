import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/home";
import Article from "../Article/Article";
import Login from "../login/login";
import TableArticle from "../TableArticle/TableArticle";
import TableQuote from "../TableQuote/TableQuote";
import TableUser from "../TableUser/TableUser";
import SearchResults from "../SearchResults/SearchResults";
import MainLayout from "../MainLayout/MainLayout";
import QuoteDetails from "../QuoteDetails/QuoteDetails";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Router() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoading(false); // Set loading to false once the auth state is determined.
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts.
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  useEffect(() => {
    console.log(user);
  }, [user]);

  onAuthStateChanged(auth, (authUser) => {
    setUser(authUser);
  });

  return isLoading ? (
    // Display a loading spinner or some loading message here
    <>{console.log("cargando")}</>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={user ? <PrivateRoutes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
function PrivateRoutes() {
  console.log("cargan rutas privadas");
  return (
    <MainLayout>
      <Route path="home" element={<Home />} />
      <Route path="manage/quotes" element={<TableQuote />} />
      <Route path="articles/:articleId" element={<Article />} />
      <Route path="quoteDetails/:quoteId" element={<QuoteDetails />} />
      <Route path="search/:articleSearch" element={<SearchResults />} />
      <Route path="manage/articles" element={<TableArticle />} />
      <Route path="manage/users" element={<TableUser />} />
    </MainLayout>
  );
}
