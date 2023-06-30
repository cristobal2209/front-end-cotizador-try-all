import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@material-tailwind/react";

import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function QuoteName() {
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

  return (
    <>
      <div className="flex min-w-[280px] items-center justify-end">
        {isEditing ? (
          <Input
            type="search"
            label="Nuevo nombre"
            className=" bg-secondary text-white"
            color="white"
            value={quoteName}
            onChange={handleNameChange}
          />
        ) : (
          <div className="">
            <span className=" mx-2 text-white">Cotización actual: {quoteName}</span>
          </div>
        )}
        <div className="px-2">
          {isEditing ? (
            <Button
              size="sm"
              className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={handleSaveName}
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={() => setIsEditing(true)}
            >
              Cambiar nombre
            </Button>
          )}
        </div>
        <div>
          <Button
            size="sm"
            className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
            onClick={(event) => handleClickShoppingCart()}
          >
            <ShoppingCartIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
