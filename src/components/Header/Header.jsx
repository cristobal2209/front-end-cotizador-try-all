import { useState, useEffect, useRef } from "react";
import CategoryList from "./CategoryList";
import Sidebar from "./Sidebar";
import CreateQuote from "./CreateQuote";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
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

export default function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleCategoriesClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCategoriesClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${userSearch}`);
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

  const handleclickSearchButton = async () => {
    navigate(`/search/${userSearch}`);
    window.location.reload();
  };

  const onChangeUserSearch = (event) => {
    setUserSearch(event.target.value);
  };

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
          <div className="flex-shrink-0 mx-5 justify-center">
            <Link to={"/"}>
              <img
                className=""
                src="https://lh3.googleusercontent.com/fife/APg5EOYeUKBy30dATK4r1LmzjUgsqZksMZUkuKZdG-PzmilGk6uw2F7nIASTamiScFVNVCQc6dAIl2D3ZCblGqMFV4AijethnzzYNwvurf_TCgVtR0iCt8TyIMnRSckkvhxWV3PBMKLG-08ybawCZ2OugXWhM-sa4gR2CqD2KnMuhvjjFLX3g7e2p5gSFxrXIDEQmfETtfp4nd3h_Hc--Y7ddcaZgJni-3jxKyU8jQnXiQcS1Eh5RzczuaCXINjXojA9d1jjbxyvWIpAFDad_GWGVjuzQQNbJPVczkVHxTZ25dDmIKXSGLumhtRDuklcxpgfpp3S2vgksbafKo0QnOjNvUXmUBJAE4ksWnfP8cd75JUM8DtlMCUcTqsUI7Vn1J4gmpkgKfzd66TdTM3oRlmCNuVDSH0E2C9dw1WDRVO7a51jObp2pjZ1UcDhxySSrTgeZVp9rftsVLezEuiok5cuWAxf0wlqtqj6ZhctX_y6Y9uk7o5VysuJXk-0e4-i3Jbt0QQtPK3Ws7yadKAaD4HLn2iFuqip9YG-ROQu1AuXW9UJ7AqfUkA1McG2p24TdBMy8IC57UYP9UcRDdwvIepiH4nEd46RKUpAeY0gEIulmdYoH9CY7TMWBsSzWnka4vIsLVrW9zmnQ3_87aRGnazbuvvEKmr-sna9meQesrPJuvrflja_TIkahMr28__Hu-zeqv2MK6Q5A15YdVfg0wrFId_ODQuK_FUu2gdjcpuoJTqByr-WLZbM7TqafEvhkjCkbSf-TefR-QPBGk3M1JHoGUCxHeZfQIYbvDN4fHxN5pqqjylUjWx8-aTM_vGKM2P2-eSahkYrZXlCKK2JGOzlzU3CB5cIC9Wh27Tkp9MXN5atFI-jQOKlWSRc1XJFU47phVjx6Dme6FKBDnrOTmxN4K1bhP_Z4I7jYQpAKNOizIWfngDgskxXns25tyLtJEEvF8uwWw_8clnDM4AIkmwVvfYfAe5J5ddNN2zCACmTreera7SrMvi4pqxgDHgXc6erxGiLn9BIOevcbIHTSYgO-0jRJmP3oeBK9PdFqudpmBYvPOZC8Rl4GUDRjIamGyxrrWqIFqfVAHltQDyz2Qm8HEqUuA-M1eEwHRItGah4gsYZWbwmvECGuyaKGcynJ-Rnq2nKcEoWcCtHeq4zNFMJbl0dIyKURQZMooQDiSKfqwT3sH_7mJE1WgcZzBWtxe4L4C339ijArLfbkcJTOontBEhXzv_BIF-4tPnG_RmKOVt7oInGQPiW5BddEdNLrTBL02t0Da2Pv0AXPGRb4P87doxD8dI49fZ37UXOm3TJU5y6cr8S_9xmRLgPtAPcTBBXkFjuxIGmSpkUwoWDU55WEv3OV2jSeSE9ViCfrrBYFZl5Umpj6yWLj35HFaQc6OKFSug_cGCjgRaP_ThdRGAADrJ1aOXazVJU97YDKFAV9muqlW_UPTmviqpjWB93z0o5Ly5k5LmBX_wUrHwK0zioqe0mLycsPrkKix0pS3v0XMqDgRVhyBzUaNFg6QUEZaAfEPjDzbURugVGmGX4lEi5E9VUacd7fxYIHhSFiF4c9xGoDmT7HORRjQ4YVCOodMTN8J06EYiAwdYjDMymgw=w1920-h941"
              />
            </Link>
          </div>
          {/* barra de busqueda */}
          <div className="ml-10 relative hidden w-full lg:flex lg:flex-row lg:items-center lg:justify-center">
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
              ref={categoriesRef}
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
            <Typography size="small" className="mx-1 font-normal">
              {user?.displayName}
            </Typography>
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
        className={`h-[300px] w-screen top-16 left-0 !fixed font-normal duration-300 transform ease-in-out backdrop-blur-md shadow-md ${
          openCategories ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: -1 }}
      >
        <CategoryList />
      </div>
    </>
  );
}
