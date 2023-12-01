import { Card, CardHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function GridEnterprises() {
  const [enterprises, setEnterprises] = useState([
    {
      id: 1,
      name: "Mouser Electronics",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2Fmouser-logo.png?alt=media&token=82fd600c-e1d3-419b-9e03-e38cec63d849",
      link: "https://www.mouser.cl/",
    },
    {
      id: 2,
      name: "Altronics",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2FAltronics.png?alt=media&token=8cf510e0-edd6-4459-be5b-aeff72087079",
      link: "https://altronics.cl/",
    },
    {
      id: 3,
      name: "Newark",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2Fnewark-logo.png?alt=media&token=144e0454-62e4-42fd-b12e-01fd6455094a",
      link: "https://www.newark.com/",
    },
    {
      id: 4,
      name: "Galco",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2FGalco.png?alt=media&token=5f216424-e4c3-4358-afbd-0e53dde56128",
      link: "https://www.galco.com/",
    },
    {
      id: 5,
      name: "Roc Industrial",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2Frocindustrial.png?alt=media&token=6fcd7c06-69f6-459d-9da3-6891f237f822",
      link: "https://www.rocindustrial.com/",
    },
    {
      id: 6,
      name: "PLC Chile",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2Fplcchile.png?alt=media&token=41aa1222-9e42-4c23-97cb-37b88e318f41",
      link: "https://www.plcchile.com/",
    },
    {
      id: 7,
      name: "Ripley",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2FRipley_logo_R_pagina_web_con_fondo_2016-present.webp?alt=media&token=7122a15f-d534-4c7c-8d54-f48cf46379e4",
      link: "https://simple.ripley.cl/",
    },
    {
      id: 8,
      name: "PLC Chile",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fb-cotizaciones-try-all.appspot.com/o/SuppliersImages%2F97740859-8d6b-4562-ad02-d6fd37c14e32___bab6e437e21af76315174bd3b460d74a.svg?alt=media&token=5b2a958d-b3d1-4d76-9e5d-f08f2b8cc94a",
      link: "https://www.easy.cl/",
    },
  ]);

  return (
    <ul className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {enterprises.map((enterprise) => (
        <li key={enterprise.id}>
          <a
            href={enterprise.link}
            className="h-full w-60 text-center shadow-sm"
            target="_blank"
            rel="noreferrer"
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
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Inicio";
  }, []);

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col justify-between pt-20">
      <section className="w-full">
        <div className="p-3 text-center">
          <h1 className="text-3xl">
            ¡BIENVENIDO AL NUEVO COTIZADOR DE TRY ALL!
          </h1>
          <p className="p-3">
            En el siguiente enlace puedes aprender a ocupar esta herramienta
          </p>
        </div>
        <div className="py-10 text-center">
          <button className="rounded-md bg-two px-10 py-2 font-bold shadow-md hover:bg-twoHover">
            ¡Comencemos a aprender!
          </button>
        </div>
      </section>
      <section className="w-full py-10">
        <h1 className="mb-20 text-center text-2xl">Nuestros proveedores</h1>
        <GridEnterprises />
        <div className="pt-10 text-center">
          <button className="rounded-md bg-two px-10 py-2 font-bold shadow-md hover:bg-twoHover">
            Ver catálogo completo
          </button>
        </div>
      </section>
    </div>
  );
}
