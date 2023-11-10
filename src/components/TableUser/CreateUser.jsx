import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../../services/TableUserService";
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(20, "El nombre debe contener a lo mas 20 caracteres")
    .required("El nombre es un campo obligatorio")
    .matches(/^[A-Za-z\s]*$/, "El campo solo puede contener letras y espacios"),

  lastname: Yup.string()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(20, "El apellido debe contener a lo mas 20 caracteres")
    .required("El apellido es un campo obligatorio")
    .matches(/^[A-Za-z\s]*$/, "El campo solo puede contener letras y espacios"),

  email: Yup.string()
    .email("El correo ingresado no es válido")
    .required("El correo es un campo obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe contener al menos 6 caracteres")
    .max(20, "La contraseña debe contener a lo mas 20 caracteres")
    .required("La contraseña es un campo obligatorio")
    .test(
      "at-least-one-special-char",
      "La contraseña debe contener al menos un caracter especial",
      (value) => /[!@#$%^&*()_+[\]{};:'",.<>/?\\|]/.test(value)
    )
    .test(
      "at-least-one-uppercase",
      "La contraseña debe contener al menos una letra mayúscula",
      (value) => /[A-Z]/.test(value)
    )
    .test(
      "at-least-one-lowercase",
      "La contraseña debe contener al menos una letra minúscula",
      (value) => /[a-z]/.test(value)
    )
    .test(
      "at-least-one-number",
      "La contraseña debe contener al menos un número",
      (value) => /[0-9]/.test(value)
    ),
});

export default function CreateUser({
  handleSuccessAlert,
  handleFailedAlert,
  setIsCreateUserLoading,
  open,
  handler,
}) {
  const submitRegister = async (formValues) => {
    setIsCreateUserLoading(true);
    await createUser(formValues)
      .then((message) => {
        handleSuccessAlert(message);
      })
      .catch((error) => {
        handleFailedAlert(error);
      });
    setIsCreateUserLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      disabled: true,
      admin: true,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      submitRegister(formik.values);
      handler();
    },
  });

  return (
    <>
      <Dialog open={open} handler={handler} className="z-0 bg-dark3">
        <DialogHeader className="text-light">Crear nuevo usuario</DialogHeader>
        <DialogBody divider>
          <div className="py-2">
            <Input
              variant="standard"
              label="Nombre"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              color="white"
              required
            />
            {formik.errors.firstname ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                  {formik.errors.firstname}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2">
            <Input
              variant="standard"
              label="Apellido"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              color="white"
              required
            />
            {formik.errors.lastname ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                  {formik.errors.lastname}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2">
            <Input
              variant="standard"
              label="Correo"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              color="white"
              required
            />
            {formik.errors.email ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                  {formik.errors.email}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2">
            <Input
              type="password"
              variant="standard"
              label="Contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              color="white"
              required
            />
            {formik.errors.password ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                  {formik.errors.password}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="font-extralight text-xs">
            <span>
              (*) Por medidas de seguridad un nuevo usuario no contará con
              privilegios. Si desea asignar privilegios a este usuario, podrá
              hacerlo en la tabla de usuarios una vez creado.
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handler} className="mr-1">
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
