import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
    setIsLoading(true);
    const unsubscribe = subscribeToActiveQuote((data) => {
      setQuote(data);
    });
    setIsLoading(false);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (quote?.products.length != 0) setQuoteProducts(quote?.products);
  }, [quote]);

  useEffect(() => {
    if (quoteProducts?.length != 0) {
      getTotal();
      updateProducts();
      setCounter(counter + 1);
    }
  }, [quoteProducts]);

  const deleteProduct = async (index) => {
    setQuoteProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts.splice(index, 1);
      return newProducts;
    });
    updateProducts();
    setCounter(counter + 1);
  };

  const updateProducts = async () => {
    const response = await updateQuoteProducts(quoteId, quoteProducts, total);
  };

  const updateSubtotal = (index, newQuantity, price) => {
    setQuoteProducts((prevQuoteProducts) => {
      // Clona el arreglo previo para mantener la inmutabilidad
      const updatedQuoteProducts = [...prevQuoteProducts];
      // Actualiza el elemento específico en el nuevo arreglo clonado
      updatedQuoteProducts[index] = {
        ...updatedQuoteProducts[index],
        quantity: newQuantity,
        price: price,
      };
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
                {quote?.quoteName}
              </Typography>
            </>
          ) : (
            " "
          )}
        </CardHeader>
        <CardBody className="p-4">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className=" bg-dark3 border-opacity-50 p-4">
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
                        key={index}
                        index={index}
                        classes={classes}
                        updateSubtotal={updateSubtotal}
                        deleteProduct={deleteProduct}
                      />
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </CardBody>
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
      </Card>
    </div>
  );
}

function ProductQuoteRow({
  productData,
  classes,
  updateSubtotal,
  index,
  deleteProduct,
}) {
  const [priceNumber, setPriceNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const { product, supplier } = productData;

  const priceMap = {}; // Objeto para mapear cantidades a precios

  // Crear el mapeo de cantidades a precios
  supplier.prices.forEach((priceEntry) => {
    const minQuantity = parseInt(priceEntry.quantity.replace("+", ""));
    const price = parseFloat(priceEntry.price.replace(/\$/g, ""));
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
    // Buscar el precio más cercano en el mapeo
    let nearestQuantity = newQuantity;
    while (priceMap[nearestQuantity] === undefined && nearestQuantity >= 0) {
      nearestQuantity--;
    }

    const newPrice = priceMap[nearestQuantity] || 0;
    setQuantity(newQuantity);
    setPriceNumber(newPrice);

    // Llama a la función de actualización del subtotal en el componente padre
    updateSubtotal(index, newQuantity, newPrice);
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

  return (
    <tr
      className={`bg-two hover:bg-twoHover text-light items-center ${classes}`}
    >
      <td>
        <div className="flex p-4">
          <a
            href={`http://localhost:4000/articles/${product.id}`}
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
              {" "}
              {quantity}
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
              await deleteProduct(index);
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

ProductQuoteRow.propTypes = {
  productData: PropTypes.shape({
    product: PropTypes.shape({
      description: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
    }).isRequired,
    supplier: PropTypes.shape({
      supplier: PropTypes.string.isRequired,
      prices: PropTypes.arrayOf(
        PropTypes.shape({
          quantity: PropTypes.string.isRequired,
          price: PropTypes.string.isRequired,
        })
      ).isRequired,
      stock: PropTypes.arrayOf(
        PropTypes.shape({
          stock: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.string.isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
