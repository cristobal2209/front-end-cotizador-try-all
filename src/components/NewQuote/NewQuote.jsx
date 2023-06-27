import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

const articleDetails = [
  {
    id: 1,
    name: "Raspberry Pi Pico",
    supplier: "Altronics",
    price: "16490",
    brand: "Electronica",
    link: "https://altronics.cl/raspberry-pi-pico",
    imgUrl:
      "https://altronics.cl/image/image/catalog/productos/electronica/tarjetas/raspberry-pi-pico/raspberry-pi-pico-1-500x500.jpg",
  },
  {
    id: 2,
    name: "Taladro Bauker 500w",
    supplier: "Sodimac",
    price: "66640",
    brand: "Herramientas construccion",
    link: "https://sodimac.falabella.com/sodimac-cl/product/110065245/Taladro-percutor-inalambrico-10-mm-12V-incluye-bateria./110065248?exp=sodimac",
    imgUrl:
      "https://sodimac.scene7.com/is/image/SodimacCL/596900X_00?wid=1500&hei=1500&qlt=70",
  },
  {
    id: 3,
    name: "Raspberry Pi 2 model B v1.2",
    supplier: "Newark",
    price: "27984",
    brand: "Electronica",
    link: "https://www.newark.com/raspberry-pi/rpi2-modb-v1-2/sbc-raspberry-pi-2-model-b-v1/dp/54AJ2909",
    imgUrl:
      "https://www.newark.com/productimages/standard/en_GB/2612474-40.jpg",
  },
];

export default function Article() {
  const [totalSubTotal, setTotalSubTotal] = useState(0);

  const handleTotal = (subTotalArticle, subTotalAnterior) => {
    // console.log("subtotal " + subTotalArticle);
    // console.log("subtotal anterior " + subTotalAnterior);
    subTotalArticle > subTotalAnterior
      ? setTotalSubTotal(totalSubTotal + (subTotalArticle - subTotalAnterior))
      : setTotalSubTotal(totalSubTotal - (subTotalAnterior - subTotalArticle));
  };

  function RenderArticleDetail({ articleUnit, handleTotal }) {
    const [contador, setContador] = useState(1);
    const [contadorAnterior, setContadorAnterior] = useState(0);
    const [subTotalArticle, setSubTotalArticle] = useState(0);
    const [subTotalAnterior, setSubTotalAnterior] = useState(0);

    useEffect(() => {
      console.log("subtotal " + subTotalArticle);
    }, []);

    useEffect(() => {
      console.log("contador " + contador);
      // console.log("contador anterior " + contadorAnterior);
      setSubTotalArticle(contador * articleUnit.price);
      handleTotal(subTotalArticle, subTotalAnterior);
    }, [contador]);

    useEffect(() => {
      setSubTotalAnterior(contadorAnterior * Number(articleUnit.price));
    }, [contadorAnterior]);

    const incrementarContador = () => {
      setContadorAnterior(contador);
      setContador(contador + 1);
    };

    const decrementarContador = () => {
      // console.log("subtotal " + subTotalArticle);
      // console.log("subtotal anterior" + subTotalAnterior);
      if (contador > 1) {
        setContadorAnterior(contador);
        setContador(contador - 1);
      }
    };

    return (
      <>
        <div className="flex flex-row items-center py-1">
          <div>
            <img
              src={articleUnit.imgUrl}
              alt=""
              className="max-w-[130px] object-contain px-5"
            />
          </div>

          <div className="grid w-2/4 grid-cols-1">
            <span className="">{articleUnit.name}</span>
            <span className="">{articleUnit.supplier}</span>
            <span className="">{articleUnit.brand}</span>
          </div>

          <div className="flex w-1/4 flex-row px-1 py-10">
            <Button
              className=" bg-quaternary px-2 py-2"
              onClick={decrementarContador}
            >
              -
            </Button>
            <div className="px-2 py-1">{contador}</div>
            <Button
              className=" bg-quaternary px-2 py-2"
              onClick={incrementarContador}
            >
              +
            </Button>
          </div>
          <div>
            <span className=""> ${subTotalArticle.toLocaleString()}</span>
          </div>
        </div>
      </>
    );
  }

  function ShowOtherPrices({ articleDetails, handleTotal }) {
    return (
      <div className="flex w-full max-w-5xl flex-col">
        {articleDetails.map((articleUnit) => (
          <div
            className="mt-6 w-full rounded-md bg-secondary px-2 py-2"
            key={articleUnit.id}
          >
            <RenderArticleDetail
              articleUnit={articleUnit}
              handleTotal={handleTotal}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-4 2xl:px-20">
      {/* bg-red-200 */}
      <section className="col-span-4 flex flex-col  lg:col-span-3">
        <div>
          INSERTAR FLUJO tipo "cotizaciones articulos nombreCotizacion calculo"
        </div>

        {/* mejor oferta mobile */}
        <div className=" block  p-2 px-10 lg:hidden">
          <Card className="bg-secondary">
            <CardBody>
              <h1 className="text-lg font-bold text-white">
                -sub total suma articulos cotizados-
              </h1>
            </CardBody>
            <CardFooter>
              <div>
                <Button className="bg-quaternary">Generar contización</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Detalles de la cotizacion*/}
        <div className="  px-10 py-2">
          <h1 className="pt-5 text-xl font-bold">NombreCotizacion</h1>
          <ShowOtherPrices
            articleDetails={articleDetails}
            handleTotal={handleTotal}
          />
        </div>
      </section>

      {/* mejor oferta escritorio */}
      <aside className="flex-start hidden px-10 pt-20 lg:col-span-1 lg:block ">
        <Card className="bg-secondary">
          <CardBody>
            <h1 className="text-lg font-bold text-white">
              -sub total suma articulos cotizados-
            </h1>
            <div className="text-lg font-bold text-white">{totalSubTotal}</div>
            {/* <div><span> ${totalSubTotal.toLocaleString()} </span></div> */}
          </CardBody>
          <CardFooter>
            <div>
              <Button className="bg-quaternary">Generar contización</Button>
            </div>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}
