import { useState } from "react";

import { bool, number } from "prop-types";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Spinner,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const TEMPLATE_USER_FORM = {
  email: "",
  password: "",
  name: "",
  lastname: "",
  privileges: number,
  active: bool,
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(20, "El nombre debe contener a lo mas 20 caracteres")
    .required("El nombre es obligatorio")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "No se permiten caracteres especiales en el nombre"
    ),
  email: Yup.string(),
});

export default function CreateUser({
  openCreateUserModal,
  handleOpenCreateUserModal,
}) {
  const newUserForm = TEMPLATE_USER_FORM;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      active: false,
      privileges: 1,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      newUserForm.name = formik.values.name;
      handleOpenCreateUserModal();
    },
  });

  return (
    <Dialog open={openCreateUserModal} handler={handleOpenCreateUserModal}>
      <DialogHeader>Crear usuario</DialogHeader>
      <DialogBody divider>
        <div className="py-2">
          <Input
            variant="standard"
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="py-2">
          <Input variant="standard" label="Apellido" name="lastname" />
        </div>
        <div className="py-2">
          <Input variant="standard" label="Correo" name="email" />
        </div>
        <div className="py-2">
          <Input variant="standard" label="Contraseña" name="password" />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpenCreateUserModal}
          className="mr-1"
        >
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => formik.handleSubmit()}
        >
          <span>Crear</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
