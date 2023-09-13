import { Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function AlertFailed({ open, handler, error }) {
  useEffect(() => {
    {
      error
        ? setTimeout(() => {
            handler(false);
          }, 5000)
        : "";
    }
  }, []);

  return (
    <>
      <div className="fixed w-auto right-[8px] mt-[-60px]">
        <Alert
          open={open}
          onClose={handler}
          className=""
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Error:{" "}
          {error
            ? error.message
              ? error.message
              : "Error , por favor intente nuevamente"
            : ""}
        </Alert>
      </div>
    </>
  );
}
