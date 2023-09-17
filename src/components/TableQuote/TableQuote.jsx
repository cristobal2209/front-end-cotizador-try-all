import { useState, useEffect } from "react";
import { fetchUserQuotes } from "../../services/TableQuoteService";
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
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Nombre", "Version", "Estado", "Fecha Creación", "Editar"];

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [userQuotesCollection, setUserQuotesCollection] = useState([{}]);
  const [alertData, setAlertData] = useState();

  useEffect(() => {
    document.title = "Tabla Usuarios";
    getUserQuotes();
  }, []);

  const getUserQuotes = async () => {
    setIsLoadingTable(true);
    const userQuotes = await fetchUserQuotes();
    console.log(userQuotes);
    setUserQuotesCollection(userQuotes);
    setIsLoadingTable(false);
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

  return (
    <>
      <div className="mx-[10px]">
        <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Mis cotizaciones
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Aquí podrá ver las cotizaciones que usted ha hecho.
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Buscar usuario"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                {/* <AlertSuccess
                      open={openAlertSuccess}
                      handler={handleOpenAlertSuccess}
                      data={alertData}
                    />
                    <AlertFailed
                      open={openAlertFailed}
                      handler={handleOpenAlertFailed}
                      error={alertData}
                    /> */}
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="mx-auto">
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
                    {userQuotesCollection.map((quote, index) => {
                      const isLast = index === userQuotesCollection.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={quote.id}>
                          <UserQuoteRow
                            quote={quote}
                            classes={classes}
                            key={quote.id}
                            handleSuccessAlert={handleSuccessAlert}
                            handleFailedAlert={handleFailedAlert}
                          />
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <>{/* paginador */}</>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
