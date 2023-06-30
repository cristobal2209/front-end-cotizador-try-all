import { Card, CardHeader } from "@material-tailwind/react";

const enterprises = [
  {
    id: 1,
    name: "Mouser Electronics",
    imgUrl: "src/assets/mouser-logo.png",
    link: "https://www.mouser.cl/",
  },
  {
    id: 2,
    name: "Altronics",
    imgUrl: "src/assets/Altronics.png",
    link: "https://www.altronics.cl/",
  },
  {
    id: 3,
    name: "Newark",
    imgUrl: "src/assets/newark-logo.png",
    link: "https://www.newark.com/",
  },
  {
    id: 4,
    name: "Galco",
    imgUrl: "src/assets/Galco.png",
    link: "https://www.galco.com/",
  },
  {
    id: 5,
    name: "Roc Industrial",
    imgUrl: "src/assets/rocindustrial.png",
    link: "https://www.rocindustrial.com/",
  },
  {
    id: 6,
    name: "PLC Chile",
    imgUrl: "src/assets/plcchile.png",
    link: "https://www.plcchile.com/",
  },
];

function GridEnterprises({ enterprises }) {
  return (
    <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {enterprises.map((enterprise) => (
        <a
          href={enterprise.link}
          className="h-full w-60 text-center shadow-sm "
          key={enterprise.id}
        >
          <Card className="h-full w-full">
            <CardHeader floated={false} className="mt-0 h-32 py-1">
              <img
                src={enterprise.imgUrl}
                alt=""
                className="h-28 w-64 object-contain"
              />
            </CardHeader>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex h-full max-w-7xl flex-col justify-between mx-auto">
      <section className="w-full pt-20">
        <div className="p-3 text-center">
          <h1 className="text-3xl">
            ¡BIENVENIDO AL NUEVO COTIZADOR DE TRY ALL!
          </h1>
          <p className="p-3">
            En el siguiente enlace puedes aprender a ocupar esta herramienta
          </p>
        </div>
        <div className="py-10 text-center">
          <button className="rounded-md bg-secondary px-10 py-2 font-bold shadow-md hover:bg-secondaryHover">
            ¡Comencemos a aprender!
          </button>
        </div>
      </section>
      <section className="w-full py-10">
        <h1 className="mb-20 text-center text-2xl">Nuestros proveedores</h1>
        <GridEnterprises enterprises={enterprises} />
        <div className="pt-10 text-center">
          <button className="rounded-md bg-secondary px-10 py-2 font-bold shadow-md hover:bg-secondaryHover">
            Ver catálogo completo
          </button>
        </div>
      </section>
    </div>
  );
}
