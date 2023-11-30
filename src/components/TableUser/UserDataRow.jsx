import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  changeUserStatus,
  updateUserData,
  deleteUser,
} from "../../services/TableUserService.js";

export default function UserDataRow({
  user,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
}) {
  const [userIsDisabled, setUserIsDisabled] = useState(user?.disabled);
  const [isOpenChangeUserStateDialog, setIsOpenChangeUserStateDialog] =
    useState(false);
  const [isOpenDeleteUserDialog, setIsOpenDeleteUserDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDisplayNameHovered, setIsDisplayNameHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleConfirmChangeUserStatus = () => {
    setUserIsDisabled(!userIsDisabled);
    changeUserStatus(!userIsDisabled, user?.uid)
      .then((data) => {
        handleSuccessAlert(data);
      })
      .catch((error) => {
        handleFailedAlert(error);
      });
    handleChangeUserStatusDialog();
  };

  const handleConfirmUpdateUserData = (userData) => {
    setIsLoadingUpdate(true);
    updateUserData(user?.uid, userData)
      .then((data) => {
        setIsLoadingUpdate(false);
        setIsEditing(false);
        handleSuccessAlert(data);
      })
      .catch((error) => {
        setIsLoadingUpdate(false);
        handleFailedAlert(error);
      });
  };

  const handleChangeUserStatusDialog = () => {
    setIsOpenChangeUserStateDialog(!isOpenChangeUserStateDialog);
  };

  const handleDeleteUserDialog = () => {
    setIsOpenDeleteUserDialog(!isOpenDeleteUserDialog);
  };

  const handleConfirmDeleteUser = () => {
    setIsLoadingDelete(true);
    deleteUser(user?.uid)
      .then((data) => {
        setIsLoadingDelete(false);
        handleSuccessAlert(data);
      })
      .catch((error) => {
        handleFailedAlert(error);
      });
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(6, "El nombre debe contener al menos 6 caracteres")
      .max(40, "El nombre debe contener a lo mas 40 caracteres")
      .required("El nombre es un campo obligatorio")
      .matches(
        /^[A-Za-z\s]*$/,
        "El campo solo puede contener letras y espacios"
      ),

    email: Yup.string()
      .email("El correo ingresado no es válido")
      .required("El correo es un campo obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      displayName: user?.displayName,
      admin: user?.customClaims?.admin,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      handleConfirmUpdateUserData(formik.values);
    },
  });

  return (
    <tr className="hover:bg-two">
      <td className={classes}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="displayName"
              placeholder="Nombre"
              label="displayName"
              value={formik.values.displayName}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onMouseEnter={() => setIsDisplayNameHovered(true)}
              onMouseLeave={() => setIsDisplayNameHovered(false)}
              className={`rounded-md px-2 py-1 w-full text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
                formik.errors.displayName
                  ? " border-red-500 animate-pulse"
                  : "border-gray-700"
              }`}
            />
            {formik.errors.displayName && isDisplayNameHovered && (
              <Alert className="absolute mt-[5px] bg-red-500 max-w-xs z-50">
                {formik.errors.displayName}
              </Alert>
            )}
          </>
        ) : (
          <>
            <Typography variant="small" className="font-normal text-light">
              {formik.values.displayName}
            </Typography>
          </>
        )}
      </td>
      <td className={classes}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="email"
              placeholder="Correo"
              label="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onMouseEnter={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
              className={`rounded-md px-2 py-1 w-full text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
                formik.errors.email
                  ? " border-red-500 animate-pulse"
                  : "border-gray-700"
              }`}
            />
            {formik.errors.email && isEmailHovered && (
              <Alert className="absolute mt-[5px] bg-red-500 max-w-xs z-50">
                {formik.errors.email}
              </Alert>
            )}
          </>
        ) : (
          <>
            <Typography variant="small" className="font-normal text-light">
              {formik.values.email}
            </Typography>
          </>
        )}
      </td>
      <td className={classes}>
        {isEditing ? (
          <>
            <select
              name="admin"
              label="Seleccionar privilegios"
              value={formik.values.admin}
              className={`mr-1 rounded-md px-2 py-1 w-full text-light bg-dark2 font-sans text-[14px] shadow-md border-2`}
              onChange={(e) => {
                formik.handleChange(e);
                const isAdmin = JSON.parse(e.target.value);
                formik.setFieldValue("admin", isAdmin);
              }}
            >
              <option
                value={true}
                key="admin"
                className={`text-light px-2 py-1 ${
                  formik.values.admin ? "hidden" : ""
                }`}
              >
                Administrador
              </option>
              <option
                value={false}
                key="user"
                className={` text-light px-2 py-1 ${
                  formik.values.admin ? "" : "hidden"
                }`}
              >
                Usuario
              </option>
            </select>
          </>
        ) : (
          <>
            <Typography variant="small" className="font-normal text-light">
              {user?.customClaims?.admin ? "Administrador" : "Usuario"}
            </Typography>
          </>
        )}
      </td>
      <td className={classes}>
        <Switch
          checked={!userIsDisabled}
          color="green"
          onChange={() => handleChangeUserStatusDialog()}
        />
      </td>
      <td className={classes}>
        {isEditing ? (
          <>
            {isLoadingUpdate ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  color="green"
                  className="rounded w-[32px] h-[32px] px-2 mx-1"
                  disabled={formik.errors.email || formik.errors.displayName}
                  onClick={(e) => {
                    formik.handleSubmit(e);
                  }}
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
                  color="red"
                  className="rounded w-[32px] h-[32px] px-2 mx-1"
                  onClick={() => {
                    setIsEditing(false);
                    formik.setFieldValue("admin", user.customClaims.admin);
                    formik.setFieldValue("email", user.email);
                    formik.setFieldValue("displayName", user.displayName);
                  }}
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
            )}
          </>
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
                <MenuItem
                  onClick={() => {
                    handleIsEditing();
                  }}
                >
                  Editar
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeleteUserDialog();
                  }}
                >
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </td>
      <Dialog
        open={isOpenChangeUserStateDialog}
        handler={handleChangeUserStatusDialog}
        size="md"
        className="bg-dark "
      >
        <DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mr-2 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <Typography variant="h5" className="text-light">
            Confirmar {userIsDisabled ? "habilitar" : "deshabilitar"} usuario
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Typography variant="small" className="text-light">
            ¿Está seguro en
            <span className="font-bold">
              &nbsp;{userIsDisabled ? "habilitar" : "deshabilitar"}&nbsp;
            </span>
            el usuario <span className="font-bold">{user?.email}</span>?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleChangeUserStatusDialog}
            className="mr-1"
          >
            Cancelar
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmChangeUserStatus}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        open={isOpenDeleteUserDialog}
        handler={handleDeleteUserDialog}
        size="md"
        className="bg-dark "
      >
        <DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mr-2 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <Typography variant="h5" className="text-light">
            Confirmar eliminar usuario
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Typography variant="small" className="text-light text-center">
            ¿Está seguro en eliminar el usuario &nbsp;
            <span className="font-bold">
              {user?.email} - {user?.displayName}
            </span>
            ?
          </Typography>
          <Typography
            variant="paragraph"
            className="text-light opacity-70 text-center"
          >
            Esta acción es irreversible
          </Typography>
        </DialogBody>
        <DialogFooter>
          {isLoadingDelete ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <Button
                variant="text"
                color="red"
                onClick={handleDeleteUserDialog}
                className="mr-1"
              >
                Cancelar
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleConfirmDeleteUser}
              >
                Confirmar
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </tr>
  );
}
UserDataRow.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    customClaims: PropTypes.shape({
      admin: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
  }),
  classes: PropTypes.string,
  handleSuccessAlert: PropTypes.func,
  handleFailedAlert: PropTypes.func,
};
