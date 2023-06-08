import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

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

export function GridEnterprises({ enterprises }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 place-items-center max-w-6xl mx-auto">
      {enterprises.map((enterprise) => (
        <a
          href={enterprise.link}
          className="w-60 h-full text-center shadow-sm"
          key={enterprise.id}
        >
          <Card className="w-full h-full">
            <CardHeader floated={false} className="h-32">
              <img
                src={enterprise.imgUrl}
                alt=""
                className="object-contain w-64 h-32"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {enterprise.name}
              </Typography>
            </CardBody>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="py-10 h-1/2 w-full">
        <div className="p-3 text-center">
          <h1 className="text-3xl">
            ¡BIENVENIDO AL NUEVO COTIZADOR DE TRY ALL!
          </h1>
          <p className="p-3">
            En el siguiente enlace puedes aprender a ocupar esta herramienta
          </p>
        </div>
        <div className="py-10 text-center">
          <button className="bg-secondary rounded-md py-2 px-10 font-bold shadow-md">
            ¡Comencemos a aprender!
          </button>
        </div>
      </section>
      <section className="py-10 h-1/2 w-full">
        <h1 className="text-2xl text-center py-5">Nuestros proveedores</h1>
        <GridEnterprises enterprises={enterprises} />
        <div className="pt-10 text-center">
          <button className="bg-secondary rounded-md py-2 px-10 font-bold shadow-md">
            Ver catálogo completo
          </button>
        </div>
      </section>
    </>
  );
}
