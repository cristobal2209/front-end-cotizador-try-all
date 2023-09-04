import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  ChartPieIcon,
  UsersIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ setIsSidebarOpen }) {
  const navigate = useNavigate();

  function handleNavigateArticles() {
    setIsSidebarOpen(false);
    navigate("manage/articles");
  }

  function handleNavigateUsers() {
    setIsSidebarOpen(false);
    navigate("manage/users");
  }

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      {/* Sección 1 */}
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Button
              disabled={true}
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
            >
              <CpuChipIcon strokeWidth={2} className="h-6 w-6" /> Cotizaciones
              Artículos
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
              disabled={true}
            >
              <BriefcaseIcon strokeWidth={2} className="h-6 w-6" /> Cotizaciones
              Proyectos
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
              disabled={true}
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
            >
              <ArrowRightOnRectangleIcon strokeWidth={2} className="h-6 w-6" />
              Cerrar Sesión
            </Button>
          </li>
        </ul>
      </div>
      {/* Barra horizontal */}
      <hr className="mx-auto my-2 w-5/6 border-primary" />
      {/* Sección 2 */}
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
              onClick={handleNavigateUsers}
            >
              <UsersIcon strokeWidth={2} className="h-6 w-6" />
              Usuarios
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
              onClick={handleNavigateArticles}
            >
              <ClipboardDocumentCheckIcon strokeWidth={2} className="h-6 w-6" />{" "}
              Artículos
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center gap-3 bg-transparent text-start text-base normal-case text-primary shadow-none hover:bg-whiteHover hover:shadow-md hover:shadow-quaternary"
              disabled={true}
            >
              <BanknotesIcon strokeWidth={2} className="h-6 w-6" /> Cotizaciones
              generales
            </Button>
          </li>
        </ul>
      </div>
    </div>
    // </div>
  );
}
