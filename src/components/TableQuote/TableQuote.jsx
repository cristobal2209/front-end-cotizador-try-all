import { useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//pagination
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Nombre", "Estado", "Fecha Creación", "Ver", "Opciones"];

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [userQuotesCollection, setUserQuotesCollection] = useState([]);
  const [alertData, setAlertData] = useState();
  const [contador, setContador] = useState(0);

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

  // const getAllUserQuotes = async () => {
  //   setIsLoadingTable(true);
  //   const userQuotes = await getUserQuotes();
  //   setUserQuotesCollection(userQuotes);
  //   setIsLoadingTable(false);
  // };

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

  //message se ocupa para mostrar alertas personalizadas
  const handleSuccessAlert = (message) => {
    //getUserQuotes();
    setAlertData(message);
    handleOpenAlertSuccess(true);
  };

  //error se ocupa para mostrar el error al usuario
  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed(true);
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
    <>
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
                  Aquí podrá ver las cotizaciones que usted ha hecho.
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Buscar cotización"
                    icon={
                      <MagnifyingGlassIcon className="h-5 w-5 text-light" />
                    }
                    color="white"
                  />
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
              </div>
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
                      Usted no tiene tiene cotizaciones guardadas. Para crear
                      una cotización, presione el botón "Nueva cotización" en la
                      barra de navegación.
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
      </div>
    </>
  );
}
