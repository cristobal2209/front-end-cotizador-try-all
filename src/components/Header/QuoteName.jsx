import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@material-tailwind/react";

import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function QuoteName() {
  const [isActiveQuote, setIsActiveQuote] = useState(false);
  const [quoteName, setQuoteName] = useState("NuevaCotización");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setQuoteName(e.target.value);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    // Aquí puedes realizar las acciones necesarias para guardar el nuevo nombre de cotización
    setIsEditing(false);
  };

  const handleClickShoppingCart = () => {
    navigate("/home/newquote");
  };

  const handleActiveQuote = () => {
    setIsActiveQuote(true);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-row items-center rounded-md bg-secondary p-2">
      {isActiveQuote ? (
        <>
          {isEditing ? (
            <>
              <Input
                type="search"
                label="Nuevo nombre"
                className=" bg-secondary text-white"
                color="white"
                value={quoteName}
                onChange={handleNameChange}
              />
              <Button
                size="sm"
                className="mx-1 rounded bg-quaternary hover:bg-quaternaryHover "
                onClick={handleSaveName}
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="mx-1 text-center">
                <span className=" block text-white">Cotización actual: </span>
                <span className="  text-300 block font-bold">{quoteName}</span>
              </div>
              <Button
                size="sm"
                className="mx-1 rounded bg-quaternary hover:bg-quaternaryHover"
                onClick={() => setIsEditing(true)}
              >
                Cambiar nombre
              </Button>
            </>
          )}
          <div>
            <Button
              size="sm"
              className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={(event) => handleClickShoppingCart()}
            >
              <ShoppingCartIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <Button
          size="sm"
          className="mx-1 rounded bg-quaternary hover:bg-quaternaryHover"
          onClick={() => handleActiveQuote()}
        >
          Nueva cotizacion
        </Button>
      )}
    </div>
  );
}
