import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createQuote } from "../../services/createQuoteService";
import { auth } from "../../firebaseConfig";

import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Spinner,
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
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(20, "El nombre debe contener a lo mas 20 caracteres")
    .required("El nombre es obligatorio")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "No se permiten caracteres especiales en el nombre"
    ),
});

export default function CreateQuote() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isQuoteCreated, setIsQuoteCreated] = useState(false);
  const [openQuoteCreatedAlert, setOpenQuoteCreatedAlert] = useState(true);
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
      quoteData.quoteName = formik.values.quoteName;
      handleOpenQuoteNameAlert();
    },
  });

  const handleCreateQuote = async () => {
    handleSetInitialQuoteData();
    setIsLoading(true);
    try {
      handleOpenQuoteNameAlert();
      await createQuote(auth.currentUser.uid, quoteData);
      handleEditing();
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
    }
    setIsQuoteCreated(true);
    setOpenQuoteCreatedAlert(true);
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  const handleSetInitialQuoteData = () => {
    quoteData.date = currentDate.toDateString();
    quoteData.version = "1.0";
    quoteData.state = 1;
  };

  const handleNewQuoteButtonPress = () => {
    formik.values.quoteName = "";
    setIsQuoteCreated(false);
    handleEditing();
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleOpenQuoteNameAlert = () => {
    setOpenQuoteNameAlert(!openQuoteNameAlert);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Spinner className="h-6 w-6" color="blue" />
        </>
      ) : (
        <>
          {isEditing ? (
            <>
              <Input
                variant="standard"
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
                <Alert className="absolute mt-[130px] bg-red-500 !w-auto animate-pulse">
                  <div className="flex flex-row items-center">
                    <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                    {formik.errors.quoteName}
                  </div>
                </Alert>
              ) : null}
              <Button
                size="sm"
                className="mx-1 rounded bg-quaternary shadow-none hover:bg-quaternaryHover !px-2"
                onClick={() => formik.handleSubmit()}
              >
                <CheckIcon className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                className="mx-1 rounded bg-red-600 shadow-none hover:bg-red-400 !px-2"
                onClick={() => handleEditing()}
              >
                <XMarkIcon className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                className="mx-1 rounded bg-quaternary hover:bg-quaternaryHover font-light"
                onClick={handleNewQuoteButtonPress}
              >
                Nueva cotización
              </Button>
            </>
          )}
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
      {isQuoteCreated && (
        <Alert
          className="absolute mt-[130px] bg-green-500 !w-auto"
          open={openQuoteCreatedAlert}
          onClose={() => setOpenQuoteCreatedAlert(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <span>¡Cotización</span>
          <span className="font-bold"> {formik.values.quoteName} </span>
          <span>creada!</span>
        </Alert>
      )}
    </>
  );
}
