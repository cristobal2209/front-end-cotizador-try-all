import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const validationSchema = Yup.object().shape({
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

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function signIn({ email, password }) {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate(from, { replace: true });
    } catch (error) {
      if (error.message.includes("auth/user-not-found")) {
        setError(
          "El usuario con el correo electrónico proporcionado no existe."
        );
      }
      if (error.message.includes("auth/wrong-password")) {
        setError("La contraseña ingresada es incorrecta.");
      } else {
        setError("Ocurrió un error durante el inicio de sesión.");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      signIn(formik.values);
    },
  });

  return (
    <main className="w-full bg-dark">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="http://localhost:4000"
          className="mb-6 flex items-center text-2xl font-semibold text-four dark:text-white"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/WebAppAssets%2Flogo-quoteMaster.png?alt=media&token=de165a41-8553-420b-b6d1-1f0b1b978f0c"
            className="h-32"
            alt="logo"
          />
        </a>
        <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form className="space-y-4 md:space-y-6">
              {error && (
                <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                  <div className="flex flex-row items-center">
                    <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                    {error}
                  </div>
                </Alert>
              )}
              <Input
                type="email"
                name="email"
                id="email"
                label="Nombre de usuario"
                color="white"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                  <div className="flex flex-row items-center">
                    <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                    {formik.errors.email}
                  </div>
                </Alert>
              ) : null}
              <Input
                type="password"
                name="password"
                id="password"
                label="Contraseña"
                color="white"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                  <div className="flex flex-row items-center">
                    <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                    {formik.errors.password}
                  </div>
                </Alert>
              ) : null}
              <div className="flex items-center justify-between">
                <div className=" mx-auto">
                  <Button
                    onClick={() => formik.handleSubmit()}
                    type="submit"
                    className="hover:bg-twoHover w-full rounded-lg bg-two px-5 py-2.5 text-center text-sm font-medium text-white "
                  >
                    Ingresar
                  </Button>
                </div>
              </div>
            </form>
            <p className="text-center text-sm font-light text-gray-500 ">
              ¿No tienes cuenta? Registrate aquí
              <br />
              <a className="text-blue-500">Registrarse</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
