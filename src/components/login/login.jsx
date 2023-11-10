import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  //validacion de campos del formulario Formik
  email: Yup.string()
    .email("El correo ingresado no es válido") //.email , valida una serie de instrucciones standar
    .required("El correo es un campo obligatorio"),
  //en correos electronicos en una sola validacion
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
      // Successfully signed in, you can navigate to the intended route.
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign-in error:", error.message);
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
    <main
      className=" 
      w-full  
      bg-dark"
    >
      <div
        className="
        mx-auto
        flex 
        h-full 
        flex-col 
        items-center 
        justify-center 
        px-6 
        py-8 
        md:h-screen 
        lg:py-0"
      >
        <a
          href="https://www.tryall.cl/"
          className="
          mb-6 
          flex 
          items-center 
          text-2xl 
          font-semibold 
          text-four 
          dark:text-white"
        >
          <img
            className="
            h-14 
            mr-2 
            w-40"
            src="https://lh3.googleusercontent.com/fife/APg5EOYeUKBy30dATK4r1LmzjUgsqZksMZUkuKZdG-PzmilGk6uw2F7nIASTamiScFVNVCQc6dAIl2D3ZCblGqMFV4AijethnzzYNwvurf_TCgVtR0iCt8TyIMnRSckkvhxWV3PBMKLG-08ybawCZ2OugXWhM-sa4gR2CqD2KnMuhvjjFLX3g7e2p5gSFxrXIDEQmfETtfp4nd3h_Hc--Y7ddcaZgJni-3jxKyU8jQnXiQcS1Eh5RzczuaCXINjXojA9d1jjbxyvWIpAFDad_GWGVjuzQQNbJPVczkVHxTZ25dDmIKXSGLumhtRDuklcxpgfpp3S2vgksbafKo0QnOjNvUXmUBJAE4ksWnfP8cd75JUM8DtlMCUcTqsUI7Vn1J4gmpkgKfzd66TdTM3oRlmCNuVDSH0E2C9dw1WDRVO7a51jObp2pjZ1UcDhxySSrTgeZVp9rftsVLezEuiok5cuWAxf0wlqtqj6ZhctX_y6Y9uk7o5VysuJXk-0e4-i3Jbt0QQtPK3Ws7yadKAaD4HLn2iFuqip9YG-ROQu1AuXW9UJ7AqfUkA1McG2p24TdBMy8IC57UYP9UcRDdwvIepiH4nEd46RKUpAeY0gEIulmdYoH9CY7TMWBsSzWnka4vIsLVrW9zmnQ3_87aRGnazbuvvEKmr-sna9meQesrPJuvrflja_TIkahMr28__Hu-zeqv2MK6Q5A15YdVfg0wrFId_ODQuK_FUu2gdjcpuoJTqByr-WLZbM7TqafEvhkjCkbSf-TefR-QPBGk3M1JHoGUCxHeZfQIYbvDN4fHxN5pqqjylUjWx8-aTM_vGKM2P2-eSahkYrZXlCKK2JGOzlzU3CB5cIC9Wh27Tkp9MXN5atFI-jQOKlWSRc1XJFU47phVjx6Dme6FKBDnrOTmxN4K1bhP_Z4I7jYQpAKNOizIWfngDgskxXns25tyLtJEEvF8uwWw_8clnDM4AIkmwVvfYfAe5J5ddNN2zCACmTreera7SrMvi4pqxgDHgXc6erxGiLn9BIOevcbIHTSYgO-0jRJmP3oeBK9PdFqudpmBYvPOZC8Rl4GUDRjIamGyxrrWqIFqfVAHltQDyz2Qm8HEqUuA-M1eEwHRItGah4gsYZWbwmvECGuyaKGcynJ-Rnq2nKcEoWcCtHeq4zNFMJbl0dIyKURQZMooQDiSKfqwT3sH_7mJE1WgcZzBWtxe4L4C339ijArLfbkcJTOontBEhXzv_BIF-4tPnG_RmKOVt7oInGQPiW5BddEdNLrTBL02t0Da2Pv0AXPGRb4P87doxD8dI49fZ37UXOm3TJU5y6cr8S_9xmRLgPtAPcTBBXkFjuxIGmSpkUwoWDU55WEv3OV2jSeSE9ViCfrrBYFZl5Umpj6yWLj35HFaQc6OKFSug_cGCjgRaP_ThdRGAADrJ1aOXazVJU97YDKFAV9muqlW_UPTmviqpjWB93z0o5Ly5k5LmBX_wUrHwK0zioqe0mLycsPrkKix0pS3v0XMqDgRVhyBzUaNFg6QUEZaAfEPjDzbURugVGmGX4lEi5E9VUacd7fxYIHhSFiF4c9xGoDmT7HORRjQ4YVCOodMTN8J06EYiAwdYjDMymgw=w1920-h941"
            alt="logo"
          />
          Cotizaciones
        </a>
        <div
          className="
          w-full 
          sm:max-w-md 
          md:mt-0 
          xl:p-0"
        >
          <div
            className="
            space-y-4 
            p-6 
            sm:p-8 
            md:space-y-6"
          >
            <form
              className="
              space-y-4 
              md:space-y-6"
            >
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
                    className="
                    hover:bg-one-700 
                    focus:ring-one-300 
                    dark:bg-one-600 
                    dark:hover:bg-one-700 
                    dark:focus:ring-one-800 
                    w-full 
                    rounded-lg 
                    bg-two 
                    px-5 
                    py-2.5 
                    text-center 
                    text-sm 
                    font-medium 
                    text-white 
                    focus:outline-none 
                    ocus:ring-4"
                  >
                    Ingresar
                  </Button>
                </div>
              </div>
            </form>
            <p
              className="
              text-center 
              text-sm 
              font-light 
              text-gray-500 
              dark:text-gray-400"
            >
              ¿No tienes cuenta? Contacta con un administrador de TryAll
              <br />
              <a
                href="mailto:contacto@tryall.cl?subject=Solicitud%20de%20cuenta"
                className="
                text-blue-500"
              >
                contacto@tryall.cl
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
