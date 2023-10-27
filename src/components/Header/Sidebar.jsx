import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  ChartPieIcon,
  UsersIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Sidebar({ setIsSidebarOpen }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
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
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts.
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  const handleLogOut = () => {
    auth
      .signOut()
      .then(<Navigate to="/login" />)
      .catch();
  };

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      {/* Sección 1 */}
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Button
              onClick={() => {
                setIsSidebarOpen(false);
                navigate("manage/quotes");
              }}
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
            >
              <BriefcaseIcon strokeWidth={2} className="h-6 w-6" />
              Mis cotizaciones
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
              disabled={true}
            >
              <UserCircleIcon strokeWidth={2} className="h-6 w-6" /> Editar
              Perfil
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleLogOut()}
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
            >
              <ArrowRightOnRectangleIcon strokeWidth={2} className="h-6 w-6" />
              Cerrar Sesión
            </Button>
          </li>
        </ul>
      </div>

      {/* Sección 2 */}
      {token?.claims.admin ? (
        <>
          {/* Barra horizontal */}
          <hr className="mx-auto my-2 w-5/6 border-primary" />
          <div className=" p-4">
            <ul className="space-y-2">
              <li>
                <Button
                  className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
                  disabled={true}
                >
                  <ChartPieIcon strokeWidth={2} className="h-6 w-6" /> Dashboard
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("manage/users");
                  }}
                >
                  <UsersIcon strokeWidth={2} className="h-6 w-6" />
                  Usuarios
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("manage/articles");
                  }}
                >
                  <ClipboardDocumentCheckIcon
                    strokeWidth={2}
                    className="h-6 w-6"
                  />{" "}
                  Artículos
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
                  disabled={true}
                >
                  <BanknotesIcon strokeWidth={2} className="h-6 w-6" />{" "}
                  Cotizaciones generales
                </Button>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
    // </div>
  );
}
