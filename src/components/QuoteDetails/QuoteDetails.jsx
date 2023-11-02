import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import {
  getQuote,
  updateQuoteProducts,
  subscribeToActiveQuote,
} from "../../services/QuoteService";

const TABLE_HEAD = ["Producto", "Proveedor", "Cantidad", "Subtotal", " "];

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
    console.log(quoteProducts);
  }, [quoteProducts]);

  const deleteProduct = async (index) => {
    let copyQuoteProducts = quoteProducts;
    copyQuoteProducts.splice(index, 1);
    setQuoteProducts(copyQuoteProducts);
    updateProducts();
    setCounter(counter + 1);
  };

  const updateProducts = async () => {
    const response = await updateQuoteProducts(quoteId, quoteProducts);
  };

  const updateSubtotal = (index, newQuantity) => {
    setQuoteProducts((prevQuoteProducts) => {
      // Clona el arreglo previo para mantener la inmutabilidad
      const updatedQuoteProducts = [...prevQuoteProducts];
      // Actualiza el elemento específico en el nuevo arreglo clonado
      updatedQuoteProducts[index] = {
        ...updatedQuoteProducts[index],
        quantity: newQuantity,
      };
      return updatedQuoteProducts;
    });
  };

  const getTotal = () => {
    let total = 0;
    quoteProducts?.forEach((productData) => {
      const quantity = productData.quantity;
      let price = parseFloat(
        productData.supplier.prices[0].price.replace(/\$/g, "")
      );
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
          <Typography variant="h5" className="text-light">
            Total: {total}
          </Typography>
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

  useEffect(() => {
    let price = parseFloat(
      productData.supplier.prices[0].price.replace(/\$/g, "")
    );
    setPriceNumber(price);
    setQuantity(productData.quantity);
    setSubtotal(priceNumber * quantity);
  }, []);

  useEffect(() => {
    setSubtotal(priceNumber * quantity);
  }, [quantity]);

  const increaseQuantity = () => {
    // Actualizar la cantidad en el componente principal
    setQuantity(quantity + 1);
    updateSubtotal(index, quantity + 1);
  };

  const decreaseQuantity = () => {
    // Actualizar la cantidad en el componente principal
    setQuantity(quantity - 1);
    updateSubtotal(index, quantity - 1);
  };

  return (
    <tr className={`bg-two text-light items-center ${classes}`}>
      <td>
        <div className="flex p-4">
          <Typography
            variant="small"
            className="font-normal text-light mr-1 max-w-xs"
          >
            {productData.product.description}
          </Typography>
          <div className="ml-auto">
            <img
              src={productData.product.imgSrc}
              className="ml-1 rounded-md"
            ></img>
          </div>
        </div>
      </td>
      <td>
        <div className="p-4">{productData.supplier.supplier}</div>
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
          <div className="self-center mx-5">{quantity}</div>
          <Button
            onClick={increaseQuantity}
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
        </div>
      </td>
      <td>
        <div className="mx-5">{subtotal.toFixed(2)}</div>
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
