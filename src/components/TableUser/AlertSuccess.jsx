import { Alert } from "@material-tailwind/react";
import { useEffect } from "react";

export default function AlertSuccess({ open, handler, data }) {
  useEffect(() => {
    {
      data
        ? setTimeout(() => {
            handler(false);
          }, 5000)
        : "";
    }
  }, []);
  return (
    <>
      <Alert
        open={open}
        onClose={handler}
        className="fixed w-auto right-[8px] mt-[-60px]"
        color="green"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {data ? (data.user ? `Usuario ${data.user} creado.` : "") : ""}
      </Alert>
    </>
  );
}
