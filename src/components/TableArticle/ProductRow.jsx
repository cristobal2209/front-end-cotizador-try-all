import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function ProductRow({
  product,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
}) {
  const [openThreeDotsOptions, setOpenThreeDotsOptions] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  const navigate = useNavigate();

  const handleOpenThreeDotsOptions = () => {
    setOpenThreeDotsOptions(!openThreeDotsOptions);
  };

  const handleConfirm = async () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationDialogOpen(false);
  };

  return (
    <tr className="hover:bg-two">
      <td className={`${classes}`}>
        <div className="flex">
          <Typography
            variant="small"
            className="font-normal text-light mr-1 max-w-xs"
          >
            {product.description}
          </Typography>
          <div className="ml-auto">
            <img src={product.imgSrc} className="ml-1 rounded-md"></img>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="font-normal text-light opacity-70"
        >
          {product.manufacturer}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="font-normal text-light opacity-70"
        >
          {product.manufacturerPartNo}
        </Typography>
      </td>
      <td className={classes}>
        <Button className="px-3 bg-transparent shadow-none hover:bg-twoHover">
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
              onClick={handleOpenThreeDotsOptions}
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
            <MenuItem
              onClick={() => {
                navigate(`/articles/${product.id}`);
              }}
            >
              Ir a página
            </MenuItem>
            <MenuItem disabled={true}>Editar detalles</MenuItem>
            <MenuItem disabled={true}>Eliminar</MenuItem>
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
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </tr>
  );
}
