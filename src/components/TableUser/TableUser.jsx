import { useState, useEffect } from "react";
import { fetchUserData } from "../../services/tableUserService";
import CreateUser from "./CreateUser";
import UserDataRow from "./UserDataRow";
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

  useEffect(() => {
    document.title = "Tabla Usuarios";
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoadingTable(true);
    const userData = await fetchUserData();
    console.log(userData);
    //const newUserData = await addNewUserData(userData);
    setUserDataCollection(userData);
    setIsLoadingTable(false);
  };

  const handleOpenCreateUserModal = () => {
    setOpenCreateUserModal(!openCreateUserModal);
  };

  //message se ocupa para mostrar alertas personalizadas
  const handleSuccessAlert = (message) => {
    getUserData();
    setOpenAlertSuccess(true);
  };

  //error se ocupa para mostrar el error al usuario
  const handleFailedAlert = (error) => {
    setOpenAlertFailed(true);
  };

  return (
    <>
      <div className="mx-[10px]">
        <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Tabla de gestión de usuarios
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  En esta sección podrá gestionar los usuarios que se encuentran
                  en el sistema.
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Buscar usuario"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                {isCreateUserLoading ? (
                  <div className="flex justify-center content-center w-[134px]">
                    <Spinner className="h-[40px] w-[40px]" />
                  </div>
                ) : (
                  <>
                    <Button
                      className="flex items-center gap-3"
                      size="sm"
                      onClick={handleOpenCreateUserModal}
                    >
                      Crear usuario
                    </Button>
                    <Alert
                      open={openAlertSuccess}
                      onClose={() => setOpenAlertSuccess(false)}
                      className="fixed w-auto right-[26px] mt-[50px]"
                      color="green"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                      }}
                    >
                      Usuario Creado
                    </Alert>
                    <Alert
                      open={openAlertFailed}
                      onClose={() => setOpenAlertFailed(false)}
                      className="fixed w-auto right-[16px] mt-[50px]"
                      color="red"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                      }}
                    >
                      Error al crear usuario
                    </Alert>
                  </>
                )}
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
                    {userDataCollection.map((user, index) => {
                      const isLast = index === userDataCollection.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={user.uid}>
                          <UserDataRow
                            user={user}
                            classes={classes}
                            key={user.uid}
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
            {/* paginador */}
          </CardFooter>
        </Card>
        {openCreateUserModal && (
          <CreateUser
            handleSuccessAlert={handleSuccessAlert}
            handleFailedAlert={handleFailedAlert}
            setIsCreateUserLoading={setIsCreateUserLoading}
            openCreateUserModal={openCreateUserModal}
            handleOpenCreateUserModal={handleOpenCreateUserModal}
          />
        )}
      </div>
    </>
  );
}
