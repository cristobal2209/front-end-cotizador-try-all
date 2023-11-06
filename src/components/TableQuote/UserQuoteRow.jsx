import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  changeQuoteStatus,
  deleteQuote,
} from "../../services/TableQuoteService";

export default function UserQuoteRow({
  quote,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
  handleGenerateExcel,
  handleQuoteView,
}) {
  const [openThreeDotsOptions, setOpenThreeDotsOptions] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState(String(quote.status));
  const [newQuoteStatus, setNewQuoteStatus] = useState(quoteStatus);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    setQuoteStatus(String(quote.status));
    //setContador(contador + 1);
  }, [quote]);

  useEffect(() => {
    setNewQuoteStatus(quoteStatus);
    setContador(contador + 1);
  }, [quoteStatus]);

  const handleChangeQuoteStatus = (newQuoteStatus) => {
    setIsConfirmationDialogOpen(true);
    setNewQuoteStatus(newQuoteStatus);
  };

  const handleOpenThreeDotsOptions = () => {
    setOpenThreeDotsOptions(!openThreeDotsOptions);
  };

  //Manejo borrado cotizacion

  const handleDeleteQuote = async () => {
    await deleteQuote(quote.id)
      .then(() => {
        return;
      })
      .catch((e) => {
        throw e;
      });
  };

  const handleConfirmDelete = async () => {
    await handleDeleteQuote()
      .then(() => {
        handleSuccessAlert("Cotización eliminada correctamente");
      })
      .catch((e) => {
        handleFailedAlert("Error al eliminar la cotización");
      });
    handleOpenDeleteDialog();
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  //Manejo de estados cotizacion

  const handleConfirmChangeStatus = async () => {
    await changeQuoteStatus(quote.id, parseInt(newQuoteStatus, 10))
      .then(() => {
        handleSuccessAlert("Estado cotización cambiado");
      })
      .catch(() => {
        handleFailedAlert("Error al cambiar el estado");
      });
    setIsConfirmationDialogOpen(false);
  };

  const handleCancelChangeStatus = () => {
    setNewQuoteStatus(quoteStatus);
    setIsConfirmationDialogOpen(false);
  };

  return (
    <tr className="hover:bg-two">
      <td className={`${classes}`}>
        <div className="flex items-center">
          <Typography variant="small" className="font-normal text-light mr-1">
            {quote.quoteName}
          </Typography>
          <Button className="hover:bg-twoHover  bg-transparent shadow-none !px-2">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </Button>
        </div>
      </td>
      {/* <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {quote.version}
          </Typography>
        </td> */}
      <td className={classes}>
        <div className="max-w-[10rem]">
          <Select
            value={newQuoteStatus}
            onChange={handleChangeQuoteStatus}
            variant="standard"
            className="text-light opacity-70"
            menuProps={{ className: "bg-dark text-light border-dark2" }}
          >
            <Option
              className={` ${quoteStatus === "1" ? "hidden" : ""}`}
              value={"1"}
            >
              Activa
            </Option>
            <Option
              className={`${quoteStatus === "2" ? "hidden" : ""}`}
              value={"2"}
            >
              En curso
            </Option>
            <Option
              className={` ${quoteStatus === "3" ? "hidden" : ""}`}
              value={"3"}
            >
              Finalizada
            </Option>
          </Select>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="font-normal text-light opacity-70"
        >
          {quote.createDate}
        </Typography>
      </td>
      <td className={classes}>
        <Button
          className="px-3 bg-transparent shadow-none hover:bg-twoHover"
          onClick={() => handleQuoteView(quote)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Button>
      </td>
      <td className={classes}>
        <Menu>
          <MenuHandler>
            <Button
              variant="text"
              className="px-3 bg-transparent shadow-none hover:shadow-md hover:bg-twoHover"
              onClick={() => handleOpenThreeDotsOptions()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </Button>
          </MenuHandler>
          <MenuList className="bg-dark text-light border-dark2">
            <MenuItem disabled={true}>Cambiar nombre</MenuItem>
            <MenuItem disabled={true}>Ver Versiones</MenuItem>
            <MenuItem onClick={() => handleGenerateExcel(quote)}>
              Descargar Excel
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteDialog}>Eliminar</MenuItem>
          </MenuList>
        </Menu>
      </td>
      <Dialog open={isConfirmationDialogOpen} className="bg-dark">
        <DialogHeader className="text-light">
          Confirmar Cambio de Estado
        </DialogHeader>
        <DialogBody className="text-light opacity-70">
          ¿Estás seguro en cambiar el estado?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelChangeStatus}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmChangeStatus}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={openDeleteDialog} className="bg-dark">
        <DialogHeader className="text-light">
          Confirmar eliminación de cotización
        </DialogHeader>
        <DialogBody className="text-light opacity-70 flex flex-col">
          <span className="text-center">
            ¿Estás seguro en eliminar esta cotización?
          </span>
          <span className="font-bold text-center">{quote.quoteName}</span>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteDialog}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmDelete}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </tr>
  );
}
