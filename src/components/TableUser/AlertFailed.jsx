import { Alert } from "@material-tailwind/react";

export default function AlertFailed({ open, handler, error }) {
  return (
    <>
      <Alert
        open={open}
        onClose={handler}
        className="fixed w-auto right-[8px] mt-[-60px]"
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
    </>
  );
}
