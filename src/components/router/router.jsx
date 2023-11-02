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
import RedirectToLogin from "./RedirectToLogin";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Router() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (authUser) {
        authUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            setToken(idTokenResult);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setIsLoading(false); // Set loading to false once the auth state is determined.
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts.
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  onAuthStateChanged(auth, (authUser) => {
    setUser(authUser);
  });

  return isLoading ? (
    // Display a loading spinner or some loading message here
    <></>
  ) : (
    <Routes>
      <Route
        path="*"
        element={
          !user ? <Navigate to="/login" replace /> : <Navigate to="/" replace />
        }
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={user ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route path="/" element={<Home />} />
        <Route path="manage/quotes" element={<TableQuote />} />
        <Route path="articles/:productId" element={<Article />} />
        <Route path="quoteDetails/:quoteId" element={<QuoteDetails />} />
        <Route path="search/:productSearchParam" element={<SearchResults />} />
        <Route path="redirectLogin" element={<RedirectToLogin />} />
        {user ? (
          <Route element={!token.claims.admin ? <Navigate to="/" /> : ""}>
            <Route path="manage/articles" element={<TableArticle />} />
            <Route path="manage/users" element={<TableUser />} />
          </Route>
        ) : null}
      </Route>
    </Routes>
  );
}
