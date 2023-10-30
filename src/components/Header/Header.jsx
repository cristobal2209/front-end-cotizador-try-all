import { useState, useEffect } from "react";
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
  const [openNav, setOpenNav] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

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
        className="fixed z-50 mx-auto rounded-none border-primary bg-primary px-4 py-2"
        fullWidth={true}
        blurred={false}
      >
        <div className="mx-auto flex h-[80px] max-w-7xl flex-row items-center text-white lg:justify-between">
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
            <Link to={"/home"}>
              <img
                className=""
                src="https://lh3.googleusercontent.com/fife/APg5EOYeUKBy30dATK4r1LmzjUgsqZksMZUkuKZdG-PzmilGk6uw2F7nIASTamiScFVNVCQc6dAIl2D3ZCblGqMFV4AijethnzzYNwvurf_TCgVtR0iCt8TyIMnRSckkvhxWV3PBMKLG-08ybawCZ2OugXWhM-sa4gR2CqD2KnMuhvjjFLX3g7e2p5gSFxrXIDEQmfETtfp4nd3h_Hc--Y7ddcaZgJni-3jxKyU8jQnXiQcS1Eh5RzczuaCXINjXojA9d1jjbxyvWIpAFDad_GWGVjuzQQNbJPVczkVHxTZ25dDmIKXSGLumhtRDuklcxpgfpp3S2vgksbafKo0QnOjNvUXmUBJAE4ksWnfP8cd75JUM8DtlMCUcTqsUI7Vn1J4gmpkgKfzd66TdTM3oRlmCNuVDSH0E2C9dw1WDRVO7a51jObp2pjZ1UcDhxySSrTgeZVp9rftsVLezEuiok5cuWAxf0wlqtqj6ZhctX_y6Y9uk7o5VysuJXk-0e4-i3Jbt0QQtPK3Ws7yadKAaD4HLn2iFuqip9YG-ROQu1AuXW9UJ7AqfUkA1McG2p24TdBMy8IC57UYP9UcRDdwvIepiH4nEd46RKUpAeY0gEIulmdYoH9CY7TMWBsSzWnka4vIsLVrW9zmnQ3_87aRGnazbuvvEKmr-sna9meQesrPJuvrflja_TIkahMr28__Hu-zeqv2MK6Q5A15YdVfg0wrFId_ODQuK_FUu2gdjcpuoJTqByr-WLZbM7TqafEvhkjCkbSf-TefR-QPBGk3M1JHoGUCxHeZfQIYbvDN4fHxN5pqqjylUjWx8-aTM_vGKM2P2-eSahkYrZXlCKK2JGOzlzU3CB5cIC9Wh27Tkp9MXN5atFI-jQOKlWSRc1XJFU47phVjx6Dme6FKBDnrOTmxN4K1bhP_Z4I7jYQpAKNOizIWfngDgskxXns25tyLtJEEvF8uwWw_8clnDM4AIkmwVvfYfAe5J5ddNN2zCACmTreera7SrMvi4pqxgDHgXc6erxGiLn9BIOevcbIHTSYgO-0jRJmP3oeBK9PdFqudpmBYvPOZC8Rl4GUDRjIamGyxrrWqIFqfVAHltQDyz2Qm8HEqUuA-M1eEwHRItGah4gsYZWbwmvECGuyaKGcynJ-Rnq2nKcEoWcCtHeq4zNFMJbl0dIyKURQZMooQDiSKfqwT3sH_7mJE1WgcZzBWtxe4L4C339ijArLfbkcJTOontBEhXzv_BIF-4tPnG_RmKOVt7oInGQPiW5BddEdNLrTBL02t0Da2Pv0AXPGRb4P87doxD8dI49fZ37UXOm3TJU5y6cr8S_9xmRLgPtAPcTBBXkFjuxIGmSpkUwoWDU55WEv3OV2jSeSE9ViCfrrBYFZl5Umpj6yWLj35HFaQc6OKFSug_cGCjgRaP_ThdRGAADrJ1aOXazVJU97YDKFAV9muqlW_UPTmviqpjWB93z0o5Ly5k5LmBX_wUrHwK0zioqe0mLycsPrkKix0pS3v0XMqDgRVhyBzUaNFg6QUEZaAfEPjDzbURugVGmGX4lEi5E9VUacd7fxYIHhSFiF4c9xGoDmT7HORRjQ4YVCOodMTN8J06EYiAwdYjDMymgw=w1920-h941"
              />
            </Link>
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
              onChange={onChangeUserSearch}
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-2 rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={handleclickSearchButton}
            >
              <MagnifyingGlassIcon className="h-full w-3" />
            </Button>
          </div>
          {/* opcion de cotizacion actual */}
          <div className="hidden lg:block !w-[300px]">
            <ActiveQuote />
          </div>
        </div>
        {/* si openNav es true, se abre este collapse */}
        <Collapse open={openNav}>
          <CategoryList />
        </Collapse>
      </Navbar>
      {/*  */}
      <div
        className={`h-screen w-[300px] relative left-0 duration-300 transform ease-in-out bg-white text-primary overflow-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`absolute  pt-[96px] w-full h-full border-4 border-r-gray-400`}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>
    </>
  );
}
