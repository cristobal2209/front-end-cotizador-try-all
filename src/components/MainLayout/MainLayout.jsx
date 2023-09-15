import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function MainLayout() {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
        setUserIsLogged(true);
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });
  }, []);

  return (
    userIsLogged && (
      <>
        <header className="fixed top-0 z-50 w-full max-h-[100px]">
          <Header />
        </header>
        <div className="min-h-screen">
          <main className="z-10 mx-auto min-h-screen w-full bg-bgDark pt-10 text-white">
            <Outlet />
          </main>
        </div>
      </>
    )
  );
}
