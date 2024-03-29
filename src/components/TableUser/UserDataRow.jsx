import { useState } from "react";
import {
  Button,
  Typography,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

import { changeUserStatus } from "../../services/TableUserService.js";

export default function UserDataRow({
  user,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
}) {
  const [userIsDisabled, setUserIsDisabled] = useState(user?.disabled);
  const [isOpenChangeUserStateDialog, setIsOpenChangeUserStateDialog] =
    useState(false);

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

  const handleChangeUserStatusDialog = () => {
    setIsOpenChangeUserStateDialog(!isOpenChangeUserStateDialog);
  };

  return (
    <tr className="hover:bg-two">
      <td className={classes}>
        <Typography variant="small" className="font-normal text-light">
          {user?.displayName}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-light">
          {user?.email}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-light">
          {user?.customClaims?.admin ? "Admin" : "Usuario"}
        </Typography>
      </td>
      <td className={classes}>
        <Switch
          checked={!userIsDisabled}
          color="green"
          onChange={() => handleChangeUserStatusDialog()}
        />
      </td>
      <td className={classes}>
        <Button variant="text" className="hover:bg-twoHover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Button>
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
            className="w-6 h-6 mr-2 text-light"
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
