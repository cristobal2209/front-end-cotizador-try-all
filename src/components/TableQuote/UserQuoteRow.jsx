import { useState } from "react";
import {
  Button,
  Typography,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function UserQuoteRow({
  quote,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
}) {
  return (
    <>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {quote.quoteName}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {quote.version}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {quote.state == 1
            ? "Activa"
            : quote.state == 2
            ? "En curso"
            : quote.state == 3
            ? "Finalizada"
            : "Existe"}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          <></>
        </Typography>
      </td>
      <td className={classes}>
        <Button variant="text" className="">
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Button>
      </td>
    </>
  );
}
