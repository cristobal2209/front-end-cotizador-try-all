import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Spinner,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getProductsFromInput } from "../../services/SearchService";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function GridSearchResults({ products }) {
  return (
    <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((productResult, index) => (
        <a
          key={index}
          href={`${import.meta.env.VITE_HOST}/articles/${
            productResult.idProduct
          }`}
          target="_blank"
          rel="noreferrer"
          className="h-full"
        >
          <Card className="h-full mx-2 pt-10 w-48 cursor-pointer text-center shadow-md bg-dark">
            <CardHeader className="h-32">
              <img
                src={productResult.imgSrc}
                alt={productResult.description}
                className="h-28 w-64 object-contain"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="small" className="text-light">
                {productResult.description.slice(0, 30) + "..."}
              </Typography>
            </CardBody>
          </Card>
        </a>
      ))}
    </div>
  );
}

function RenderFilters() {
  return (
    <aside className="flex-start col-span-1 flex flex-col pr-10 pt-20">
      <div className=" max-w-[300px] rounded-lg bg-two p-4 shadow-lg">
        Precio (CLP)
        <div className="mb-5 flex">
          <div className="w-1/2 pr-2">
            <input
              className="w-full rounded border border-gray-300 px-4 py-2"
              type="text"
              placeholder="Min"
              disabled={true}
            />
          </div>
          -
          <div className="w-1/2 pl-2">
            <input
              className="w-full rounded border border-gray-300 px-4 py-2"
              type="text"
              placeholder="Max"
              disabled={true}
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
              disabled={true}
            />
          </div>
          -
          <div className="w-1/2 pl-2">
            <input
              className="w-full rounded border border-gray-300 px-4 py-2"
              type="text"
              placeholder="Max"
              disabled={true}
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
              className="w-full rounded border border-gray-300 bg-one px-4 py-2 text-gray-400"
              disabled={true}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { productSearchParam } = useParams();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    document.title = `Resultados de búsqueda "${productSearchParam}"`;
  }, []);

  useEffect(() => {
    result();
  }, [currentPage]);

  async function result() {
    setIsLoading(true);
    try {
      const {
        data,
        totalPages: total,
        currentPage: current,
      } = await getProductsFromInput(productSearchParam, currentPage);

      setSearchResults(data);
      setTotalPages(total);
      setCurrentPage(current);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pt-10">
      <div className="flex flex-row">
        <RenderFilters />
        <section className="grow">
          <div className="pt-20">
            {isLoading ? (
              <Spinner className="mx-auto mt-20 h-12 w-12" />
            ) : (
              <div className="pb-10">
                <GridSearchResults products={searchResults} />
                <div className="mx-auto flex pt-20">
                  <Button
                    variant="text"
                    className="mx-auto flex items-center gap-2 bg-two hover:bg-twoHover text-light"
                    onClick={handlePrevPage}
                  >
                    <ArrowLeftIcon
                      strokeWidth={2}
                      className="mx-auto h-4 w-4"
                    />{" "}
                    Anterior
                  </Button>
                  <Button
                    variant="text"
                    className="mx-auto flex items-center gap-2 bg-two hover:bg-twoHover text-light"
                    onClick={handleNextPage}
                  >
                    Siguiente
                    <ArrowRightIcon
                      strokeWidth={2}
                      className="mx-auto h-4 w-4"
                    />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
