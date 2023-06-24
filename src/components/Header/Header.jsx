import React, { useState } from "react";
import CategoryList from "./CategoryList";
import Sidebar from "./Sidebar";
import QuoteName from "./QuoteName";
import {
  Navbar,
  Collapse,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = React.useState("");
  const onChangeUserSearch = ({ target }) => setUserSearch(target.value);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar
        className="fixed z-50 mx-auto rounded-none border-primary bg-primary px-4 py-2"
        fullWidth={true}
        blurred={false}
      >
        <div className="mx-auto flex max-w-full items-center text-white lg:justify-between">
          {/* boton menu categorias */}
          <div className="flex-shrink-0 px-2">
            <IconButton
              variant="text"
              color="white"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {/* si openNav es true, muestra un icono X, sino, muestra un icono tres barras */}
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          {/* sidebar */}
          <div className="flex-shrink-0 px-2">
            <IconButton
              variant="text"
              color="white"
              className="hidden lg:block"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {/* si isSidebarOpen es true, muestra un icono X, sino, muestra un icono tres barras */}
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          {/* logo */}
          <div className="flex-shrink-0 px-2">
            <a href="http://127.0.0.1:4000">
              <img className="" src="src/assets/logo-try-all.png" />
            </a>
          </div>
          {/* llamado a categorias en escritorio */}
          <div className="hidden lg:block">
            <CategoryList />
          </div>
          {/* barra de busqueda */}
          <div className="relative hidden w-1/3 lg:flex lg:flex-row lg:items-center lg:justify-center">
            <Input
              type="search"
              label="Buscar..."
              className="bg-secondary pr-20 text-white"
              color="white"
              value={userSearch}
              onChange={onChangeUserSearch}
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-2 rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
            >
              <MagnifyingGlassIcon className="h-full w-3" />
            </Button>
          </div>
          {/* opcion de cotizacion actual */}
          <div className="hidden px-2 lg:block">
            <QuoteName />
          </div>
        </div>
        {/* si openNav es true, se abre este collapse */}
        <Collapse open={openNav}>
          <CategoryList />
        </Collapse>
      </Navbar>
      {/*  */}
      <div
        className={`fixed left-0 top-0 z-40 hidden h-full max-w-lg transform bg-white pt-20 text-primary shadow-2xl duration-300 ease-in-out lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
    </>
  );
}
