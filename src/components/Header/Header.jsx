import { useState, useEffect, useRef, useMemo } from "react";
import CategoryList from "./CategoryList";
import Sidebar from "./Sidebar";
import CreateQuote from "./CreateQuote";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import {
  Navbar,
  IconButton,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { getSearchSuggestions } from "../../services/SearchService";

export default function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const menuRef = useRef(null);
  const categoriesRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${userSearch}`);
      setUserSearch(null);
      window.location.reload();
    }
  };

  const handleCategoriesClickOutside = (event) => {
    if (
      categoriesRef.current &&
      !categoriesRef.current.contains(event.target)
    ) {
      setOpenCategories(false);
    }
  };

  const handleMenuClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      memoizedHandleCategoriesClickOutside
    );
    document.addEventListener("mousedown", memoizedHandleMenuClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        memoizedHandleCategoriesClickOutside
      );
      document.removeEventListener("mousedown", memoizedHandleMenuClickOutside);
    };
  }, []);

  const handleInputChange = async (texto) => {
    try {
      const suggestions = await getSearchSuggestions(texto);
      setSuggestions(suggestions);
      console.log;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    }
  };
  const onChangeUserSearch = (event) => {
    const newText = event.target.value;
    setUserSearch(newText);
    handleInputChange(newText);
  };

  const handleclickSearchButton = () => {
    navigate(`/search/${userSearch}`);
    window.location.reload();
  };

  const memoizedHandleCategoriesClickOutside = useMemo(
    () => handleCategoriesClickOutside,
    []
  );
  const memoizedHandleMenuClickOutside = useMemo(
    () => handleMenuClickOutside,
    []
  );

  return (
    <>
      <Navbar
        className="fixed z-50 py-3 mx-auto rounded-none border-one bg-one px-4"
        fullWidth={true}
        blurred={false}
      >
        <div className="mx-auto flex max-w-7xl flex-row items-center text-light lg:justify-between">
          {/* Boton abrir sidebar */}
          <div className="flex-shrink-0 px-2 justify-start">
            <IconButton
              variant="text"
              color="white"
              className="hidden lg:block"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          {/* logo */}
          <div className="flex-shrink-0 justify-center mx-10">
            <Link to={"/"}>
              <img
                className="w-[80px]"
                src="https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/WebAppAssets%2Flogo-quoteMaster.png?alt=media&token=de165a41-8553-420b-b6d1-1f0b1b978f0c"
              />
            </Link>
          </div>
          {/* barra de busqueda */}
          <div className="relative hidden w-full lg:flex lg:flex-row lg:items-center lg:justify-center">
            <Input
              type="search"
              name="navbarSearch"
              label="Buscar"
              className="pr-48"
              color="white"
              onChange={onChangeUserSearch}
              onKeyDown={handleKeyPress}
              containerProps={{
                className: "mx-auto min-w-0 bg-four rounded-md",
              }}
            />
            {/* render del autocompletado */}
            {/* verifica si existe texto en el usuario para ocultar o mostrar la barra de autocompletado */}
            {userSearch && suggestions?.length !== 0 && (
              <>
                <div
                  className={`absolute w-full top-full mt-4 bg-gradient-to-b from-one to-three -z-10 rounded-b-md`}
                >
                  <ul className=" p-5 w-full ">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="hover:bg-threeHover hover:shadow-md px-2 py-1 rounded-md"
                      >
                        <Link to={`/articles/${suggestion.id}`}>
                          <div className="flex items-center">
                            <div className="w-[100px]">
                              <img
                                className="h-[50px] mr-auto rounded-md"
                                src={suggestion.imgSrc}
                              />
                            </div>

                            <Typography
                              variant="paragraph"
                              className="text-white"
                            >
                              {suggestion.description.slice(0, 40)}
                            </Typography>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <Button
              size="sm"
              className="py-1 right-32 rounded !absolute bg-transparent !shadow-none !hover:shadow-lg z-10 hover:bg-fourHover"
              onClick={handleclickSearchButton}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Button>
            <button
              className={`py-1 mx-1 border-l-2  !absolute right-0 flex items-center rounded-r-md h-ful px-4 font-normal  hover:bg-fourHover hover:shadow-lg ${
                openCategories ? "bg-fourHover shadow-lg" : ""
              }`}
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
              // ref={categoriesRef}
            >
              <Typography variant="small" className="!font-mono text-light">
                Categorías
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`ml-1 block w-4 h-4 transition-transform ${
                  openCategories ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {/* usuario actual */}
          <div className="hidden lg:flex mx-1 min-w-[200px] justify-center align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            {user ? (
              <>
                <Typography size="small" className="mx-1 font-normal">
                  {user?.displayName}
                </Typography>
              </>
            ) : (
              ""
            )}
          </div>
          {/* opcion de cotizacion actual */}
          <div className="hidden lg:flex mx-1 w-1/2">
            <CreateQuote />
          </div>
        </div>
      </Navbar>
      {/* Sidebar */}
      <div
        className={`h-screen w-[300px] relative left-0 duration-300 transform ease-in-out text-light bg-dark3 overflow-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={menuRef}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      {/* Categorias */}
      <div
        className={`h-[300px] w-screen top-16 left-0 !fixed font-normal duration-300 transform ease-in-out bg-gradient-to-b from-one to-four shadow-md ${
          openCategories ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: -1 }}
      >
        <CategoryList />
      </div>
    </>
  );
}
