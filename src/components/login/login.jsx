import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Alert, Button, Typography } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
    <main className="w-full h-screen bg-dark overflow-hidden relative">
      <div className="z-10 relative">
        <div className="mx-auto flex flex-col w-[500px] !h-1/2 items-center justify-center px-6 mt-[300px] md:h-screen lg:py-0 z-50 backdrop-blur-sm rounded-lg shadow-md">
          <a
            href="https://www.tryall.cl/"
            className="mt-10 flex items-center text-2xl font-semibold text-four dark:text-white"
          >
            <img
              className="h-14 mr-2 w-40"
              src="https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/WebAppAssets%2Flogo-try-all.png?alt=media&token=6be9ecf5-7fac-4d7b-b4f9-7a0cf814ada8"
              alt="logo"
            />
            <Typography variant="paragraph" className="font-bold">
              Cotizaciones
            </Typography>
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
                  label="Correo"
                  color="white"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                    <div className="flex flex-row items-center">
                      <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                      {formik.errors.email}
                    </div>
                  </Alert>
                )}
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
                {formik.errors.password && (
                  <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                    <div className="flex flex-row items-center">
                      <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                      {formik.errors.password}
                    </div>
                  </Alert>
                )}
                <div className="flex items-center justify-between">
                  <div className="mx-auto">
                    <Button
                      onClick={() => formik.handleSubmit()}
                      type="submit"
                      className="hover:bg-one-700 focus:ring-one-300 dark:bg-one-600 dark:hover:bg-one-700 dark:focus:ring-one-800 w-full rounded-lg bg-two px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                    >
                      Ingresar
                    </Button>
                  </div>
                </div>
              </form>
              <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes cuenta? Contacta con un administrador de TryAll
                <br />
                <a
                  href="mailto:contacto@tryall.cl?subject=Solicitud%20de%20cuenta"
                  className="text-blue-500"
                >
                  contacto@tryall.cl
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="src\assets\loginbackground.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </main>
  );
}
