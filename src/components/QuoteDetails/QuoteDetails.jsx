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
import { getQuote } from "../../services/QuoteService";

export default function QuoteDetails() {
  const { quoteId } = useParams();
  const [isLoadingTable, setIsLoading] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    getActiveQuote();
  }, []);

  // useEffect(() => {
  //   console.log(quote);
  // }, [quote]);

  const getActiveQuote = async () => {
    const quoteFetch = await getQuote(quoteId);
    setQuote(quoteFetch);
  };

  return (
    <div className="mx-10">
      <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-dark3"
        >
          <Typography variant="h5" className="text-light">
            {quote?.quoteName}
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <table className="w-full min-w-max table-auto text-left">
            {/* <thead>
              <tr>
                <th className="border-y border-light bg-dark border-opacity-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none  text-light opacity-70"
                  >
                    head1
                  </Typography>
                </th>
              </tr>
            </thead> */}
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
                  {quote?.products.map((product, index) => {
                    return (
                      <ProductQuoteRow product={product} key={product.UID} />
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <>{/* paginador */}</>
        </CardFooter>
      </Card>
    </div>
  );
}

function ProductQuoteRow({ product }) {
  const [priceNumber, setPriceNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let price = parseFloat(product.price.replace(/\$/g, ""));
    setPriceNumber(price);
    setQuantity(product.quantity);
    setSubtotal(priceNumber);
  }, []);

  useEffect(() => {
    console.log(quantity);
    updateSubtotal();
  }, [quantity]);

  useEffect(() => {
    console.log(subtotal);
  }, [subtotal]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const updateSubtotal = () => {
    setSubtotal(quantity * priceNumber);
  };

  return (
    <tr className="bg-two text-light flex items-center justify-between">
      <td>
        <div className="flex gap-4 m-4 max-w-md">
          <div className="">{product.description}</div>
          <img src={product.imgSrc}></img>
        </div>
      </td>
      <td>
        <div className="flex gap-4 m-4 ">{product.supplierName}</div>
      </td>
      <td>
        <div className="flex">
          <Button
            onClick={decreaseQuantity}
            disabled={quantity < 1}
            className="bg-three hover:bg-threeHover"
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
            className="bg-three hover:bg-threeHover"
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
        <Button color="red" className="mr-5">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </td>
    </tr>
  );
}
