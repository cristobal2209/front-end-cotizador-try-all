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

export default function UserDialog({ editData, open, onClose, submitData }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    console.log(editData);
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
    submitData(formData);
    onClose(false);
  };

  return (
    <Fragment>
      <Dialog onClose={onClose} open={open}>
        <DialogHeader>Dialog</DialogHeader>
        <DialogBody divider>
          <form>
            <label>
              Nombre de usuario:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Privilegios:
              <input
                type="email"
                name="privileges"
                value={formData.privileges}
                onChange={handleChange}
              />
            </label>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCancel}>
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Actualizar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
