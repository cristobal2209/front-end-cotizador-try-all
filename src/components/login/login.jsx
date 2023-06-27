
import { auth } from "../../firebaseConfig"
import { signInWithEmailAndPassword } from "@firebase/auth";
import React,{ Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


export default function login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className=" w-full  bg-bgDark">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 h-full">
        <a
          href="https://www.tryall.cl/"
          className="mb-6 flex items-center text-2xl font-semibold text-quaternary dark:text-white"
        >
          <img
            className="h-15 mr-2 w-40"
            src="src\assets\logo-try-all.png"
            alt="logo"
          />
          Cotizaciones
        </a>
        <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form onSubmit={signIn} className="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:border-primary-600 text-gray block w-full rounded-lg border border-primary bg-primary p-2.5 text-center text-white focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Nombre de usuario"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="text-gray block w-full rounded-lg bg-primary p-2.5 text-center text-white focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className=" mx-auto">
                  <button
                    type="Ingresar"
                    className="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
                
            </form>
            <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
            ¿No tienes cuenta? Contacta con un administrador de TryAll contacto@tryall.cl
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};