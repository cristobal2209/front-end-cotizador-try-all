import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        navigate("/home");
        // console.log(user);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  return (
    <main className=" w-full  bg-bgDark">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="https://www.tryall.cl/"
          className="mb-6 flex items-center text-2xl font-semibold text-quaternary dark:text-white"
        >
          <img
            className="h-15 mr-2 w-40"
            src="https://lh3.googleusercontent.com/fife/APg5EOYeUKBy30dATK4r1LmzjUgsqZksMZUkuKZdG-PzmilGk6uw2F7nIASTamiScFVNVCQc6dAIl2D3ZCblGqMFV4AijethnzzYNwvurf_TCgVtR0iCt8TyIMnRSckkvhxWV3PBMKLG-08ybawCZ2OugXWhM-sa4gR2CqD2KnMuhvjjFLX3g7e2p5gSFxrXIDEQmfETtfp4nd3h_Hc--Y7ddcaZgJni-3jxKyU8jQnXiQcS1Eh5RzczuaCXINjXojA9d1jjbxyvWIpAFDad_GWGVjuzQQNbJPVczkVHxTZ25dDmIKXSGLumhtRDuklcxpgfpp3S2vgksbafKo0QnOjNvUXmUBJAE4ksWnfP8cd75JUM8DtlMCUcTqsUI7Vn1J4gmpkgKfzd66TdTM3oRlmCNuVDSH0E2C9dw1WDRVO7a51jObp2pjZ1UcDhxySSrTgeZVp9rftsVLezEuiok5cuWAxf0wlqtqj6ZhctX_y6Y9uk7o5VysuJXk-0e4-i3Jbt0QQtPK3Ws7yadKAaD4HLn2iFuqip9YG-ROQu1AuXW9UJ7AqfUkA1McG2p24TdBMy8IC57UYP9UcRDdwvIepiH4nEd46RKUpAeY0gEIulmdYoH9CY7TMWBsSzWnka4vIsLVrW9zmnQ3_87aRGnazbuvvEKmr-sna9meQesrPJuvrflja_TIkahMr28__Hu-zeqv2MK6Q5A15YdVfg0wrFId_ODQuK_FUu2gdjcpuoJTqByr-WLZbM7TqafEvhkjCkbSf-TefR-QPBGk3M1JHoGUCxHeZfQIYbvDN4fHxN5pqqjylUjWx8-aTM_vGKM2P2-eSahkYrZXlCKK2JGOzlzU3CB5cIC9Wh27Tkp9MXN5atFI-jQOKlWSRc1XJFU47phVjx6Dme6FKBDnrOTmxN4K1bhP_Z4I7jYQpAKNOizIWfngDgskxXns25tyLtJEEvF8uwWw_8clnDM4AIkmwVvfYfAe5J5ddNN2zCACmTreera7SrMvi4pqxgDHgXc6erxGiLn9BIOevcbIHTSYgO-0jRJmP3oeBK9PdFqudpmBYvPOZC8Rl4GUDRjIamGyxrrWqIFqfVAHltQDyz2Qm8HEqUuA-M1eEwHRItGah4gsYZWbwmvECGuyaKGcynJ-Rnq2nKcEoWcCtHeq4zNFMJbl0dIyKURQZMooQDiSKfqwT3sH_7mJE1WgcZzBWtxe4L4C339ijArLfbkcJTOontBEhXzv_BIF-4tPnG_RmKOVt7oInGQPiW5BddEdNLrTBL02t0Da2Pv0AXPGRb4P87doxD8dI49fZ37UXOm3TJU5y6cr8S_9xmRLgPtAPcTBBXkFjuxIGmSpkUwoWDU55WEv3OV2jSeSE9ViCfrrBYFZl5Umpj6yWLj35HFaQc6OKFSug_cGCjgRaP_ThdRGAADrJ1aOXazVJU97YDKFAV9muqlW_UPTmviqpjWB93z0o5Ly5k5LmBX_wUrHwK0zioqe0mLycsPrkKix0pS3v0XMqDgRVhyBzUaNFg6QUEZaAfEPjDzbURugVGmGX4lEi5E9VUacd7fxYIHhSFiF4c9xGoDmT7HORRjQ4YVCOodMTN8J06EYiAwdYjDMymgw=w1920-h941"
            alt="logo"
          />
          Cotizaciones
        </a>
        <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form className="space-y-4 md:space-y-6">
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
                    onClick={signIn}
                    type="submit"
                    className="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
              ¿No tienes cuenta? Contacta con un administrador de TryAll
              contacto@tryall.cl
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
