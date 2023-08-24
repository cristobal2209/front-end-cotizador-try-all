import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

import { createQuote } from "../../services/createQuoteService";

import {
  ShoppingCartIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const TEMPLATE_QUOTE = {
  quoteName: "",
  articles: [],
  date: "",
  state: 1,
  version: "",
};

export default function CreateQuote({ UUID }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quoteName, setQuoteName] = useState("Nueva Cotización");
  const [currentDate] = useState(new Date());

  const quoteData = TEMPLATE_QUOTE;

  const handleCreateQuote = async () => {
    try {
      await createQuote(UUID, quoteData);
      handleEditing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setQuoteName(e.target.value);
  };

  const handleSetInitialQuoteData = () => {
    quoteData.quoteName = quoteName;
    quoteData.date = currentDate.toDateString();
    quoteData.version = "1.0";
    quoteData.state = 1;
    handleCreateQuote();
  };

  return (
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
            className="mx-1 rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
            onClick={(event) => handleSetInitialQuoteData()}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            className="mx-1 rounded bg-quaternary hover:bg-quaternaryHover"
            onClick={handleEditing}
          >
            Nueva cotizacion
          </Button>
        </>
      )}
    </>
  );
}
