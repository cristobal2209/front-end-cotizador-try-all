import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  Alert,
} from "@material-tailwind/react";
import {
  changeQuoteStatus,
  deleteQuote,
} from "../../services/TableQuoteService";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function UserQuoteRow({
  quote,
  classes,
  handleAlert,
  handleGenerateExcel,
  handleQuoteView,
}) {
  const [openThreeDotsOptions, setOpenThreeDotsOptions] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState(String(quote.status));
  const [newQuoteStatus, setNewQuoteStatus] = useState(quoteStatus);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isEditingQuoteName, setIsEditingQuoteName] = useState(false);
  const [isQuoteNameHovered, setIsQuoteNameHovered] = useState(false);

  const handleChangeQuoteStatus = (newQuoteStatus) => {
    setIsConfirmationDialogOpen(true);
    setNewQuoteStatus(newQuoteStatus);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const handleConfirmChangeStatus = async () => {
    try {
      await changeQuoteStatus(quote.id, parseInt(newQuoteStatus, 10));
      handleAlert(true, "Estado cotización cambiado");
    } catch (error) {
      handleAlert(false, "Error al cambiar el estado");
    } finally {
      setIsConfirmationDialogOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuote(quote.id);
      handleAlert(true, "Cotización eliminada correctamente");
    } catch (error) {
      handleAlert(false, "Error al eliminar la cotización");
    } finally {
      handleOpenDeleteDialog();
    }
  };

  const handleCancelChangeStatus = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleChangeQuoteName = () => {
    setIsEditingQuoteName(true);
  };

  useEffect(() => {
    setQuoteStatus(String(quote.status));
    console.log(quote);
  }, [quote]);

  const validationSchema = Yup.object().shape({
    quoteName: Yup.string()
      .min(3, "El nombre debe contener al menos 3 caracteres")
      .max(20, "El nombre debe contener a lo más 20 caracteres")
      .required("El nombre es obligatorio")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "No se permiten caracteres especiales en el nombre"
      ),
  });

  const formik = useFormik({
    initialValues: {
      quoteName: quote.quoteName,
    },
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  return (
    <tr className="hover:bg-two">
      <td className={classes}>
        {isEditingQuoteName ? (
          <>
            <input
              type="text"
              name="quoteName"
              placeholder="Nombre cotización"
              label="Nombre cotización"
              value={formik.values.quoteName}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onMouseEnter={() => setIsQuoteNameHovered(true)}
              onMouseLeave={() => setIsQuoteNameHovered(false)}
              className={`mr-1 rounded-md px-1 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
                formik.errors.quoteName
                  ? " border-red-500 animate-pulse"
                  : "border-gray-700"
              }`}
            />
            {formik.errors.quoteName && isQuoteNameHovered ? (
              <Alert className="absolute mt-1 bg-red-500 !w-auto animate-pulse">
                {formik.errors.quoteName}
              </Alert>
            ) : null}
          </>
        ) : (
          <>
            <Typography variant="small" className="font-normal text-light mr-1">
              {quote.quoteName}
            </Typography>
          </>
        )}
      </td>
      <td className={classes}>
        <div className="max-w-[10rem]">
          <Select
            value={newQuoteStatus}
            onChange={handleChangeQuoteStatus}
            variant="standard"
            className="text-light opacity-70"
            menuProps={{ className: "bg-dark text-light border-dark2" }}
          >
            <Option className={quoteStatus !== "1" ? "" : "hidden"} value="1">
              Activa
            </Option>
            <Option className={quoteStatus !== "2" ? "" : "hidden"} value="2">
              En curso
            </Option>
            <Option className={quoteStatus !== "3" ? "" : "hidden"} value="3">
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
        {isEditingQuoteName ? (
          <></>
        ) : (
          <>
            <Menu>
              <MenuHandler>
                <Button
                  variant="text"
                  className="px-3 bg-transparent shadow-none hover:shadow-md hover:bg-twoHover"
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
                <MenuItem onClick={handleChangeQuoteName}>
                  Cambiar nombre
                </MenuItem>
                <MenuItem disabled>Ver Versiones</MenuItem>
                <MenuItem onClick={() => handleGenerateExcel(quote)}>
                  Descargar Excel
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteDialog}>Eliminar</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
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

UserQuoteRow.propTypes = {
  quote: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  handleAlert: PropTypes.func.isRequired,
  handleGenerateExcel: PropTypes.func.isRequired,
  handleQuoteView: PropTypes.func.isRequired,
};
