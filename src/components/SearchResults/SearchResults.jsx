import React from "react";
import { Card, CardHeader, Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const articulosRescatados = [
  {
    id: 1,
    imgUrl: "src/assets/taladroBauker1.png",
    link: "https://sodimac.falabella.com/sodimac-cl/product/110063837/Kit-taladro-percutor-electrico-10-mm-600W/110063855",
  },
  {
    id: 2,
    imgUrl: "src/assets/taladroBauker2.jpg",
    link: "https://sodimac.falabella.com/sodimac-cl/product/110065245/Taladro-percutor-inalambrico-10-mm-12V-incluye-bateria./110065248",
  },
  {
    id: 3,
    imgUrl: "src/assets/taladroBauker3.jpg",
    link: "https://sodimac.falabella.com/sodimac-cl/product/110494345/Taladro-percutor-electrico-13-mm-900W/110494350",
  },
  {
    id: 4,
    imgUrl: "src/assets/Galco.png",
    link: "https://www.galco.com/",
  },
  {
    id: 5,
    imgUrl: "src/assets/rocindustrial.png",
    link: "https://www.rocindustrial.com/",
  },
];

export default function Home() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  function GridSearchResults({ articulosRescatados }) {
    return (
      <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articulosRescatados.map((articuloRescatado) => (
          <a
            href={articuloRescatado.link}
            className="h-full w-60 text-center shadow-sm "
            key={articuloRescatado.id}
          >
            <Card className="h-full w-full">
              <CardHeader floated={false} className="mt-0 h-32 py-1">
                <img
                  src={articuloRescatado.imgUrl}
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
  return (
    <>
      <div className="grid h-full w-full grid-cols-4">
        {/*INICIO filtros*/}
        <aside className="flex-start col-span-1 flex flex-col px-5 pt-20">
          <div className=" max-w-[300px] rounded-lg bg-secondary p-4 shadow-lg">
            Precio (CLP)
            <div className="mb-5 flex">
              <div className="w-1/2 pr-2">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  type="text"
                  placeholder="Min"
                />
              </div>
              -
              <div className="w-1/2 pl-2">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  type="text"
                  placeholder="Max"
                />
              </div>
            </div>
            Stock
            <div className="mb-5 flex">
              <div className="w-1/2 pr-2">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  type="text"
                  placeholder="Min"
                />
              </div>
              -
              <div className="w-1/2 pl-2">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  type="text"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-white"
                  htmlFor="selectOption"
                ></label>
                <select
                  id="selectOption"
                  className="w-full rounded border border-gray-300 bg-primary px-4 py-2 text-gray-400"
                >
                  <option value="">Marcas</option>
                  <option value="option1">Bauker</option>
                  <option value="option2">recuperar marca 2 de DB</option>
                  <option value="option3">recuperar marca 3 de DB</option>
                </select>
              </div>
            </div>
          </div>
        </aside>
        {/*FIN filtros*/}

        {/*INICIO mosaico de articulos Resultados busqueda*/}
        <section className="col-span-3 flex flex-col">
          <div className="flex h-full flex-col justify-between">
            <section className="w-full px-5 py-10">
              <GridSearchResults articulosRescatados={articulosRescatados} />
              <div className="pt-10 text-center">
                <div className="flex items-center gap-4"></div>
              </div>
            </section>
          </div>
        </section>
        {/*FIN mosaico de articulos Resultados busqueda*/}
      </div>
      {/*INICIO Paginador*/}
      <div className="flex flex-row mx-auto">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 mx-auto"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 mx-auto" /> Previous
        </Button>
        <div className="flex items-center gap-2 justify-center">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 mx-auto"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4 mx-auto" />
        </Button>
      </div>
      {/*FIN Paginador*/}
    </>
  );
}
