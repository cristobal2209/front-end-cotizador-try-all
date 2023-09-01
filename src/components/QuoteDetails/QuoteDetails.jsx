import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

const articleDetails = [
  {
    id: 1,
    name: "Teclado Logitech K600",
    supplier: "SPdigital",
    price: "28303",
    brand: "Logitech",
    imgUrl:
      "https://media.spdigital.cl/thumbnails/products/yc73yhu0_476525b7_thumbnail_512.jpg",
  },
  {
    id: 2,
    name: "Datacom Teclado Básico - Blanco",
    supplier: "falabella",
    price: "4990",
    brand: "Datacom",
    imgUrl:
      "https://falabella.scene7.com/is/image/Falabella/gsc_120883596_2825949_1?wid=800&hei=800&qlt=70",
  },
  {
    id: 3,
    name: "Teclado Mecánico ASUS ROG Falchion",
    supplier: "SPdigital",
    price: "171889",
    brand: "ASUS",
    imgUrl:
      "https://media.spdigital.cl/thumbnails/products/19w8fx64_4c66bb88_thumbnail_512.jpg",
  },
];

function RenderArticleDetail({ articleUnit, handleSubTotal }) {
  const [hidden, setHidden] = useState(false);
  const [contador, setContador] = useState(1);
  const [contadorAnterior, setContadorAnterior] = useState(0);
  const [subTotalArticle, setSubTotalArticle] = useState(0);

  useEffect(() => {
    setSubTotalArticle(contador * articleUnit.price);
    handleSubTotal(articleUnit.price, contador - contadorAnterior);
  }, [contador]);

  const incrementarContador = () => {
    setContadorAnterior(contador);
    setContador(contador + 1);
  };

  const decrementarContador = () => {
    if (contador > 1) {
      setContadorAnterior(contador);
      setContador(contador - 1);
    }
  };

  const handleHidden = () => {
    setHidden(true);
  };

  useEffect(() => {
    document.title= "Cotizacion|recuperarNombre|";
  }, []);

  return (
    <>
      <div className="flex flex-row items-center p-1" hidden={hidden}>
        <div className="w-1/4 ">
          <img
            src={articleUnit.imgUrl}
            alt=""
            className="max-w-[130px] object-contain p-1"
          />
        </div>
        <div className="w-1/4 ">
          <span className="block">{articleUnit.name}</span>
          <span className="block">{articleUnit.supplier}</span>
          <span className="block">{articleUnit.brand}</span>
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
        <div className="w-1/4">
          <span className=""> ${subTotalArticle.toLocaleString()}</span>
        </div>
        <div>
          <Button className=" bg-red-700" onClick={handleHidden}>
            <TrashIcon className="h-4 w-4"></TrashIcon>
          </Button>
        </div>
      </div>
    </>
  );
}

function ShowOtherArticles({ articleDetails, handleSubTotal }) {
  return (
    <div className="flex w-full max-w-5xl flex-col">
      {articleDetails.map((articleUnit) => (
        <div
          className="mt-6 w-full rounded-md bg-secondary px-2 py-2"
          key={articleUnit.id}
        >
          <RenderArticleDetail
            articleUnit={articleUnit}
            handleSubTotal={handleSubTotal}
          />
        </div>
      ))}
    </div>
  );
}

export default function QuoteDetails() {
  const [totalSubTotal, setTotalSubTotal] = useState(0);
  // el problema no es la logica, es la iniciacion de subTotalArticle pues si aumenta en 1, pero subTotalAnterior parte en 0
  // y esto provoca que se comporte como un valor positivo al realizar el primer - y ya al segundo lo reconoce como un valor negativo
  // inicializar estas al precio del articulo no es posible, no reconoce articleUnit.price ni articleDetails.price.
  // y cuando se renderiza el componente de handleSubTotal al editar el codigo, este toma el valor ultimo de articleDetails.price
  const handleSubTotal = (itemPrice, contChanged) => {
    console.log("====================================");
    console.log(itemPrice + " " + contChanged);
    console.log("====================================");
    setTotalSubTotal(
      (prevTotalSubTotal) => prevTotalSubTotal + itemPrice * contChanged
    );
  };
  useEffect(() => {
    setTotalSubTotal((prevTotalSubTotal) => {
      const newTotalSubTotal = prevTotalSubTotal / 2;
      setTotalSubTotal(prevTotalSubTotal);
      return 0;
    });
  }, []);

  return (
    <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-4 pt-20">
      {/* bg-red-200 */}
      <section className="col-span-4 flex flex-col  lg:col-span-3">
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
          <ShowOtherArticles
            articleDetails={articleDetails}
            handleSubTotal={handleSubTotal}
          />
        </div>
      </section>

      {/* mejor oferta escritorio */}
      <aside className="flex-start hidden px-10 pt-20 lg:col-span-1 lg:block ">
        <Card className="bg-secondary">
          <CardBody>
            <h1 className="text-lg font-bold text-white">
              Sub total suma articulos cotizados
            </h1>
            <br></br>
            <div className="text-lg font-bold text-white">
              ${totalSubTotal.toLocaleString()}
            </div>
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
