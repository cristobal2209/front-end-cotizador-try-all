import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const validationSchema = Yup.object().shape({
  //validacion de campos del formulario Formik
  name: Yup.string()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(20, "El nombre debe contener a lo mas 20 caracteres")
    .required("El nombre es un campo obligatorio")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "No se permiten caracteres especiales en el nombre"
    ),

  email: Yup.string()
    .email("El correo ingresado no es válido") //.email , valida una serie de instrucciones standar
    .required("El correo es un campo obligatorio"),
  //en correos electronicos en una sola validacion
  password: Yup.string()
    .min(5, "La contraseña debe contener al menos 5 caracteres")
    .max(20, "La contraseña debe contener a lo mas 20 caracteres")
    .required("La contraseña es un campo obligatorio")
    .uppercase("Se necesita al menos una letra MAYUSCULA")
    .lowercase("Se necesita al menos una letra minúscula"),

  // un caracter especial, un numero

  lastname: Yup.string()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(20, "El apellido debe contener a lo mas 20 caracteres")
    .required("El apellido es un campo obligatorio")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "No se permiten caracteres especiales en el apellido"
    ),
});

export default function CreateUser({
  handleSuccessAlert,
  handleFailedAlert,
  setIsCreateUserLoading,
  openCreateUserModal,
  handleOpenCreateUserModal,
}) {
  const userRegister = async (formValues) => {
    setIsCreateUserLoading(true);
    try {
      const response = await axios.post("/api/createUser", formValues);
      handleSuccessAlert(response.data);
      // console.log(response.data);
    } catch (error) {
      handleFailedAlert(error);
      // console.log(error);
    }
    setIsCreateUserLoading(false);
  };

  const formik = useFormik({
    //Creacion de un estandar de formularios
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      active: false, //  active, se inicializa en falso para su posterior activacion manual luego de la correcta creacion
      privileges: 1, // al no poseer un input por parte del usuario, estos campos no se reflejan o validan con la libreria YUP
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      userRegister(formik.values);
      // console.log(auth.currentUser.uid);
      handleOpenCreateUserModal();
    },
  });

  return (
    <>
      <Dialog
        open={openCreateUserModal}
        handler={handleOpenCreateUserModal}
        className="z-0"
      >
        <DialogHeader>Crear usuario</DialogHeader>
        <DialogBody divider>
          <div className="py-2">
            <Input
              variant="standard"
              label="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Input
              variant="standard"
              label="Apellido"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Input
              variant="standard"
              label="Correo"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Input
              variant="standard"
              label="Contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
            />
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
    </>
  );
}
