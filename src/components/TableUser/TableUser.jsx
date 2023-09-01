import { useState, useEffect } from "react";

import CreateUser from "./CreateUser";

import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Alert,
} from "@material-tailwind/react";

import { PencilIcon } from "@heroicons/react/24/solid";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

export default function TableUser() {
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);

  const [userDataCollection, setUserDataCollection] = useState([]);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  useEffect(() => {
    setUserDataCollection(getUserDataCollection);
  }, []);

  const getUserDataCollection = () => {};

  const handleOpenCreateUserModal = () => {
    setOpenCreateUserModal(!openCreateUserModal);
  };

  const handleSuccessAlert = (data) => {
    setOpenAlertSuccess(true);
  };

  const handleFailedAlert = (error) => {
    setOpenAlertFailed(true);
  };

  return (
    <>
      <div className="mx-[10px]">
        <Card className="h-full w-full mt-[100px]">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Recent Transactions
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  These are details about the last transactions
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                {isCreateUserLoading ? (
                  <div className="align-middle justify-center">
                    <Spinner className="h-4 w-4" />
                  </div>
                ) : (
                  <>
                    <Button
                      className="flex items-center gap-3"
                      size="sm"
                      onClick={handleOpenCreateUserModal}
                    >
                      Crear usuario
                    </Button>
                    <Alert
                      open={openAlertSuccess}
                      onClose={() => setOpenAlertSuccess(false)}
                      className="fixed w-auto right-[26px] mt-[50px]"
                      color="green"
                    >
                      Usuario Creado
                    </Alert>
                    <Alert
                      open={openAlertFailed}
                      onClose={() => setOpenAlertFailed(false)}
                      className="fixed w-auto right-[16px] mt-[50px]"
                      color="red"
                    >
                      Error al crear usuario
                    </Alert>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    {
                      img,
                      name,
                      amount,
                      date,
                      status,
                      account,
                      accountNumber,
                      expiry,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={img}
                              alt={name}
                              size="md"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={status}
                              color={
                                status === "paid"
                                  ? "green"
                                  : status === "pending"
                                  ? "amber"
                                  : "red"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                              <Avatar
                                src={
                                  account === "visa"
                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                }
                                size="sm"
                                alt={account}
                                variant="square"
                                className="h-full w-full object-contain p-1"
                              />
                            </div>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal capitalize"
                              >
                                {account.split("-").join(" ")} {accountNumber}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {expiry}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            {/* paginador */}
          </CardFooter>
        </Card>
        {openCreateUserModal && (
          <CreateUser
            handleSuccessAlert={handleSuccessAlert}
            handleFailedAlert={handleFailedAlert}
            setIsCreateUserLoading={setIsCreateUserLoading}
            openCreateUserModal={openCreateUserModal}
            handleOpenCreateUserModal={handleOpenCreateUserModal}
          />
        )}
      </div>
    </>
  );
}
