import { Alert } from "@material-tailwind/react";
import { useEffect } from "react";

export default function AlertSuccess({ open, handler, data }) {
  useEffect(() => {
    {
      data &&
        setTimeout(() => {
          handler(false);
        }, 5000);
    }
  }, []);
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  return (
    <>
      <Alert
        open={open}
        onClose={() => handler(false)}
        className="fixed w-auto right-[8px] mt-[-60px]"
        color="green"
        icon={<Icon />}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {data?.created ? `Usuario ${data.created} creado.` : ""}
        {data?.userStatus && data.disabled
          ? `Usuario ${data.userStatus} deshabilitado.`
          : ""}
        {data?.userStatus && !data.disabled
          ? `Usuario ${data.userStatus} habilitado.`
          : ""}
      </Alert>
    </>
  );
}
