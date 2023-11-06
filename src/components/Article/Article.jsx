import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner, Typography, Alert } from "@material-tailwind/react";
import { getProductData } from "../../services/ProductService";
import { addProductToActiveQuote } from "../../services/QuoteService";

const TABLE_HEAD = [
  "Proveedor",
  "Datos adicionales",
  "Precios por cantidad",
  "Stock",
  "Añadir a cotización",
];

export default function Article() {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [supplierCollection, setSupplierCollection] = useState([]);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  useEffect(() => {
    document.title = `${productData?.description}`;
  }, [productData]);

  const getProduct = async () => {
    setIsLoading(true);
    const productDataFetch = {
      id: productId,
      ...(await getProductData(productId)),
    };
    setProductData(productDataFetch);
    setSupplierCollection(productDataFetch.suppliers);
    setIsLoading(false);
  };

  const handleAddProductToQuote = async (supplier) => {
    await addProductToActiveQuote(productData, supplier)
      .then(() => {
        setAlertData("Producto agregado a cotización");
        handleOpenAlertSuccess();
      })
      .catch((e) => {
        setAlertData("Error al agregar el producto");
        handleOpenAlertFailed();
      });
  };

  const handleOpenAlertSuccess = () => {
    setOpenAlertSuccess(!openAlertSuccess);
    setTimeout(() => {
      setOpenAlertSuccess(false);
    }, 3000);
  };

  const handleOpenAlertFailed = () => {
    setOpenAlertFailed(!openAlertFailed);
    setTimeout(() => {
      setOpenAlertFailed(false);
    }, 3000);
  };

  return (
    <div className="mx-auto h-full max-w-5xl pt-24">
      {isLoading ? (
        <Spinner className="mx-auto mt-20 h-12 w-12" />
      ) : (
        <section className="flex flex-col">
          {openAlertSuccess && (
            <AlertSuccess
              open={openAlertSuccess}
              handler={handleOpenAlertSuccess}
              data={alertData}
            />
          )}
          {openAlertFailed && (
            <AlertFailed
              open={openAlertFailed}
              handler={handleOpenAlertFailed}
              error={alertData}
            />
          )}
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
                      Fabricante :
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
                      Precio por :
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
            <div className="overflow-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => {
                      const isLast = index === TABLE_HEAD.length - 1;
                      const isFirst = index === 0;
                      const isSecond = index === 1;
                      return (
                        <th
                          key={index}
                          className={`bg-two p-4 ${
                            (isLast ? "w-[200px]" : null,
                            isSecond ? "w-[300px]" : null,
                            isFirst ? "w-[100px]" : null)
                          }`}
                        >
                          <div className="flex">
                            <div
                              className={`${isLast ? "ml-auto" : null} 
                              }`}
                            >
                              <Typography
                                variant="small"
                                className="font-normal leading-none"
                              >
                                {head}
                              </Typography>
                            </div>
                          </div>
                        </th>
                      );
                    })}
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
                            handleAddProductToQuote={handleAddProductToQuote}
                            key={index}
                          />
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-two">
              <Typography variant="h5" className="font-normal leading-none">
                . . . Más proveedores a futuro
              </Typography>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SupplierRow({ supplier, classes, handleAddProductToQuote }) {
  const [extraDataObj, setExtraDataObj] = useState({ ...supplier });
  const [extraData, setExtraData] = useState([]);

  useEffect(() => {
    let copyExtraData = extraDataObj;
    let extraDataArr = [];
    delete copyExtraData.prices;
    delete copyExtraData.productUrl;
    delete copyExtraData.stock;
    delete copyExtraData.supplier;

    for (let field in copyExtraData) {
      extraDataArr.push({ [field]: copyExtraData[field] });
    }

    setExtraData(extraDataArr);
  }, []);

  return (
    <tr className="bg-two hover:bg-twoHover">
      <td className={classes}>
        <Typography variant="small" className="font-normal text-light">
          {supplier.supplier}
        </Typography>
      </td>
      <td className={` ${classes}`}>
        <div className="flex flex-col">
          {extraData?.map((data, index) => {
            return (
              <div key={index}>
                {Object.keys(data).map((field) => (
                  <div className="flex justify-between" key={field}>
                    <Typography variant="small" className="opacity-70">
                      {field}: &nbsp;
                    </Typography>
                    <Typography variant="small">{data[field]}</Typography>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          {supplier.prices?.map((price, index) => {
            return (
              <div className="flex justify-between" key={index}>
                <Typography variant="small">
                  <span className="opacity-70">Cantidad: &nbsp;</span>
                  {price.quantity}&nbsp;
                </Typography>
                <Typography variant="small">
                  <span className="opacity-70"> Precio: &nbsp;</span>
                  {price.price}
                </Typography>
              </div>
            );
          })}
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          {supplier.stock?.map((currentStock, index) => {
            return (
              <div className="flex justify-between" key={index}>
                <Typography variant="small" className="opacity-70">
                  {currentStock.country === "us" ? "EE.UU" : "Reino Unido"}:
                </Typography>
                <Typography variant="small">
                  {currentStock.stock} &nbsp; u.
                </Typography>
              </div>
            );
          })}
        </div>
      </td>
      <td className={`${classes}`}>
        <div className="flex justify-end">
          {/* Boton mas */}
          <Button
            variant="text"
            className="hover:bg-threeHover bg-three px-3"
            onClick={() => {
              handleAddProductToQuote(supplier);
            }}
          >
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

function AlertFailed({ open, handler, error }) {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="fixed w-auto right-[8px]">
        <Alert
          open={open}
          onClose={() => handler()}
          color="red"
          icon={<Icon />}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <Typography variant="small">{error}</Typography>
        </Alert>
      </div>
    </>
  );
}
function AlertSuccess({ open, handler, data }) {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="!absolute w-auto right-[8px]">
        <Alert
          open={open}
          onClose={() => handler()}
          color="green"
          icon={<Icon />}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <Typography variant="small">{data}</Typography>
        </Alert>
      </div>
    </>
  );
}
