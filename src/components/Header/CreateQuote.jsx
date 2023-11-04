import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createQuote,
  subscribeToActiveQuote,
} from "../../services/QuoteService";

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
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SCHEMA_QUOTE = {
  quoteName: "",
  products: [],
  createDate: "",
  lastUpdateDate: "",
  status: "",
  version: "",
  responsibleName: "",
  responsibleUUID: "",
};

const validationSchema = Yup.object().shape({
  quoteName: Yup.string()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(20, "El nombre debe contener a lo mas 20 caracteres")
    .required("El nombre es obligatorio")
    .matches(
      /^[a-zA-Z0-9 ]*$/,
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
  const [activeQuote, setActiveQuote] = useState(null);
  const [contador, setContador] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const quoteData = SCHEMA_QUOTE;

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToActiveQuote((data) => {
      setActiveQuote(data);
    });
    setIsLoading(false);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    setContador(contador + 1);
  }, [activeQuote]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  setTimeout(() => {
    setOpenQuoteCreatedAlert(false);
  }, 3000);

  const formik = useFormik({
    initialValues: {
      quoteName: "",
      date: currentDate.toDateString(),
      version: "1.0",
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      quoteData.quoteName = formik.values.quoteName;
      quoteData.date = formik.values.date;
      quoteData.version = formik.values.version;
      handleOpenQuoteNameAlert();
    },
  });

  const handleCreateQuote = async () => {
    setIsLoading(true);
    try {
      handleOpenQuoteNameAlert();
      await createQuote(quoteData);
      handleEditing();
    } catch (error) {
      setIsLoading(false);
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

  const handleNavigateToQuote = () => {
    navigate(`quoteDetails/${activeQuote.id}`);
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
              {formik.errors.quoteName ? (
                <Alert className="absolute mt-[70px] bg-red-500 !w-auto animate-pulse">
                  <div className="flex flex-row items-center">
                    <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                    {formik.errors.quoteName}
                  </div>
                </Alert>
              ) : null}
              <Button
                size="sm"
                className="rounded bg-three shadow-none hover:bg-threeHover mx-1 my-2 px-2"
                onClick={() => formik.handleSubmit()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </Button>
              <Button
                size="sm"
                className="rounded bg-red-600 shadow-none hover:bg-red-400 mx-1 my-2 px-2"
                onClick={() => handleEditing()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </>
          ) : (
            <>
              {activeQuote ? (
                <div className="bg-four pl-3 rounded-md border-whiteHover border-solid border-2 flex items-center">
                  {/* <span className="border-dashed border-b-2 mb-1 ">
                      Cotización activa
                    </span> */}
                  <Typography className="font-bold italic mr-2">
                    {activeQuote.quoteName}
                  </Typography>
                  <div>
                    <Button
                      size="sm"
                      className="m-1 rounded bg-transparent shadow-none hover:shadow-lg hover:bg-fourHover"
                      onClick={handleNavigateToQuote}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    size="sm"
                    className="mx-1 rounded bg-three hover:bg-threeHover font-normal"
                    onClick={handleNewQuoteButtonPress}
                  >
                    Nueva cotización
                  </Button>
                </>
              )}
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
          className="absolute mt-[70px] bg-green-500 !w-auto"
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
