import { useState, useEffect } from "react";
import { subscribeToCollection } from "../../services/TableQuoteService";
import UserQuoteRow from "./UserQuoteRow";
import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Input,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//pagination
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Nombre", "Estado", "Fecha Creación", "Ver", "Opciones"];

import * as xlsx from "xlsx";
function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string") {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

function generateExcel(quoteData) {
  //Encabezados de cotizacion
  let excelQuoteElements = [
    ["ID", quoteData.id],
    ["Nombre Cotización", quoteData.quoteName],
    ["Responsable", quoteData.responsibleName],
    ["Fecha de creación", quoteData.createDate],
    ["Fecha de actualización", quoteData.lastUpdateDate],
    ["Productos"],
  ];
  //Encabezados de productos
  excelQuoteElements.push([
    "",
    "Producto",
    "Fabricante",
    "N° parte fabricante",
    "Proveedor",
    "N° parte proveedor",
    "Precio por",
    "Precio",
    "Cantidad",
    "Subtotal",
    "Enlace",
  ]);

  //Datos de productos
  for (const productQuoteData of quoteData.products) {
    excelQuoteElements.push([
      "",
      productQuoteData.product.description,
      productQuoteData.product.manufacturer,
      productQuoteData.product.manufacturerPartNo,
      capitalizeFirstLetter(productQuoteData.supplier.supplier),
      productQuoteData.supplier.newarkPartNo,
      productQuoteData.product.priceFor,
      productQuoteData.price,
      productQuoteData.quantity,
      (productQuoteData.quantity * productQuoteData.price).toFixed(2),
      productQuoteData.supplier.productUrl,
    ]);
  }
  //Total
  excelQuoteElements.push([
    "Total",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    quoteData.total,
  ]);

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(excelQuoteElements);

  xlsx.utils.book_append_sheet(workbook, worksheet, "Cotización");

  const nombrecotizacion = quoteData.quoteName + ".xlsx";
  xlsx.writeFile(workbook, nombrecotizacion);
}

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [userQuotesCollection, setUserQuotesCollection] = useState([]);
  const [alertData, setAlertData] = useState();
  const [contador, setContador] = useState(0);
  const [openQuoteView, setOpenQuoteView] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    document.title = "Mis cotizaciones";
    const unsubscribe = subscribeToCollection("quotes", (data) => {
      setUserQuotesCollection(data);
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    setContador(contador + 1);
  }, [userQuotesCollection]);

  const handleOpenQuoteView = () => setOpenQuoteView(!openQuoteView);

  const handleQuoteView = (data) => {
    setQuoteData(data);
    handleOpenQuoteView();
  };

  const handleGenerateExcel = (quote) => generateExcel(quote);

  const handleOpenAlertSuccess = () => setOpenAlertSuccess(!openAlertSuccess);

  const handleOpenAlertFailed = () => setOpenAlertFailed(!openAlertFailed);

  //message se ocupa para mostrar alertas personalizadas
  const handleSuccessAlert = (message) => {
    //getUserQuotes();
    setAlertData(message);
    handleOpenAlertSuccess();
    setTimeout(() => {
      setOpenAlertSuccess(false);
    }, 3000);
  };

  //error se ocupa para mostrar el error al usuario
  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed();
    setTimeout(() => {
      setOpenAlertFailed(false);
    }, 3000);
  };

  //pagination
  const itemsPerPage = 10;
  const [active, setActive] = useState(1);

  const totalItems = userQuotesCollection.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisibleItems = () => {
    const startIndex = (active - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userQuotesCollection.slice(startIndex, endIndex);
  };

  const next = () => {
    if (active < totalPages) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  return (
    <div className="mx-[10px] pb-[10px]">
      <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3 shadow-2xl">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-dark3"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" className="text-light">
                Mis cotizaciones
              </Typography>
              <Typography className="mt-1 font-normal text-light opacity-70">
                Historial de cotizaciones.
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Buscar cotización"
                  icon={<MagnifyingGlassIcon className="h-5 w-5 text-dark" />}
                  disabled={true}
                  //labelProps={{ className: "bg-four rounded-md" }}
                  //containerProps={{ className: "bg-four rounded-md" }}
                />
              </div>
            </div>
            <AlertSuccess
              open={openAlertSuccess}
              handler={handleOpenAlertSuccess}
              data={alertData}
            />
            <AlertFailed
              open={openAlertFailed}
              handler={handleOpenAlertFailed}
              error={alertData}
            />
          </div>
        </CardHeader>
        <CardBody
          className={`overflow-x-auto p-0 ${
            userQuotesCollection.length === 0 ? "h-20" : "h-[900px]"
          }`}
        >
          {isLoadingTable ? (
            <tr>
              <td>
                <div>
                  <Spinner className="h-12 w-12" />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {userQuotesCollection.length === 0 ? (
                <>
                  <Typography className="w-full text-center font-bold text-light">
                    Usted no tiene tiene cotizaciones guardadas. Para crear una
                    cotización, presione el botón "Nueva cotización" en la barra
                    de navegación.
                  </Typography>
                </>
              ) : (
                <>
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-light bg-dark p-4 border-opacity-50"
                          >
                            <Typography
                              variant="small"
                              className="font-normal leading-none opacity-70 text-light"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/*Dejo el argumento index por si se necesita a futuro*/}
                      {getVisibleItems().map((quote, index) => {
                        //const isLast = index === userQuotesCollection.length - 1;
                        const classes = "p-4 border-y border-blue-gray-100";

                        return (
                          <UserQuoteRow
                            quote={quote}
                            classes={classes}
                            key={quote.id}
                            handleSuccessAlert={handleSuccessAlert}
                            handleFailedAlert={handleFailedAlert}
                            handleGenerateExcel={handleGenerateExcel}
                            handleQuoteView={handleQuoteView}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </CardBody>
        <CardFooter
          className={`overflow-x-auto flex items-center justify-between border-t border-light-50 p-4 ${
            userQuotesCollection.length === 0 ? "hidden" : "block"
          }`}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2 bg-one text-light"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              <span className="hidden sm:block">Anterior</span>
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <IconButton
                  key={index}
                  {...getItemProps(index + 1)}
                  className="bg-one hover:bg-oneHover text-light"
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 bg-one text-light"
              onClick={next}
              disabled={active === totalPages}
            >
              <span className="hidden sm:block">Siguiente</span>

              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <QuoteView
        open={openQuoteView}
        handler={handleOpenQuoteView}
        quoteData={quoteData}
      />
    </div>
  );
}
function AlertFailed({ open, handler, error }) {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="fixed w-auto right-[0px]">
        <Alert
          open={open}
          onClose={() => handler()}
          color="red"
          icon={<Icon />}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <Typography variant="small">{error ? error : " "}</Typography>
        </Alert>
      </div>
    </>
  );
}
function AlertSuccess({ open, handler, data }) {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="!absolute w-auto right-[0px]">
        <Alert
          open={open}
          onClose={() => handler()}
          color="green"
          icon={<Icon />}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <Typography variant="small">{data ? data : " "}</Typography>
        </Alert>
      </div>
    </>
  );
}

export function QuoteView({ open, handler, quoteData }) {
  const TABLE_QUOTE_HEAD = [
    "Producto",
    "Fabricante",
    "N° parte fabricante",
    "Proveedor",
    "N° parte proveedor",
    "Precio por",
    "Precio",
    "Cantidad",
    "Subtotal",
    "Página proveedor",
  ];

  return (
    <Dialog open={open} size="xl" className="bg-dark">
      <DialogHeader className="justify-between text-light">
        {quoteData?.quoteName}
        <IconButton
          color="white"
          size="sm"
          variant="text"
          onClick={() => handler()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-[42rem] overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_QUOTE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-light bg-dark p-4 border-opacity-50"
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-light"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quoteData?.products.map((productQuoteData, index) => {
              //const isLast = index === userQuotesCollection.length - 1;
              const classes = "px-4 border-b border-blue-gray-100";

              return (
                <tr key={index} className="hover:bg-dark2">
                  <td className={`${classes} w-10 flex-auto`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.product.description}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.product.manufacturer}
                    </Typography>
                  </td>
                  <td className={`${classes} w-10 flex-auto`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.product.manufacturerPartNo}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      {capitalizeFirstLetter(
                        productQuoteData?.supplier.supplier
                      )}
                    </Typography>
                  </td>
                  <td className={`${classes} w-10 flex-auto`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.supplier.newarkPartNo}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.product.priceFor}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      ${productQuoteData?.price}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      {productQuoteData?.quantity}&nbsp;u.
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography variant="small" className="text-light">
                      $
                      {(
                        productQuoteData?.quantity * productQuoteData?.price
                      ).toFixed(2)}
                    </Typography>
                  </td>
                  <td className={`${classes} text-center w-10 flex-auto`}>
                    <Typography variant="small" className="text-blue-800">
                      {" "}
                      <a
                        href={productQuoteData?.supplier.productUrl}
                        className="hover:text-blue-700 hover:underline"
                      >
                        Link
                      </a>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <div className="!justify-self-start w-full justify-between flex flex-row">
          <Typography variant="h5" className="text-light">
            Total:
          </Typography>
          <Typography variant="h5" className="text-light">
            ${quoteData?.total}
          </Typography>
        </div>
        {/* <Button
          variant="text"
          color="white"
          onClick={() => {
            handler();
          }}
        >
          Cerrar
        </Button> */}
      </DialogFooter>
    </Dialog>
  );
}
