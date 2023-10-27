import { useState, useEffect, useRef } from "react";
import CategoryList from "./CategoryList";
import Sidebar from "./Sidebar";
import ActiveQuote from "./ActiveQuote";
import { useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const menuRef = useRef(null);
  const categoriesRef = useRef(null);

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

  const handleclickSearchButton = () => {
    navigate(`/search/${userSearch}`);
  };

  const onChangeUserSearch = (event) => {
    setUserSearch(event.target.value);
  };

  return (
    <>
      <Navbar
        className="fixed z-50 mx-auto rounded-none border-primary bg-primary px-4 py-1"
        fullWidth={true}
        blurred={false}
      >
        <div className="mx-auto flex h-[70px] max-w-7xl flex-row items-center text-white lg:justify-between">
          {/* Boton abrir sidebar */}
          <div className="flex-shrink-0 px-2">
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
          <div className="flex-shrink-0 px-2">
            <Link to={"/"}>
              <img
                className=""
                src="https://lh3.googleusercontent.com/fife/APg5EOYeUKBy30dATK4r1LmzjUgsqZksMZUkuKZdG-PzmilGk6uw2F7nIASTamiScFVNVCQc6dAIl2D3ZCblGqMFV4AijethnzzYNwvurf_TCgVtR0iCt8TyIMnRSckkvhxWV3PBMKLG-08ybawCZ2OugXWhM-sa4gR2CqD2KnMuhvjjFLX3g7e2p5gSFxrXIDEQmfETtfp4nd3h_Hc--Y7ddcaZgJni-3jxKyU8jQnXiQcS1Eh5RzczuaCXINjXojA9d1jjbxyvWIpAFDad_GWGVjuzQQNbJPVczkVHxTZ25dDmIKXSGLumhtRDuklcxpgfpp3S2vgksbafKo0QnOjNvUXmUBJAE4ksWnfP8cd75JUM8DtlMCUcTqsUI7Vn1J4gmpkgKfzd66TdTM3oRlmCNuVDSH0E2C9dw1WDRVO7a51jObp2pjZ1UcDhxySSrTgeZVp9rftsVLezEuiok5cuWAxf0wlqtqj6ZhctX_y6Y9uk7o5VysuJXk-0e4-i3Jbt0QQtPK3Ws7yadKAaD4HLn2iFuqip9YG-ROQu1AuXW9UJ7AqfUkA1McG2p24TdBMy8IC57UYP9UcRDdwvIepiH4nEd46RKUpAeY0gEIulmdYoH9CY7TMWBsSzWnka4vIsLVrW9zmnQ3_87aRGnazbuvvEKmr-sna9meQesrPJuvrflja_TIkahMr28__Hu-zeqv2MK6Q5A15YdVfg0wrFId_ODQuK_FUu2gdjcpuoJTqByr-WLZbM7TqafEvhkjCkbSf-TefR-QPBGk3M1JHoGUCxHeZfQIYbvDN4fHxN5pqqjylUjWx8-aTM_vGKM2P2-eSahkYrZXlCKK2JGOzlzU3CB5cIC9Wh27Tkp9MXN5atFI-jQOKlWSRc1XJFU47phVjx6Dme6FKBDnrOTmxN4K1bhP_Z4I7jYQpAKNOizIWfngDgskxXns25tyLtJEEvF8uwWw_8clnDM4AIkmwVvfYfAe5J5ddNN2zCACmTreera7SrMvi4pqxgDHgXc6erxGiLn9BIOevcbIHTSYgO-0jRJmP3oeBK9PdFqudpmBYvPOZC8Rl4GUDRjIamGyxrrWqIFqfVAHltQDyz2Qm8HEqUuA-M1eEwHRItGah4gsYZWbwmvECGuyaKGcynJ-Rnq2nKcEoWcCtHeq4zNFMJbl0dIyKURQZMooQDiSKfqwT3sH_7mJE1WgcZzBWtxe4L4C339ijArLfbkcJTOontBEhXzv_BIF-4tPnG_RmKOVt7oInGQPiW5BddEdNLrTBL02t0Da2Pv0AXPGRb4P87doxD8dI49fZ37UXOm3TJU5y6cr8S_9xmRLgPtAPcTBBXkFjuxIGmSpkUwoWDU55WEv3OV2jSeSE9ViCfrrBYFZl5Umpj6yWLj35HFaQc6OKFSug_cGCjgRaP_ThdRGAADrJ1aOXazVJU97YDKFAV9muqlW_UPTmviqpjWB93z0o5Ly5k5LmBX_wUrHwK0zioqe0mLycsPrkKix0pS3v0XMqDgRVhyBzUaNFg6QUEZaAfEPjDzbURugVGmGX4lEi5E9VUacd7fxYIHhSFiF4c9xGoDmT7HORRjQ4YVCOodMTN8J06EYiAwdYjDMymgw=w1920-h941"
              />
            </Link>
          </div>
          {/* barra de busqueda */}
          <div className="relative hidden w-full lg:flex lg:flex-row lg:items-center lg:justify-center">
            <Button
              size="sm"
              className=" left-0 rounded bg-transparent !shadow-none !hover:shadow-lg z-10"
              onClick={handleclickSearchButton}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>
            <Input
              type="search"
              name="navbarSearch"
              label="Buscar"
              className="pr-32"
              color="white"
              onChange={onChangeUserSearch}
              containerProps={{
                className: "min-w-0",
              }}
            />
            <button
              className="py-1 mx-1 border-l-2  !absolute right-0 flex items-center rounded-r-md h-ful px-4 font-normal text-white hover:bg-primaryHover hover:shadow-lg"
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
              ref={categoriesRef}
            >
              categorías
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`ml-1 block w-3 h-3 transition-transform ${
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
          {/* opcion de cotizacion actual */}
          <div className="hidden lg:block !w-[300px]">
            <ActiveQuote />
          </div>
        </div>
      </Navbar>
      {/* Sidebar */}
      <div
        className={`h-screen w-[300px] relative left-0 duration-300 transform ease-in-out bg-white text-primary overflow-auto ${
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
