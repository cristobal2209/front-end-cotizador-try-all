import {
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const otherEnterpricesOfers = [
  {
    id: 1,
    name: "Mouser Electronics",
    price: "$15.490",
    link: "https://www.mouser.cl/",
  },
  {
    id: 2,
    name: "Altronics",
    price: "$15.490",
    link: "https://www.altronics.cl/",
  },
  {
    id: 3,
    name: "Newark",
    price: "$15.490",
    link: "https://www.newark.com/",
  },
];

export default function Article() {
  function ListOtherEnterpricesOfers({ otherEnterpricesOfers }) {
    return (
      <div>
        {otherEnterpricesOfers.map((generateOfersOption) => (
          <Card className="mt-6 w-full">
            <CardBody className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {generateOfersOption.name}
              </Typography>
              <Typography variant="h5" color="green-light">
                {generateOfersOption.price}
              </Typography>
              <a
                className="text-center"
                href={generateOfersOption.link}
                key={generateOfersOption.id}
              >
                <Button>Agregar</Button>
              </a>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2">

          {/* inicio imagen y detalles*/}
          <div className="flex flex-row my-6">
            <div className="flex justify-start h-13 w-96">
              <img
                className="object-contain rounded-lg"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="nature image"
              />
            </div>

            <div className="mx-10 my-5">
              <section>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nihil, natus!
                </p>
                <p>
                  Porro earum architecto ducimus, ipsa quae eveniet laboriosam
                  sit hic?
                </p>
                <p>
                  Corporis architecto blanditiis qui pariatur eos ex ipsa odio
                  dolorem.
                </p>
                <p>
                  Perferendis magnam reprehenderit eius recusandae quasi vero
                  eos ipsa modi!
                </p>
                <p>
                  Dignissimos animi minima id praesentium iure similique sit
                  assumenda nam.
                </p>
              </section>
            </div>

          </div>
          {/* final imagen y detalles*/}

          {/* inicio Barra de 4 imagenes*/}
          <div className="flex flex-row justify-start h-1/5 w-1/5 items-stretch px-2">
            <img
              className="object-contain rounded-lg mx-3"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />

            <img
              className="object-contain rounded-lg mx-3"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />

            <img
              className="object-contain rounded-lg mx-3"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />

            <img
              className="object-contain rounded-lg mx-3"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
          </div>
          {/* final Barra de 4 imagenes*/}

          {/* llamada a ofertas de otras empresas*/}
          <div>
            <ListOtherEnterpricesOfers
              otherEnterpricesOfers={otherEnterpricesOfers}
            />
          </div>
        </div>

        {/* Card Mejor Oferta*/}
        <div className=" flex-start col-span-1">
          <Card className="mx-10 my-40">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Esta es la oferta mas BARATA
              </Typography>
            </CardBody>
            <CardFooter className=" justify-center">
              <div className=" justify-center">
                <Button>Añadir a cotización</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
