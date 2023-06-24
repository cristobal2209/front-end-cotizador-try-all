import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const initialValues = {
  id: 0,
  username: "",
  privileges: "",
};

export default function UserDialog({ editData, open, onClose, handleSubmitData }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleCancel = () => {
    onClose(false);
  };

  //mientras se edita el input, va actualizando el el valor del dato
  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitData(formData);
    onClose(false);
  };

  return (
    <Fragment>
      <Dialog onClose={onClose} open={open}>
        {JSON.stringify(editData) === JSON.stringify({}) ? (
          <DialogHeader>Crear un usuario</DialogHeader>
        ) : (
          <DialogHeader>Editar un usuario</DialogHeader>
        )}
        <DialogBody divider>
          <form>
            <div className="flex flex-col">
              <div>
                <label>
                  Nombre de usuario:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="ml-2 border px-2"
                  />
                </label>
              </div>
              <div>
                <label>
                  Privilegios:
                  <input
                    type="text"
                    name="privileges"
                    value={formData.privileges}
                    onChange={handleChange}
                    className="ml-2 border px-2"
                  />
                </label>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-2"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            {JSON.stringify(editData) === JSON.stringify({}) ? (
              <span>Crear</span>
            ) : (
              <span>Actualizar</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
