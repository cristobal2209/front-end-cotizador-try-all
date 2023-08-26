import { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";

import { useFormik } from "formik";
import * as Yup from "yup";

import { createQuote } from "../../services/createQuoteService";

import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";

const TEMPLATE_QUOTE = {
  quoteName: "",
  articles: [],
  date: "",
  state: "",
  version: "",
};

const validationSchema = Yup.object().shape({
  quoteName: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),
});

export default function CreateQuote({ UUID }) {
  const [isEditing, setIsEditing] = useState(false);
  const [openQuoteNameAlert, setOpenQuoteNameAlert] = useState(false);
  const [currentDate] = useState(new Date());
  const inputRef = useRef(null);

  const quoteData = TEMPLATE_QUOTE;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const formik = useFormik({
    initialValues: {
      quoteName: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleConfirmName();
    },
  });

  const handleCreateQuote = () => {
    handleSetInitialQuoteData();
    try {
      createQuote(UUID, quoteData);
      handleEditing();
    } catch (error) {
      console.log(error);
    }
    handleOpenQuoteNameAlert();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  const handleSetInitialQuoteData = () => {
    quoteData.quoteName = formik.values.quoteName;
    quoteData.date = currentDate.toDateString();
    quoteData.version = "1.0";
    quoteData.state = 1;
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleOpenQuoteNameAlert = () => {
    setOpenQuoteNameAlert(!openQuoteNameAlert);
  };

  const handleConfirmName = () => {
    handleSetInitialQuoteData();
    handleOpenQuoteNameAlert();
  };

  return (
    <>
      {isEditing ? (
        <>
          <Input
            name="quoteName"
            label="Nombre cotización"
            color="white"
            value={formik.values.quoteName}
            inputRef={inputRef}
            onChange={formik.handleChange}
            onKeyDown={handleKeyPress}
            required
          />
          {formik.touched.quoteName && formik.errors.quoteName ? (
            <Alert className="absolute mt-[110px] bg-red-500 !w-auto animate-pulse">
              <div className="flex flex-row items-center">
                <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                {formik.errors.quoteName}
              </div>
            </Alert>
          ) : null}
          <Button
            size="sm"
            className="mx-1 rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
            onClick={() => formik.handleSubmit()}
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
        <DialogBody divider>
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
