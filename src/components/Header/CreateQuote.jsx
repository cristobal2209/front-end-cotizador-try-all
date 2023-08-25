import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { createQuote } from "../../services/createQuoteService";

import { CheckIcon } from "@heroicons/react/24/outline";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const TEMPLATE_QUOTE = {
  quoteName: "",
  articles: [],
  date: "",
  state: "",
  version: "",
};

export default function CreateQuote({ UUID }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [openQuoteNameAlert, setOpenQuoteNameAlert] = useState(false);
  const [currentDate] = useState(new Date());
  const inputRef = useRef(null);

  const quoteData = TEMPLATE_QUOTE;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCreateQuote = () => {
    handleSetInitialQuoteData();
    try {
      createQuote(UUID, quoteData);
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

  const handleOpenQuoteNameAlert = () => {
    setOpenQuoteNameAlert(!openQuoteNameAlert);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetInitialQuoteData();
    }
  };

  const handleSetInitialQuoteData = () => {
    quoteData.quoteName = quoteName;
    quoteData.date = currentDate.toDateString();
    quoteData.version = "1.0";
    quoteData.state = 1;
    handleOpenQuoteNameAlert();
  };

  return (
    <>
      {isEditing ? (
        <>
          <Input
            label="Nombre cotización"
            color="white"
            value={quoteName}
            ref={inputRef}
            onChange={handleNameChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            size="sm"
            className="mx-1 rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
            onClick={() => handleSetInitialQuoteData()}
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
      <Dialog
        className="!h-auto"
        open={openQuoteNameAlert}
        handler={handleOpenQuoteNameAlert}
      >
        <DialogHeader>Creación de nueva cotización</DialogHeader>
        <DialogBody className="!h-auto" divider>
          <p className="text-center">
            ¿Está seguro en crear la siguiente cotización?
          </p>
          <p className="font-bold text-center overflow-y-auto">
            {quoteData.quoteName}
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenQuoteNameAlert}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCreateQuote}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
CreateQuote.propTypes = {
  UUID: PropTypes.string.isRequired,
};
