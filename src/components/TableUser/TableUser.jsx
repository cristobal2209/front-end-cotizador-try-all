import { useState, useEffect } from "react";
import { fetchUserData } from "../../services/TableUserService.js";
import CreateUser from "./CreateUser";
import UserDataRow from "./UserDataRow";
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

const TABLE_HEAD = ["Nombre", "Correo", "Privilegios", "Habilitado", "Editar"];

export default function TableUser() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [userDataCollection, setUserDataCollection] = useState([{}]);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [alertData, setAlertData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);
  useEffect(() => {
    setFilteredUserData(userDataCollection);
  }, [userDataCollection]);
  useEffect(() => {
    document.title = "Tabla Usuarios";
    getUserData();
  }, []);
  const handleSearch = () => {
    const filteredData = userDataCollection.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUserData(filteredData);
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const getUserData = async () => {
    setIsLoadingTable(true);
    const userData = await fetchUserData();
    setUserDataCollection(userData);
    setIsLoadingTable(false);
  };

  const handleOpenCreateUserModal = () => {
    setOpenCreateUserModal(!openCreateUserModal);
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
    getUserData();
    setAlertData(message);
    handleOpenAlertSuccess(true);
  };

  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed(true);
  };

  return (
    <>
      <div className="mx-[10px]">
        <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-dark3"
          >
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" className="text-light">
                  Tabla de gestión de usuarios
                </Typography>
                <Typography className="mt-1 font-normal text-light opacity-70">
                  En esta sección podrá gestionar los usuarios que se encuentran
                  en el sistema.
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
                            placeholder="Buscar Producto"
                            
                          />
                </div>
                {isCreateUserLoading ? (
                  <div className="flex justify-center content-center w-[134px]">
                    <Spinner className="h-[40px] w-[40px]" />
                  </div>
                ) : (
                  <>
                    <Button
                      className="flex items-center gap-3 bg-three hover:bg-threeHover"
                      size="sm"
                      onClick={handleOpenCreateUserModal}
                    >
                      Crear usuario
                    </Button>
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
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll p-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-light bg-dark border-opacity-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none  text-light opacity-70"
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
                    {filteredUserData.map((user, index) => {
                      const isLast = index === userDataCollection.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <UserDataRow
                          user={user}
                          classes={classes}
                          key={index}
                          handleSuccessAlert={handleSuccessAlert}
                          handleFailedAlert={handleFailedAlert}
                        />
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
        </Card>
        {openCreateUserModal && (
          <CreateUser
            handleSuccessAlert={handleSuccessAlert}
            handleFailedAlert={handleFailedAlert}
            setIsCreateUserLoading={setIsCreateUserLoading}
            open={openCreateUserModal}
            handler={handleOpenCreateUserModal}
          />
        )}
      </div>
    </>
  );
}
