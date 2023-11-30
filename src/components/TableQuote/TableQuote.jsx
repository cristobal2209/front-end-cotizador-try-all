import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { subscribeToCollection } from "../../services/TableQuoteService";
import UserQuoteRow from "./UserQuoteRow";
import AlertFailed from "./AlertFailed";
import AlertSuccess from "./AlertSuccess";
import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import * as xlsx from "xlsx";

const TABLE_HEAD = ["Nombre", "Estado", "Fecha Creación", "Ver", "Opciones"];

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [userQuotesCollection, setUserQuotesCollection] = useState([]);
  const [quoteData, setQuoteData] = useState(null);
  const [alertData, setAlertData] = useState("");
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [openQuoteView, setOpenQuoteView] = useState(false);
  const [contador, setContador] = useState(0);
  const [active, setActive] = useState(1);

  const itemsPerPage = 10;
  const totalItems = userQuotesCollection.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItems = userQuotesCollection.slice(startIndex, endIndex);
  const [originalUserQuotesCollection, setOriginalUserQuotesCollection] =
    useState([]);

  useEffect(() => {
    document.title = "Mis cotizaciones";
    const unsubscribe = subscribeToCollection("quotes", (data) => {
      setUserQuotesCollection(data);
      setOriginalUserQuotesCollection(data); // Almacenar el estado original
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

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === "") {
        // Si el término de búsqueda está vacío, restaurar el estado original
        setUserQuotesCollection(originalUserQuotesCollection);
      } else {
        // Filtrar userQuotesCollection por searchTerm
        const filteredQuotes = originalUserQuotesCollection.filter((quote) => {
          // Puedes ajustar las condiciones de filtrado según tus necesidades
          return (
            quote.quoteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.responsibleName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
            // Agrega más condiciones según las propiedades que deseas incluir en la búsqueda
          );
        });

        // Establecer el nuevo estado filtrado
        setUserQuotesCollection(filteredQuotes);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleOpenAlertSuccess = (boolean) => {
    setOpenAlertSuccess(boolean);
    setTimeout(() => {
      setOpenAlertSuccess(false);
    }, 5000);
  };

  const handleOpenAlertFailed = (boolean) => {
    setOpenAlertFailed(boolean);
    setTimeout(() => {
      setOpenAlertFailed(false);
    }, 5000);
  };

  const handleSuccessAlert = (message) => {
    setAlertData(message);
    handleOpenAlertSuccess(true);
  };

  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed(true);
  };

  const TableHeader = (
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
  );

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
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Buscar cotización"
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
                <Typography className="w-full text-center font-bold text-light">
                  Usted no tiene tiene cotizaciones guardadas. Para crear una
                  cotización, presione el botón &quot;Nueva cotización&quot; en
                  la barra de navegación.
                </Typography>
              ) : (
                <table className="w-full min-w-max table-auto text-left">
                  {TableHeader}
                  <tbody>
                    {visibleItems.map((quote, index) => (
                      <UserQuoteRow
                        quote={quote}
                        classes="p-4 border-y border-blue-gray-100"
                        key={index}
                        handleSuccessAlert={handleSuccessAlert}
                        handleFailedAlert={handleFailedAlert}
                        handleGenerateExcel={handleGenerateExcel}
                        handleQuoteView={handleQuoteView}
                      />
                    ))}
                  </tbody>
                </table>
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
  QuoteView.propTypes = {
    open: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
    quoteData: PropTypes.object,
  };

  useEffect(() => {
    console.log(quoteData);
  }, [quoteData]);

  return (
    <Dialog open={open} size="xl" className="bg-dark !w-screen">
      <DialogHeader className="justify-between text-light">
        <Typography variant="h5">
          Nombre cotización: {quoteData?.quoteName}
        </Typography>

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
      <DialogBody
        className={`h-full ${
          quoteData?.products.length !== 0 && " overflow-scroll"
        }`}
      >
        {quoteData?.products.length === 0 ? (
          <>
            <Typography variant="paragraph" className="text-light text-center">
              Esta cotización no tiene productos.
            </Typography>
          </>
        ) : (
          <>
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
                  const classes = "px-4 border-b border-blue-gray-100";

                  return (
                    <tr key={index} className="hover:bg-twoHover">
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
                          {productQuoteData?.supplier.supplierPartNo}
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
          </>
        )}
      </DialogBody>
      {quoteData?.products.length === 0 ? (
        <></>
      ) : (
        <>
          <DialogFooter className="space-x-2">
            <div className="!justify-self-start w-full justify-between flex flex-row">
              <Typography variant="h5" className="text-light">
                Total:
              </Typography>
              <Typography variant="h5" className="text-light">
                ${quoteData?.total}
              </Typography>
            </div>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}
function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string") {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
function generateExcel(quoteData) {
  let excelQuoteElements = [
    ["ID", quoteData.id],
    ["Nombre Cotización", quoteData.quoteName],
    ["Responsable", quoteData.responsibleName],
    ["Fecha de creación", quoteData.createDate],
    ["Fecha de actualización", quoteData.lastUpdateDate],
    ["Productos"],
  ];
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
