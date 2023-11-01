import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { db } from "../../firebaseConfig";
import { getProductData } from "../../services/ProductService";

const TABLE_HEAD = [
  "Proveedor",
  "Precios por cantidad",
  "Stock",
  "Añadir a cotizacion",
];

export default function Article() {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [supplierCollection, setSupplierCollection] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  // useEffect(() => {
  //   console.log(productData);
  // }, [productData]);

  const getProduct = async () => {
    setIsLoading(true);
    const productDataFetch = await getProductData(productId);
    setProductData(productDataFetch);
    setSupplierCollection(productDataFetch.suppliers);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto h-full max-w-5xl pt-20">
      {isLoading ? (
        <Spinner className="mx-auto mt-20 h-12 w-12" />
      ) : (
        <section className="flex flex-col">
          {/* inicio imagen y detalles*/}
          <div className="flex flex-row justify-start ">
            {/* imagen principal articulo */}
            <div className="w-1/2  flex justify-start">
              <img
                className="mx-auto max-w-lg object-contain px-10"
                src={productData.imgSrc}
              />
            </div>
            {/* detalles articulos */}
            <div className="flex w-1/2 flex-col p-2 bg-dark3 rounded-md shadow-md">
              <div className="flex flex-col px-5">
                <div className="pb-3">
                  <Typography variant="h5">Detalles del producto</Typography>
                  <div className="flex justify-between">
                    <Typography variant="small" className="opacity-70">
                      Categoria :
                    </Typography>
                    <Typography variant="small">
                      {productData.productCategory}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="small" className="opacity-70">
                      Marca :
                    </Typography>
                    <Typography variant="small">
                      {productData.manufacturer}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="small" className="opacity-70">
                      N° parte fabricante :
                    </Typography>
                    <Typography variant="small">
                      {productData.manufacturerPartNo}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="small" className="opacity-70">
                      En empaque :
                    </Typography>
                    <Typography variant="small">
                      {productData.priceFor}
                    </Typography>
                  </div>
                </div>
                <div className="pb-3">
                  <Typography variant="h5">Descripción</Typography>
                  <Typography variant="small" className="opacity-70">
                    {productData.description}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="  px-2 py-5">
            {/* <ShowOtherImgs articleImgs={articleImgs} /> */}
          </div>
          {/* llamada a ofertas de otras empresas*/}
          <div className="rounded-md bg-dark3 p-5 shadow-md">
            <Typography variant="h5" className="pb-5 font-bold">
              Lista proveedores
            </Typography>
            <div>
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className=" bg-two border-opacity-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none  text-light"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="mx-auto">
                  {isLoading ? (
                    <tr>
                      <td>
                        <div>
                          <Spinner className="h-12 w-12" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {supplierCollection.map((supplier, index) => {
                        const isLast = index === supplierCollection.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <SupplierRow
                            supplier={supplier}
                            classes={classes}
                            key={index}
                          />
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SupplierRow({ supplier, classes }) {
  console.log(supplier);
  return (
    <tr className="bg-two hover:bg-twoHover">
      <td className={classes}>
        <Typography variant="small" className="font-normal text-light">
          {supplier.supplier}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          className="font-normal text-light"
        ></Typography>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          {supplier.stock.map((currentStock, index) => {
            return (
              <div className="flex justify-between" key={index}>
                <Typography variant="small">
                  {currentStock.country === "us" ? "EE.UU" : "generico"}:
                </Typography>
                <Typography variant="small"> {currentStock.stock}</Typography>
              </div>
            );
          })}
        </div>
      </td>
      <td className={`${classes}`}>
        <div className="flex justify-center">
          <Button variant="text" className="hover:bg-threeHover bg-three">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-light"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </td>
    </tr>
  );
}
