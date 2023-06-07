export default function Home() {
  return (
    <div className=" text-slate-50 w-full h-full">
      <section className="h-1/2">
        <div className="p-3 text-center">
          <h1 className="text-3xl">
            ¡BIENVENIDO AL NUEVO COTIZADOR DE TRY ALL!
          </h1>
          <p className="p-3">
            En el siguiente enlace puedes aprender a ocupar esta herramienta
          </p>
        </div>
        <div className="pb-10 text-center">
          <button
            className="bg-primary rounded-md p-2 px-10"
            style={{ width: "265px" }}
          >
            Comienza a aprender!
          </button>
        </div>
      </section>
      <section className="h-1/2">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-5 place-items-center">
          <div className="bg-quaternary rounded p-6 px-10">Empresa 1</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 2</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 3</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 4</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 5</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 6</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 7</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 8</div>
          <div className="bg-quaternary rounded p-6 px-10">Empresa 9</div>
        </div>
        <div className="pt-6 text-center">
          <button className="bg-primary rounded-md p-2 px-10">
            ver catalogo completo
          </button>
        </div>
      </section>
    </div>
  );
}
