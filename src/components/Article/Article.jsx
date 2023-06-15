import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const articleDetails = {
  articleId: 1,
  articleCategory: "herramientas",
  articleBrand: "Bauker",
  articleName: "Taladro Bauker 500W",
  articleDescription:
    "Un taladro muy bonito Assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
  articleProviderCountry: "Chile",
};

const articleImgs = [
  {
    id: 1,
    imgUrl:
      "https://sodimac.scene7.com/is/image/SodimacCL/596900X_27?wid=1500&hei=1500&qlt=70",
  },
  {
    id: 2,
    imgUrl:
      "https://sodimac.scene7.com/is/image/SodimacCL/596900X_12?wid=1500&hei=1500&qlt=70",
  },
  {
    id: 3,
    imgUrl:
      "https://sodimac.scene7.com/is/image/SodimacCL/596900X_13?wid=1500&hei=1500&qlt=70",
  },
  {
    id: 4,
    imgUrl:
      "https://sodimac.scene7.com/is/image/SodimacCL/596900X_17?wid=1500&hei=1500&qlt=70",
  },
];

const articleProviders = [
  {
    id: 1,
    name: "Mouser Electronics",
    price: "$16490",
    link: "https://www.mouser.cl/",
  },
  {
    id: 2,
    name: "Altronics",
    price: "$18490",
    link: "https://www.altronics.cl/",
  },
  {
    id: 3,
    name: "Newark",
    price: "$15490",
    link: "https://www.newark.com/",
  },
];

export default function Article() {
  function ShowOtherImgs({ articleImgs }) {
    return (
      <div className="flex w-full flex-row px-8">
        {articleImgs.map((articleImg) => (
          <div className="" key={articleImg.id}>
            <img
              src={articleImg.imgUrl}
              alt=""
              className="h-28 max-w-[180px] object-contain px-5"
            />
          </div>
        ))}
      </div>
    );
  }

  function ShowOtherPrices({ articleProviders }) {
    return (
      <div className="flex w-full max-w-5xl flex-col justify-between">
        {articleProviders.map((priceOption) => (
          <div
            className="mt-6 w-full rounded-md bg-secondary px-2 py-2"
            key={priceOption.id}
          >
            <div className="flex flex-row items-center justify-between">
              <span className="w-2/5">{priceOption.name}</span>
              <span className="w-2/5">{priceOption.price}</span>
              <Button className="w-1/5">Agregar a cotizacion</Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid h-full w-full grid-cols-4">
      {/* bg-red-200 */}
      <section className="col-span-4 flex flex-col  lg:col-span-3">
        {/* inicio imagen y detalles*/}
        {/* bg-red-400 */}
        <div className="flex flex-row items-center justify-start ">
          {/* imagen principal articulo */}
          <div className="flex-row flex w-1/3 justify-start">
            <div>
              <img
                className="mx-auto max-h-[520px] w-full object-contain p-10"
                src="https://sodimac.scene7.com/is/image/SodimacCL/596900X_00?wid=1500&hei=1500&qlt=70"
                alt="nature image"
              />
            </div>
          </div>
          {/* detalles articulos */}
          <div className="flex w-2/3 flex-col px-2">
            <h1 className="mb-3 text-2xl font-bold">
              {articleDetails.articleName}
            </h1>
            <div className="flex flex-col pl-5">
              <div className="pb-3 text-xl font-bold">
                Detalles del articulo
                <div className="text-base font-normal">
                  <p>Categoria: {articleDetails.articleCategory}</p>
                  <p>Marca: {articleDetails.articleBrand}</p>
                </div>
              </div>
              <div className=" container pb-3 text-xl font-bold">
                Descripcion del articulo
                <div className="text-base font-normal">
                  {articleDetails.articleDescription}
                </div>
              </div>
              <div className="pb-1 text-xl font-bold ">
                Pais de procedencia
                <div className="text-base font-normal">
                  <p>{articleDetails.articleProviderCountry}</p>
                </div>
              </div>
            </div>
            {/* <h2 className="text-xl font-bold">Detalles del articulo</h2>
            <p></p>
            <h2 className="text-xl font-bold">Descripcion del articulo</h2>
            <p>{articleDetails.articleDescription}</p>
            <p>Pais de procedencia: {articleDetails.articleProviderCountry}</p> */}
          </div>
        </div>
        {/* inicio Barra de 4 imagenes*/}
        {/* bg-red-300 */}
        <div className="  px-2 py-5">
          <ShowOtherImgs articleImgs={articleImgs} />
        </div>
        {/* mejor oferta mobile */}
        {/* bg-blue-600 */}
        <div className=" block  p-2 px-10 lg:hidden">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Esta es la oferta mas BARATA
              </Typography>
            </CardBody>
            <CardFooter>
              <div className="right-0">
                <Button>Añadir a cotización</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        {/* llamada a ofertas de otras empresas*/}
        {/* bg-red-700 */}
        <div className="  px-10 py-2">
          <ShowOtherPrices articleProviders={articleProviders} />
        </div>
      </section>
      {/* mejor oferta escritorio */}
      {/* bg-blue-600 */}
      <aside className="flex-start hidden px-2 pt-20 lg:col-span-1 lg:block">
        <Card className="">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Esta es la oferta mas BARATA
            </Typography>
          </CardBody>
          <CardFooter>
            <div>
              <Button>Añadir a cotización</Button>
            </div>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}
