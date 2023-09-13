import { Alert } from "@material-tailwind/react";

export default function AlertFailed({ open, handler, data }) {
  console.log(data);
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
        Error al crear usuario
      </Alert>
    </>
  );
}
