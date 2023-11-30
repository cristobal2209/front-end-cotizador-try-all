import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uuidv4 } from "@firebase/util";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Typography,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import {
  updateQuoteProducts,
  subscribeToActiveQuote,
  getActiveQuote,
  getQuote,
} from "../../services/QuoteService";

const TABLE_HEAD = [
  "Producto",
  "Proveedor",
  "Stock",
  "Cantidad",
  "Precio",
  "Subtotal",
  " ",
];

export default function QuoteDetails() {
  const { quoteId } = useParams();
  const [isLoadingTable, setIsLoading] = useState(null);
  const [total, setTotal] = useState(0);
  const [quote, setQuote] = useState(null);
  const [quoteProducts, setQuoteProducts] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const quoteData = await getQuote(quoteId);
        setQuote(quoteData);
      } catch (error) {
        // Manejar errores, por ejemplo, mostrando un mensaje de error.
        console.error("Error al obtener la cotización:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [quoteId]);

  useEffect(() => {
    if (quote?.products.length !== 0) {
      // Aplicar map a quote.products y guardar el resultado en una nueva variable
      const mappedProducts = quote?.products.map((product) => {
        product.id = uuidv4();
        return product;
      });

      // Establecer el estado con los productos mapeados
      setQuoteProducts(mappedProducts);
    }
  }, [quote]);

  useEffect(() => {
    if (quoteProducts?.length != 0) {
      getTotal();
    }
    setCounter(counter + 1);
  }, [quoteProducts]);

  useEffect(() => {
    if (counter > 0) updateProducts();
  }, [counter]);

  const deleteProduct = async (quoteProductID) => {
    const updatedQuoteProducts = quoteProducts.filter(
      (quoteProduct) => quoteProduct.id !== quoteProductID
    );
    setQuoteProducts(updatedQuoteProducts);
  };

  const updateProducts = async () => {
    const response = await updateQuoteProducts(quoteId, quoteProducts, total);
  };

  const updateSubtotal = (quoteProductID, newQuantity, newPrice) => {
    setQuoteProducts((prevQuoteProducts) => {
      const updatedQuoteProducts = prevQuoteProducts.map((product) => {
        // Compara el quoteProductID para encontrar el producto correcto
        if (product.id === quoteProductID) {
          // Actualiza la cantidad y el precio del producto
          return {
            ...product,
            quantity: newQuantity,
            price: newPrice,
          };
        }
        // Mantén los productos que no necesitan actualizarse sin cambios
        return product;
      });

      return updatedQuoteProducts;
    });
  };

  const getTotal = () => {
    let total = 0;
    quoteProducts?.forEach((productData) => {
      const quantity = productData.quantity;
      const price = productData.price;

      total += price * quantity;
    });
    setTotal(total.toFixed(2));
  };

  return (
    <div className="mx-10">
      <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-dark3"
        >
          {quote ? (
            <>
              <Typography variant="h5" className="text-light">
                Nombre cotización: {quote?.quoteName}
              </Typography>
            </>
          ) : (
            " "
          )}
        </CardHeader>
        <CardBody className="p-4">
          {quoteProducts?.length === 0 || !quoteProducts ? (
            <>
              <Typography variant="paragraph" className="text-light">
                Esta cotización no tiene productos.
              </Typography>
            </>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left ">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className=" bg-dark3 border-opacity-50 p-4"
                      >
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
                <tbody className="mx-auto ">
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
                      {quoteProducts?.map((productData, index) => {
                        const isLast = index === quote.products.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";
                        return (
                          <ProductQuoteRow
                            productData={productData}
                            key={productData.id}
                            classes={classes}
                            updateSubtotal={(newQuantity, newPrice) => {
                              updateSubtotal(
                                productData.id,
                                newQuantity,
                                newPrice
                              );
                            }}
                            deleteProduct={() => {
                              deleteProduct(productData.id);
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
        {quoteProducts?.length === 0 || !quoteProducts ? (
          <></>
        ) : (
          <CardFooter className="flex items-center justify-between p-4">
            <div className="!justify-self-start w-full justify-between flex flex-row">
              <Typography variant="h5" className="text-light">
                Total:
              </Typography>
              <Typography variant="h5" className="text-light">
                ${total}
              </Typography>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

function ProductQuoteRow({
  productData,
  classes,
  updateSubtotal,
  deleteProduct,
}) {
  const [priceNumber, setPriceNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const { product, supplier } = productData;

  const priceMap = {};

  supplier.prices.forEach((priceEntry) => {
    const minQuantity = parseInt(priceEntry.quantity.replace("+", ""), 10);

    // Limpiar la cadena de precio antes de convertirla a un número
    const cleanedPriceString = priceEntry.price
      .replace(/[^\d.,]/g, "") // Elimina caracteres que no son dígitos, comas ni puntos
      .replace(",", ""); // Elimina comas que no son el separador de decimales

    const price = parseFloat(cleanedPriceString);

    priceMap[minQuantity] = price;
  });

  useEffect(() => {
    updatePriceAndSubtotal(productData.quantity);
    sumTotalStock();
  }, []);

  useEffect(() => {
    setSubtotal(priceNumber * quantity);
  }, [quantity]);

  const updatePriceAndSubtotal = async (newQuantity) => {
    let nearestQuantity = newQuantity;
    while (priceMap[nearestQuantity] === undefined && nearestQuantity >= 0) {
      nearestQuantity--;
    }

    const newPrice = priceMap[nearestQuantity] || 0;
    setQuantity(newQuantity);
    setPriceNumber(newPrice);

    updateSubtotal(newQuantity, newPrice);
  };

  const sumTotalStock = () => {
    const stockArr = supplier.stock;
    let totalStock = 0;

    stockArr.forEach((stockObj) => {
      totalStock += parseInt(stockObj.stock);
    });

    setTotalStock(totalStock);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    updatePriceAndSubtotal(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updatePriceAndSubtotal(newQuantity);
    }
  };

  function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== "string") {
      return inputString;
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
    if (newQuantity <= totalStock) {
      updatePriceAndSubtotal(newQuantity);
    }
  };

  return (
    <tr
      className={`bg-two hover:bg-twoHover text-light items-center ${classes}`}
    >
      <td>
        <div className="flex p-4">
          <a
            href={`${import.meta.env.VITE_HOST}/articles/${product.id}`}
            className="hover:underline mr-1 max-w-xs"
          >
            <Typography variant="small" className=" text-light">
              {product.description}
            </Typography>
          </a>
          <div className="ml-auto">
            <img src={product.imgSrc} className="ml-1 rounded-md"></img>
          </div>
        </div>
      </td>
      <td>
        <div className="p-4">
          <a href={`${supplier.productUrl}`} className="hover:underline">
            <Typography variant="small" className=" text-light">
              {capitalizeFirstLetter(supplier.supplier)}
            </Typography>
          </a>
        </div>
      </td>
      <td>
        <div className="flex p-4">
          <Typography variant="small" className=" text-light">
            {totalStock}&nbsp;u.
          </Typography>
        </div>
      </td>
      <td>
        <div className="flex p-4">
          <Button
            onClick={decreaseQuantity}
            disabled={quantity < 2}
            className="bg-three hover:bg-threeHover px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </Button>
          <div className="self-center mx-5">
            <Typography variant="small" className=" text-light">
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                className="self-center rounded-md bg-dark px-3 text-center border-2 border-dark2 max-w-[100px]"
              />
            </Typography>
          </div>
          <Button
            onClick={increaseQuantity}
            disabled={quantity >= totalStock}
            className="bg-three hover:bg-threeHover px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
          <div className="ml-1 self-center">
            <Tooltip
              content={
                <div className="w-52">
                  <Typography variant="small">Precios por cantidad</Typography>
                  {supplier.prices?.map((price, index) => {
                    return (
                      <div className="flex justify-between" key={index}>
                        <Typography variant="small">
                          <span className="opacity-70">Cantidad:</span>&nbsp;
                          {price.quantity}
                        </Typography>
                        <Typography variant="small">
                          <span className="opacity-70"> Precio:</span>
                          &nbsp;{price.price}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              }
              className="bg-four shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 cursor-pointer text-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </Tooltip>
          </div>
        </div>
      </td>
      <td>
        <div className="flex p-4">
          <Typography variant="small" className="font-normal text-light ">
            ${priceNumber}
          </Typography>
        </div>
      </td>
      <td>
        <div className="mx-5">
          <Typography variant="small" className="font-normal text-light">
            ${subtotal.toFixed(2)}
          </Typography>
        </div>
      </td>
      <td>
        <div className="p-4 flex">
          <Button
            color="red"
            className="ml-auto px-3"
            onClick={async () => {
              await deleteProduct();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </td>
    </tr>
  );
}
