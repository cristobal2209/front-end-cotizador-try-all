import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { from } from "stylis";
import { array } from "yup";

function GridSearchResults({ articleResultsCollecion }) {
  const navigate = useNavigate();

  const handleClick = (articleDataId) => {
    navigate(`/home/articles/${articleDataId}`);
  };

  useEffect(() => {
    document.title= "Resultado Busqueda";
  }, []);
  
  return (
    <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articleResultsCollecion.map((articleResult) => (
        <Card
          className="h-full w-56 cursor-pointer text-center shadow-md"
          key={articleResult.id}
          onClick={(event) => handleClick(articleResult.id)}
        >
          <CardBody className="h-32">
            <img  //src = campos usados desde coleccion firebase, article result y imgSrc
              src={articleResult.imgSrc}
              alt=""
              className="h-28 w-64 object-contain"
            />
          </CardBody>
          <CardFooter>
            <p>{articleResult.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function RenderFilters() {
  return (
    <aside className="flex-start col-span-1 flex flex-col pr-10 pt-20">
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
  );
}

export default function SearchResults() {
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articleResultsCollecion, setArticleResultsCollection] = useState([]);
  const { articleSearch } = useParams();


  useEffect(() => {
    getArticlesSearchCollection();
  }, []);

  const getArticlesSearchCollection = async () => {
    setIsLoading(true);
    const allProducts=[];
    const collectionSnapshot = collection(db,'categories'); 
    // const querySnapshot = await getDocs(
    //   collection(db, "categories")
    // );
    
    // db.collection("categories").snapshotChanges((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data()); // Para los datos dentro del doc
    //     console.log(doc.id); // Para el nombre del doc
    //   });
    // });
   
    console.log(collectionSnapshot.docs);
    setArticleResultsCollection(allProducts);
    setIsLoading(false);
  };

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

  return (
    <div className="mx-auto max-w-7xl px-5 pt-20">
      <div className="flex flex-row">
        <RenderFilters />
        <section className="grow">
          {/*INICIO mosaico de articulos Resultados busqueda*/}
          <div className="pt-20">
            {isLoading ? (
              <Spinner className="mx-auto mt-20 h-12 w-12" />
            ) : (
              <GridSearchResults
                articleResultsCollecion={articleResultsCollecion}

              />
            )}
          </div>
          {/*FIN mosaico de articulos Resultados busqueda*/}
        </section>
      </div>
      {/*INICIO Paginador*/}
      <div className="mx-auto flex flex-row pt-20">
        <Button
          variant="text"
          color="blue-gray"
          className="mx-auto flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="mx-auto h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center justify-center gap-2">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="mx-auto flex items-center gap-2"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="mx-auto h-4 w-4" />
        </Button>
      </div>
      {/*FIN Paginador*/}
    </div>
  );
}
