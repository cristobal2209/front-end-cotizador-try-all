import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getNextProductsCollection,
  countProducts,
} from "../../services/TableProductService";
import ProductRow from "./ProductRow";
import AlertFailed from "./AlertFailed";
import AlertSuccess from "./AlertSuccess";
import {
  Button,
  Spinner,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Alert,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//pagination
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  "Producto",
  "Fabricante",
  "N° Parte fabricante",
  "Proveedores",
  "Opciones",
];

export default function TableQuote() {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertFailed, setOpenAlertFailed] = useState(false);
  const [ProductsCollection, setProductsCollection] = useState([]);
  const [alertData, setAlertData] = useState();
  const [contador, setContador] = useState(0);
  const [nextDocRef, setNextDocRef] = useState(null);
  const [prevDocRef, setPrevDocRef] = useState(null);
  const [showedProductsQuantity, setShowedProductsQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Tabla gestión de productos";
    getNextProducts();
    getCountProducts();
  }, []);

  useEffect(() => {
    setContador(contador + 1);
  }, [ProductsCollection]);

  const handleOpenCreateProductDialog = () => {
    setOpenCreateProductDialog(!openCreateProductDialog);
  };

  const handleCreateProduct = () => {
    handleOpenCreateProductDialog();
  };

  const getCountProducts = async () => {
    setTotalItems(await countProducts());
  };

  const getNextProducts = async () => {
    const { data, firstVisible, lastVisible } =
      await getNextProductsCollection(nextDocRef);
    setProductsCollection(data);
    setNextDocRef(lastVisible);
    setPrevDocRef(firstVisible);
    setShowedProductsQuantity(showedProductsQuantity + itemsPerPage);
  };

  const getPrevProducts = async () => {
    const { data, firstVisible, lastVisible } =
      await getNextProductsCollection(prevDocRef);
    setProductsCollection(data);
    setNextDocRef(lastVisible);
    setPrevDocRef(firstVisible);
    setShowedProductsQuantity(showedProductsQuantity - itemsPerPage);
  };

  const handleOpenAlertSuccess = (boolean) => {
    setOpenAlertSuccess(boolean);
    setTimeout(() => {
      setOpenAlertSuccess(false);
    }, 5000);
  };

  const handleOpenAlertFailed = (boolean) => {
    setOpenAlertFailed(boolean);
    setTimeout(() => {
      setOpenAlertFailed(false);
    }, 5000);
  };

  //message se ocupa para mostrar alertas personalizadas
  const handleSuccessAlert = (message) => {
    //getUserQuotes();
    setAlertData(message);
    handleOpenAlertSuccess(true);
  };

  //error se ocupa para mostrar el error al usuario
  const handleFailedAlert = (error) => {
    setAlertData(error);
    handleOpenAlertFailed(true);
  };

  return (
    <>
      <div className="mx-[10px] pb-[10px]">
        <Card className="h-full w-full mt-[100px] max-w-7xl mx-auto bg-dark3  shadow-2xl">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-dark3 border-b border-light-50 mx-0"
          >
            <div className="mb-4 px-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" className="text-light">
                  Tabla de productos
                </Typography>
                <Typography className="mt-1 font-normal text-light opacity-50">
                  Productos ingresados en sistema.
                </Typography>
                <Typography className="mt-1 font-normal text-light opacity-50">
                  Mostrando {showedProductsQuantity} de {totalItems} productos.
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full">
                  <div className="flex flex-row">
                    <Input
                      label="Buscar producto"
                      icon={
                        <MagnifyingGlassIcon className="h-5 w-5 text-dark" />
                      }
                      disabled={true}
                    />
                    <Button
                      className=" bg-three hover:bg-threeHover ml-2 !w-max"
                      size="sm"
                      onClick={() => {
                        handleCreateProduct();
                      }}
                    >
                      Crear producto
                    </Button>
                  </div>

                  <AlertSuccess
                    open={openAlertSuccess}
                    handler={handleOpenAlertSuccess}
                    data={alertData}
                  />
                  <AlertFailed
                    open={openAlertFailed}
                    handler={handleOpenAlertFailed}
                    error={alertData}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody
            className={`overflow-x-auto p-0 ${
              ProductsCollection?.length === 0 ? "h-20" : "h-[600px]"
            }`}
          >
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
                {ProductsCollection?.length === 0 ? (
                  <>
                    <Typography className="w-full text-center font-bold text-light">
                      No existen productos en el sistema.
                    </Typography>
                  </>
                ) : (
                  <>
                    <table className="w-full min-w-max table-auto text-left">
                      <thead className="">
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-light bg-dark p-4 border-opacity-50"
                            >
                              <Typography
                                variant="small"
                                className="font-normal leading-none opacity-50 text-light"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ProductsCollection?.map((product, index) => {
                          const classes = "p-4 border-y border-blue-gray-100";

                          return (
                            <ProductRow
                              product={product}
                              classes={classes}
                              key={index}
                              handleSuccessAlert={handleSuccessAlert}
                              handleFailedAlert={handleFailedAlert}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </CardBody>
          <CardFooter
            className={` flex items-center justify-between border-t border-light-50 p-4 ${
              ProductsCollection?.length === 0 ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className={`flex items-center gap-2 bg-two hover:bg-twoHover text-light `}
                onClick={getPrevProducts}
                disabled={showedProductsQuantity === itemsPerPage}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                <span className="hidden sm:block">Anterior</span>
              </Button>
              <Button
                variant="text"
                className="flex items-center gap-2 bg-two hover:bg-twoHover text-light"
                onClick={getNextProducts}
              >
                <span className="hidden sm:block">Siguiente</span>

                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
        <CreateProductDialog
          open={openCreateProductDialog}
          handler={handleOpenCreateProductDialog}
        />
      </div>
    </>
  );
}

const validationSchema = Yup.object().shape({
  //validacion de campos del formulario productDataFormik
  description: Yup.string()
    .min(3, "La descripcion debe contener al menos 3 caracteres")
    .max(50, "La descripcion debe contener a lo mas 50 caracteres")
    .required("La descripcion es obligatoria"),

  manufacturer: Yup.string()
    .min(2, "El fabricante debe contener al menos 3 caracteres")
    .max(20, "El fabricante debe contener a lo mas 20 caracteres")
    .required("El fabricante es obligatorio"),

  manufacturerPartNo: Yup.string()
    .min(2, "El n° parte fabricante debe contener al menos 3 caracteres")
    .max(20, "El n° parte fabricante debe contener a lo mas 20 caracteres")
    .required("El n° parte fabricante es un campo obligatorio"),

  priceFor: Yup.string().required("Este campo es obligatorio"),

  productCategory: Yup.string()
    .required("Este campo es obligatorio")
    .min(1, "Este campo es obligatorio"),

  priceForQuantity: Yup.string()
    .required("Este campo es obligatorio")
    .min(1, "Este campo es obligatorio"),
});

export function CreateProductDialog({ open, handler }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (imageUpload) {
      const objectUrl = URL.createObjectURL(imageUpload);
      setImagePreview(objectUrl);
      productDataFormik.setFieldValue("imgSrc", imageUpload);
    }
  }, [imageUpload]);

  const submitRegister = (formValues) => {
    console.log(formValues);
  };

  const productDataFormik = useFormik({
    initialValues: {
      description: "",
      priceFor: "",
      priceForQuantity: "",
      manufacturer: "",
      manufacturerPartNo: "",
      productCategory: "",
      imgSrc: "",
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      submitRegister(productDataFormik.values);
    },
  });

  const handleInputChange = (e) => {
    // Solo permitir números y un punto decimal
    const validatedValue = e.target.value.replace(/[^0-9.]/g, "");

    // Actualizar el estado del input solo si la entrada es válida
    productDataFormik.setFieldValue("priceForQuantity", validatedValue);
  };

  return (
    <Dialog open={open} size="xl" className="bg-dark overflow-auto">
      <DialogHeader className="justify-between text-light border-dark2 border-b-2 bg-dark3">
        <Typography variant="h5">Añadir nuevo producto.</Typography>
        <IconButton
          color="white"
          size="sm"
          variant="text"
          onClick={() => handler()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-[42rem] overflow-y-scroll">
        <div className="grid grid-cols-2 border-b border-light pb-5 gap-5">
          <Typography
            variant="lead"
            className="font-bold text-light pb-5 col-span-2"
          >
            Datos producto
          </Typography>
          <div className="py-2 col-span-2">
            <Textarea
              label="Descripción"
              name="description"
              value={productDataFormik.values.description}
              onChange={productDataFormik.handleChange}
              className="border-light text-light"
              labelProps={{ className: "!text-light opacity-50" }}
              required
            />
            {productDataFormik.errors.description ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.description}
                </div>
              </Alert>
            ) : null}
          </div>

          <div className="py-2 mr-1 grow">
            <Input
              variant="standard"
              label="Fabricante"
              name="manufacturer"
              value={productDataFormik.values.manufacturer}
              onChange={productDataFormik.handleChange}
              labelProps={{ className: "!text-light opacity-50" }}
              color="white"
              required
            />
            {productDataFormik.errors.manufacturer ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.manufacturer}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2 ml-1 grow">
            <Input
              variant="standard"
              label="N° parte fabricante"
              name="manufacturerPartNo"
              value={productDataFormik.values.manufacturerPartNo}
              onChange={productDataFormik.handleChange}
              labelProps={{ className: "!text-light opacity-50" }}
              color="white"
              required
            />
            {productDataFormik.errors.manufacturerPartNo ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.manufacturerPartNo}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2 mr-1 grow">
            <Select
              name="productCategory"
              variant="standard"
              label="Seleccionar categoría"
              labelProps={{ className: "text-light opacity-50" }}
              className="text-light"
              menuProps={{ className: "bg-dark text-light border-dark2" }}
              onChange={(selectedValue) => {
                productDataFormik.handleChange({
                  target: {
                    name: "productCategory",
                    value: selectedValue,
                  },
                });
                productDataFormik.setFieldValue(
                  "productCategory",
                  selectedValue
                );
              }}
            >
              <Option value={"computacion"}>Computación</Option>
              <Option value={"bricolaje"}>Bricolaje</Option>
              <Option value={"electronica"}>Electrónica</Option>
              <Option value={"iluminacion"}>Iluminación</Option>
              <Option value={"herramientasEInsumos"}>
                Herramientas e insumos
              </Option>
              <Option value={"automatizacionEIot"}>Automatización e IoT</Option>
              <Option value={"energias"}>Energías</Option>
              <Option value={"administracionTermica"}>
                Adminstración térmica
              </Option>
              <Option value={"robotica"}>Robótica</Option>
              <Option value={"cableado"}>Cableado</Option>
              <Option value={"regadio"}>Regadío</Option>
              <Option value={"electromecanica"}>Electromecánica</Option>
              <Option value={"inalambricos"}>Inalámbricos</Option>
              <Option value={"seguridad"}>Seguridad</Option>
              <Option value={"electricidad"}>Electricidad</Option>
              <Option value={"sensores"}>Sensores</Option>
            </Select>
            {productDataFormik.errors.productCategory ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.productCategory}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-2 ml-1 grow">
            <div className="flex">
              <Select
                name="priceFor"
                variant="standard"
                label="Precio por"
                labelProps={{ className: "text-light opacity-50" }}
                value={productDataFormik.values.priceFor}
                className="text-light"
                menuProps={{ className: "bg-dark text-light border-dark2" }}
                onChange={(selectedValue) => {
                  productDataFormik.handleChange({
                    target: {
                      name: "priceFor",
                      value: selectedValue,
                    },
                  });
                  productDataFormik.setFieldValue("priceFor", selectedValue);
                }}
              >
                <Option value={"each"}>Unidad</Option>
                <Option value={"packageOf"}>Paquete de</Option>
                <Option value={"spoolOf"}>Carrete de</Option>
              </Select>
              {productDataFormik.values.priceFor === "packageOf" ? (
                <div className="mx-2 flex">
                  <Input
                    type="text"
                    name="priceForQuantity"
                    variant="standard"
                    color="white"
                    label="ingrese una cantidad"
                    labelProps={{ className: "text-light opacity-50" }}
                    value={productDataFormik.values.priceForQuantity}
                    onChange={handleInputChange}
                    onBlur={productDataFormik.handleBlur}
                  />
                  <div className="rounded-md rounded-l-none pl-1 mt-auto">
                    <Typography variant="small" className="text-light">
                      unidades.
                    </Typography>
                  </div>
                </div>
              ) : productDataFormik.values.priceFor === "spoolOf" ? (
                <div className="mx-2 flex">
                  <Input
                    type="text"
                    name="priceForQuantity"
                    variant="standard"
                    color="white"
                    label="ingrese una cantidad"
                    labelProps={{ className: "text-light opacity-50" }}
                    value={productDataFormik.values.priceForQuantity}
                    onChange={handleInputChange}
                    onBlur={productDataFormik.handleBlur}
                  />
                  <div className="rounded-md rounded-l-none pl-1 mt-auto">
                    <Typography variant="small" className="text-light">
                      metros.
                    </Typography>
                  </div>
                </div>
              ) : null}
            </div>
            {productDataFormik.errors.priceFor &&
            productDataFormik.errors.priceForQuantity ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.priceFor}
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="py-3 flex mr-1">
            <div className="flex flex-col">
              <div className="flex">
                <Typography variant="small" className="text-light pb-5">
                  Imagen producto
                </Typography>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-light ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
              <input
                className="text-light"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
            </div>
            <div className="p-2 ml-auto rounded-md">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-[90px]"
                />
              )}
            </div>
          </div>
        </div>
        <div className="my-3">
          <Typography variant="lead" className="font-bold text-light">
            Proveedores
          </Typography>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2 border-dark2 border-t-2 bg-dark3">
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => productDataFormik.handleSubmit()}
        >
          <span>Crear</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
