export default function Login() {
  return (
    <main class=" bg-bgDark w-full">
      <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="https://www.tryall.cl/"
          class="mb-6 flex items-center text-2xl font-semibold text-quaternary dark:text-white"
        >
          <img
            class="mr-2 h-15 w-40"
            src="src\assets\logo-try-all.png"
            alt="logo"
            href=""
          />
          Cotizaciones
        </a>
        <div class="w-full sm:max-w-md md:mt-0 xl:p-0">
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="focus:ring-primary text-center text-white focus:border-primary-600 block w-full bg-primary rounded-lg border border-primary p-2.5 text-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Nombre de usuario"
                  required=""
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  class="text-center text-white bg-primary focus:border-primary block w-full rounded-lg p-2.5 text-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">  
              <button
                type="Ingresar"
                class="bg-secondary hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Ingresar
              </button>
              
              </div>
                <a
                  href="#"
                  class="text-white dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <p class="text-sm text-center font-light text-white dark:text-gray-400">
                ¿No posee cuenta?{" "}
                <a
                  href="#"
                  class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Contáctenos
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
