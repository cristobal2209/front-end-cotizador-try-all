import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  ChartPieIcon,
  UsersIcon,
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
          .catch((error) => {});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = () => {
    auth
      .signOut()
      .then(<Navigate to="/login" />)
      .catch();
  };

  return (
    <div className="absolute  pt-[96px] w-full h-full border-2 border-dark2 text-light">
      <div className="flex flex-col justify-between overflow-y-auto">
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Button
                onClick={() => {
                  setIsSidebarOpen(false);
                  navigate("manage/quotes");
                }}
                className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case shadow-none hover:bg-two  hover:shadow-lg"
              >
                <BriefcaseIcon strokeWidth={2} className="h-6 w-6" />
                Mis cotizaciones
              </Button>
            </li>
            <li>
              <Button
                className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
                disabled={true}
              >
                <UserCircleIcon strokeWidth={2} className="h-6 w-6" /> Editar
                Perfil
              </Button>
            </li>
            <li>
              <Button
                onClick={() => handleLogOut()}
                className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
              >
                <ArrowRightOnRectangleIcon
                  strokeWidth={2}
                  className="h-6 w-6"
                />
                Cerrar Sesión
              </Button>
            </li>
          </ul>
        </div>

        {token?.claims.admin ? (
          <>
            <hr className="mx-auto my-2 w-5/6 border-dark2" />
            <div className=" p-4">
              <ul className="space-y-2">
                <li>
                  <Button
                    className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
                    disabled={true}
                  >
                    <ChartPieIcon strokeWidth={2} className="h-6 w-6" />{" "}
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button
                    className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
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
                    className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
                    onClick={() => {
                      setIsSidebarOpen(false);
                      navigate("manage/articles");
                    }}
                  >
                    <ClipboardDocumentCheckIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />{" "}
                    Productos
                  </Button>
                </li>
                <li>
                  <Button
                    className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case  shadow-none hover:bg-two  hover:shadow-lg"
                    disabled={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                      />
                    </svg>
                    Todas las cotizaciones
                  </Button>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
