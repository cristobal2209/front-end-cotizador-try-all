import { Alert, Typography } from "@material-tailwind/react";

export default function AlertFailed({ open, handler, error }) {
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="fixed w-auto right-[8px] mt-[-60px]">
        <Alert
          open={open}
          onClose={() => handler(false)}
          className=""
          color="red"
          icon={<Icon />}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          <Typography variant="paragraph">{error ? error : " "}</Typography>
        </Alert>
      </div>
    </>
  );
}
