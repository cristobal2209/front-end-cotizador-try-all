import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateQuote from "./CreateQuote";

import { Button, Input } from "@material-tailwind/react";

import {
  ShoppingCartIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const TEST_ACTIVE_USER = "DZiomTYxRrRl7hJYcX2i"; //UUID provisorio para testing

export default function ActiveQuote() {
  const [isActiveQuote, setIsActiveQuote] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setQuoteName(e.target.value);
    setIsEditing(true);
  };

  const handleClickShoppingCart = () => {
    navigate("/home/quoteDetails/1");
  };

  return (
    <div className="flex flex-row items-center rounded-md p-2">
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
            </>
          ) : (
            <>
              <div className="mx-1 text-center">
                <span className="block text-white">Cotización actual: </span>
                <span className="text-300 block font-bold">{quoteName}</span>
              </div>
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
        <CreateQuote UUID={TEST_ACTIVE_USER} />
      )}
    </div>
  );
}
