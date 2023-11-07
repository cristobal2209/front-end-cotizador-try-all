import { useState, useEffect } from "react";
import {
  getNextProductsCollection,
  countProducts,
} from "../../services/TableProductService";
import ProductRow from "./ProductRow";
import AlertFailed from "./AlertFailed";
import AlertSuccess from "./AlertSuccess";
import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//pagination
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  "Producto",
  "Fabricante",
  "N° Parte fabricante",
  "Proveedores",
  "Opciones",
];

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [ProductsCollection, setProductsCollection] = useState([]);
  const [alertData, setAlertData] = useState();
  const [contador, setContador] = useState(0);
  const [nextDocRef, setNextDocRef] = useState(null);
  const [prevDocRef, setPrevDocRef] = useState(null);
  const [showedProductsQuantity, setShowedProductsQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Tabla gestión de productos";
    getNextProducts();
    getCountProducts();
  }, []);

  useEffect(() => {
    setContador(contador + 1);
  }, [ProductsCollection]);

  const getCountProducts = async () => {
    setTotalItems(await countProducts());
  };

  const getNextProducts = async () => {
    const { data, firstVisible, lastVisible } =
      await getNextProductsCollection(nextDocRef);
    setProductsCollection(data);
    setNextDocRef(lastVisible);
    setPrevDocRef(firstVisible);
    setShowedProductsQuantity(showedProductsQuantity + itemsPerPage);
  };

  const getPrevProducts = async () => {
    const { data, firstVisible, lastVisible } =
      await getNextProductsCollection(prevDocRef);
    setProductsCollection(data);
    setNextDocRef(lastVisible);
    setPrevDocRef(firstVisible);
    setShowedProductsQuantity(showedProductsQuantity - itemsPerPage);
  };

  const handleOpenAlertSuccess = (boolean) => {
    setOpenAlertSuccess(boolean);
    setTimeout(() => {
      setOpenAlertSuccess(false);
    }, 5000);
  };

  const handleOpenAlertFailed = (boolean) => {
    setOpenAlertFailed(boolean);
    setTimeout(() => {
      setOpenAlertFailed(false);
    }, 5000);
  };

  //message se ocupa para mostrar alertas personalizadas
  const handleSuccessAlert = (message) => {
    //getUserQuotes();
    setAlertData(message);
    handleOpenAlertSuccess(true);
  };

  //error se ocupa para mostrar el error al usuario
  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed(true);
  };

  const handleCreateProduct = () => {};

  return (
    <>
      <div className="mx-[10px] pb-[10px]">
        <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3  shadow-2xl">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-dark3 border-b border-light-50 mx-0"
          >
            <div className="mb-4 px-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" className="text-light">
                  Tabla de productos
                </Typography>
                <Typography className="mt-1 font-normal text-light opacity-70">
                  Productos ingresados en sistema.
                </Typography>
                <Typography className="mt-1 font-normal text-light opacity-70">
                  Mostrando {showedProductsQuantity} de {totalItems} productos.
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full">
                  <div className="flex flex-row">
                    <Input
                      label="Buscar producto"
                      icon={
                        <MagnifyingGlassIcon className="h-5 w-5 text-dark" />
                      }
                      disabled={true}
                    />
                    <Button
                      className=" bg-three hover:bg-threeHover ml-2 !w-max"
                      size="sm"
                      onClick={() => {
                        handleCreateProduct();
                      }}
                    >
                      Crear producto
                    </Button>
                  </div>

                  <AlertSuccess
                    open={openAlertSuccess}
                    handler={handleOpenAlertSuccess}
                    data={alertData}
                  />
                  <AlertFailed
                    open={openAlertFailed}
                    handler={handleOpenAlertFailed}
                    error={alertData}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody
            className={`overflow-x-auto p-0 ${
              ProductsCollection?.length === 0 ? "h-20" : "h-[600px]"
            }`}
          >
            {isLoadingTable ? (
              <tr>
                <td>
                  <div>
                    <Spinner className="h-12 w-12" />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {ProductsCollection?.length === 0 ? (
                  <>
                    <Typography className="w-full text-center font-bold text-light">
                      No existen productos en el sistema.
                    </Typography>
                  </>
                ) : (
                  <>
                    <table className="w-full min-w-max table-auto text-left">
                      <thead className="">
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-light bg-dark p-4 border-opacity-50"
                            >
                              <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ProductsCollection?.map((product, index) => {
                          const classes = "p-4 border-y border-blue-gray-100";

                          return (
                            <ProductRow
                              product={product}
                              classes={classes}
                              key={index}
                              handleSuccessAlert={handleSuccessAlert}
                              handleFailedAlert={handleFailedAlert}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </CardBody>
          <CardFooter
            className={` flex items-center justify-between border-t border-light-50 p-4 ${
              ProductsCollection?.length === 0 ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className={`flex items-center gap-2 bg-two hover:bg-twoHover text-light `}
                onClick={getPrevProducts}
                disabled={showedProductsQuantity === itemsPerPage}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                <span className="hidden sm:block">Anterior</span>
              </Button>
              <Button
                variant="text"
                className="flex items-center gap-2 bg-two hover:bg-twoHover text-light"
                onClick={getNextProducts}
              >
                <span className="hidden sm:block">Siguiente</span>

                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
