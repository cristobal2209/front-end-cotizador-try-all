import { useState, useEffect } from "react";
import { uuidv4 } from "@firebase/util";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getNextProductsCollection,
  countProducts,
  createProduct,
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

export default function TableProduct() {
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

  const TABLE_HEAD = [
    "Producto",
    "Fabricante",
    "N° Parte fabricante",
    "Proveedores",
    "Opciones",
  ];

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
    // const { data, firstVisible, lastVisible } =
    //   await getNextProductsCollection(nextDocRef);
    // setProductsCollection(data);
    // setNextDocRef(lastVisible);
    // setPrevDocRef(firstVisible);
    // setShowedProductsQuantity(showedProductsQuantity + itemsPerPage);
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

export function CreateProductDialog({ open, handler }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [hasErrors, setHasErrors] = useState(true);
  const [inputChangedCounter, setInputChangedCounter] = useState(0);
  const [counter, setCounter] = useState(0);

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

  useEffect(() => {
    if (imageUpload) {
      const objectUrl = URL.createObjectURL(imageUpload);
      setImagePreview(objectUrl);
      productDataFormik.setFieldValue("imgSrc", imageUpload);
    }
  }, [imageUpload]);

  useEffect(() => {
    if (
      Object.keys(productDataFormik.errors).some(
        (fieldName) => productDataFormik.errors[fieldName]
      )
    ) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  }, [counter]);

  useEffect(() => {
    setCounter(counter + 1);
  }, [inputChangedCounter]);

  const addNewSupplier = () => {
    let newSuppliers = suppliers;
    newSuppliers.push({ id: uuidv4() });
    setSuppliers([...newSuppliers]);
  };

  const updateSuppliers = (supplierId, newSupplier) => {
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === supplierId ? { id: supplierId, ...newSupplier } : supplier
    );
    setSuppliers(updatedSuppliers);
  };

  const removeSupplier = (supplierId) => {
    const updatedSuppliers = suppliers.filter(
      (supplier) => supplier.id !== supplierId
    );
    setSuppliers(updatedSuppliers);
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
      suppliers: suppliers,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      productDataFormik.values.suppliers = suppliers;
      createProduct(productDataFormik.values);
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
            className="font-bold text-light col-span-2"
          >
            Datos producto
          </Typography>
          <div className="py-2 col-span-2">
            <Textarea
              label="Descripción"
              name="description"
              value={productDataFormik.values.description}
              onChange={(e) => {
                productDataFormik.handleChange(e);
                setInputChangedCounter(inputChangedCounter + 1);
              }}
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
              onChange={(e) => {
                productDataFormik.handleChange(e);
                setInputChangedCounter(inputChangedCounter + 1);
              }}
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
              onChange={(e) => {
                productDataFormik.handleChange(e);
                setInputChangedCounter(inputChangedCounter + 1);
              }}
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
                setInputChangedCounter(inputChangedCounter + 1);
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
                  setInputChangedCounter(inputChangedCounter + 1);
                }}
              >
                <Option
                  value={"each"}
                  onClick={() => {
                    productDataFormik.values.priceForQuantity = "1";
                  }}
                >
                  Unidad
                </Option>
                <Option
                  value={"packOf"}
                  onClick={() => {
                    productDataFormik.values.priceForQuantity = "";
                  }}
                >
                  Paquete de
                </Option>
                <Option
                  value={"spoolOf"}
                  onClick={() => {
                    productDataFormik.values.priceForQuantity = "";
                  }}
                >
                  Carrete de
                </Option>
              </Select>
              {productDataFormik.values.priceFor === "packOf" ? (
                <div className="mx-2 flex">
                  <Input
                    type="text"
                    name="priceForQuantity"
                    variant="standard"
                    color="white"
                    label="ingrese una cantidad"
                    labelProps={{ className: "text-light opacity-50" }}
                    value={productDataFormik.values.priceForQuantity}
                    onChange={(e) => {
                      handleInputChange(e);
                      setInputChangedCounter(inputChangedCounter + 1);
                    }}
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
                    onChange={(e) => {
                      handleInputChange(e);
                      setInputChangedCounter(inputChangedCounter + 1);
                    }}
                    onBlur={productDataFormik.handleBlur}
                  />
                  <div className="rounded-md rounded-l-none pl-1 mt-auto">
                    <Typography variant="small" className="text-light">
                      metros.
                    </Typography>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {productDataFormik.errors.priceFor ||
            productDataFormik.errors.priceForQuantity ? (
              <Alert className="block mt-[10px] bg-red-500 !w-auto animate-pulse">
                <div className="flex flex-row items-center">
                  {productDataFormik.errors.priceFor ||
                    productDataFormik.errors.priceForQuantity}
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
          <Typography variant="lead" className="font-bold text-light pb-5">
            Proveedores
          </Typography>
          <div className="flex flex-col">
            {suppliers?.map((supplier, index) => {
              return (
                <NewSupplierRow
                  key={supplier.id}
                  onSupplierRemove={() => {
                    removeSupplier(supplier.id);
                  }}
                  onSupplierUpdate={(newSupplierData) => {
                    updateSuppliers(supplier.id, newSupplierData);
                  }}
                />
              );
            })}
            <Button
              className="bg-two flex items-center gap-3 w-[150px] my-2"
              onClick={() => {
                addNewSupplier();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Añadir
            </Button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2 border-dark2 border-t-2 bg-dark3">
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={(e) => productDataFormik.handleSubmit(e)}
          disabled={hasErrors}
        >
          <span>Crear</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function NewSupplierRow({ onSupplierRemove, onSupplierUpdate }) {
  const [prices, setPrices] = useState([]);
  const [stock, setStock] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [supplierRowHaveErrors, setSupplierRowHaveErrors] = useState(true);
  const [rowsHaveErrors, setRowsHaveErrors] = useState([]);
  const [inputsEditedCounter, setInputsEditedCounter] = useState(0);
  const [counter, setCounter] = useState(0);
  const [inputEdited, setInputEdited] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const supplierValidationSchema = Yup.object().shape({
    supplier: Yup.string()
      .min(1, "Se requiere al menos un caractere")
      .max(50, "Se requiere a a lo mas 50 caracteres")
      .required("El nombre es obligatorio"),
    supplierPartNo: Yup.string()
      .min(1, "Se requiere al menos un caracter")
      .max(50, "Se requiere a lo mas 50 caracteres")
      .required("El n° parte es obligatorio"),
    productUrl: Yup.string()
      .required("La URL es obligatoria")
      .url("Debe ser un una URL válida"),
  });

  const formik = useFormik({
    initialValues: {
      supplier: "",
      productUrl: "",
      supplierPartNo: "",
      prices: prices,
      stock: stock,
      extraData: extraData,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: supplierValidationSchema,
    onSubmit: () => {
      formik.values.prices = prices;
      formik.values.stock = stock;
      formik.values.extraData = extraData;
      onSupplierUpdate(formik.values);
    },
  });

  useEffect(() => {
    addPrices();
    addStock();
    addExtraData();
    let newRowsHaveErrors = rowsHaveErrors;
    newRowsHaveErrors.push({ id: "supplier", errors: true });
    newRowsHaveErrors.push({ id: "supplierPartNo", errors: true });
    newRowsHaveErrors.push({ id: "productUrl", errors: true });
    setRowsHaveErrors(newRowsHaveErrors);
  }, []);

  useEffect(() => {
    let hasErrors = false;
    rowsHaveErrors.forEach((row) => {
      if (row.errors === true) {
        hasErrors = true;
      }
    });
    setSupplierRowHaveErrors(hasErrors);
  }, [rowsHaveErrors]);

  useEffect(() => {
    handleValidationChange(
      inputEdited,
      formik.errors[inputEdited] ? true : false
    );
  }, [counter]);

  useEffect(() => {
    setCounter(counter + 1);
  }, [inputsEditedCounter]);

  const handleValidationChange = (rowId, hasErrors) => {
    const updatedRowsHaveErrors = rowsHaveErrors.map((row) =>
      row.id === rowId ? { id: rowId, errors: hasErrors } : row
    );
    setRowsHaveErrors(updatedRowsHaveErrors);
  };

  const addPrices = () => {
    let newPrices = prices;
    let id = uuidv4();
    newPrices.push({ id: id, quantity: "", price: "" });
    setPrices([...newPrices]);
    //se crea en arreglo de verificacion de errores
    let newRowsHaveErrors = rowsHaveErrors;
    newRowsHaveErrors.push({ id: id, errors: true });
    setRowsHaveErrors([...newRowsHaveErrors]);
  };

  const onUpdatePrice = (priceId, newPrice) => {
    const updatedPrices = prices.map((price) =>
      price.id === priceId ? { id: priceId, ...newPrice } : price
    );
    setPrices(updatedPrices);
  };

  const onPriceRowRemove = (priceId) => {
    const updatedPrices = prices.filter((price) => price.id !== priceId);
    const updatedRowsHaveErrors = rowsHaveErrors.filter(
      (row) => row.id !== priceId
    );
    setPrices(updatedPrices);
    setRowsHaveErrors(updatedRowsHaveErrors);
  };

  const addStock = () => {
    let newStock = stock;
    let id = uuidv4();
    newStock.push({ id: id, country: "", stock: "" });
    setStock([...newStock]);
    //se crea en arreglo de verificacion de errores
    let newRowsHaveErrors = rowsHaveErrors;
    newRowsHaveErrors.push({ id: id, errors: true });
    setRowsHaveErrors([...newRowsHaveErrors]);
  };

  const onUpdateStock = (stockId, newStock) => {
    const updatedStock = stock.map((stock) =>
      stock.id === stockId ? { id: stockId, ...newStock } : stock
    );
    setStock(updatedStock);
  };

  const onStockRowRemove = (stockId) => {
    const updatedStock = stock.filter((stock) => stock.id !== stockId);
    const updatedRowsHaveErrors = rowsHaveErrors.filter(
      (row) => row.id !== stockId
    );
    setRowsHaveErrors(updatedRowsHaveErrors);
    setStock(updatedStock);
  };

  const addExtraData = () => {
    let newExtraData = extraData;
    let id = uuidv4();
    newExtraData.push({ id: id });
    setExtraData([...newExtraData]);
    //se crea en arreglo de verificacion de errores
    let newRowsHaveErrors = rowsHaveErrors;
    newRowsHaveErrors.push({ id: id, errors: true });
    setRowsHaveErrors([...newRowsHaveErrors]);
  };

  const onUpdateExtraData = (dataId, newData) => {
    const updatedExtraData = extraData.map((data) =>
      data.id === dataId ? { id: dataId, ...newData } : data
    );
    setExtraData(updatedExtraData);
  };

  const onExtraDataRowRemove = (dataId) => {
    const updatedExtraData = extraData.filter((data) => data.id !== dataId);
    const updatedRowsHaveErrors = rowsHaveErrors.filter(
      (row) => row.id !== dataId
    );
    setRowsHaveErrors(updatedRowsHaveErrors);
    setExtraData(updatedExtraData);
  };

  return (
    <>
      <div className="flex bg-one rounded-md p-4 my-2 overflow-auto">
        {isEditing ? (
          <>
            <div className="grid grid-cols-3 gap-4 w-full">
              <div>
                <Input
                  type="text"
                  name="supplier"
                  color="white"
                  variant="standard"
                  label="Nombre proveedor"
                  labelProps={{ className: "text-light opacity-50" }}
                  value={formik.values.supplier}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setInputEdited("supplier");
                    setInputsEditedCounter(inputsEditedCounter + 1);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.supplier}
                />
                {formik.errors.supplier && (
                  <Alert className="block mt-1 bg-red-500 z-50">
                    {formik.errors.supplier}
                  </Alert>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="supplierPartNo"
                  color="white"
                  variant="standard"
                  label="N° parte proveedor"
                  labelProps={{ className: "text-light opacity-50" }}
                  value={formik.values.supplierPartNo}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setInputEdited("supplierPartNo");
                    setInputsEditedCounter(inputsEditedCounter + 1);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.supplierPartNo}
                />
                {formik.errors.supplierPartNo && (
                  <Alert className="block mt-1 bg-red-500 z-50">
                    {formik.errors.supplierPartNo}
                  </Alert>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="productUrl"
                  color="white"
                  variant="standard"
                  label="Enlace producto"
                  labelProps={{ className: "text-light opacity-50" }}
                  value={formik.values.productUrl}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setInputEdited("productUrl");
                    setInputsEditedCounter(inputsEditedCounter + 1);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.productUrl}
                />
                {formik.errors.productUrl && (
                  <Alert className="block mt-1 bg-red-500 z-50">
                    {formik.errors.productUrl}
                  </Alert>
                )}
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="text-light">
                  Ingresar precios por cantidad
                </Typography>
                {prices?.map((price, index) => {
                  return (
                    <PricesRow
                      quantity={price.quantity}
                      price={price.price}
                      key={price.id}
                      onPriceRowRemove={() => onPriceRowRemove(price.id)}
                      onUpdatePrice={(newPrice) =>
                        onUpdatePrice(price.id, newPrice)
                      }
                      onValidationChange={(hasErrors) => {
                        handleValidationChange(price.id, hasErrors);
                      }}
                    />
                  );
                })}
                {prices.length == 0 && (
                  <Alert className="block bg-red-500 max-w-xs z-50 mb-auto mt-2">
                    Debe ingresar al menos un precio por cantidad
                  </Alert>
                )}
                <div>
                  <Button
                    size="sm"
                    className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 mt-2"
                    onClick={() => {
                      addPrices();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="text-light">
                  Ingresar stock
                </Typography>
                {stock?.map((stock, index) => {
                  return (
                    <StockRow
                      country={stock.country}
                      stockNumber={stock.stockNumber}
                      key={stock.id}
                      onStockRowRemove={() => onStockRowRemove(stock.id)}
                      onUpdateStock={(newStock) =>
                        onUpdateStock(stock.id, newStock)
                      }
                      onValidationChange={(hasErrors) => {
                        handleValidationChange(stock.id, hasErrors);
                      }}
                    />
                  );
                })}
                {stock.length == 0 && (
                  <Alert className="block bg-red-500 max-w-xs z-50 mb-auto mt-2">
                    Debe ingresar al menos un dato de stock.
                  </Alert>
                )}
                <div>
                  <Button
                    size="sm"
                    className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 mt-2"
                    onClick={() => {
                      addStock();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="text-light">
                  Ingresar datos adicionales (opcional)
                </Typography>
                {extraData?.map((data, index) => {
                  return (
                    <ExtraDataRow
                      extraDataName={data.extraDataName}
                      extraDataValue={data.extraDataValue}
                      key={data.id}
                      onExtraDataRowRemove={() => onExtraDataRowRemove(data.id)}
                      onUpdateExtraData={(newData) =>
                        onUpdateExtraData(data.id, newData)
                      }
                      onValidationChange={(hasErrors) => {
                        handleValidationChange(data.id, hasErrors);
                      }}
                    />
                  );
                })}
                <div>
                  <Button
                    size="sm"
                    className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 mt-2"
                    onClick={() => {
                      addExtraData();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-auto ml-3  flex justify-between">
              <Button
                size="sm"
                color="green"
                className="rounded w-[32px] h-[32px] px-2 mx-1"
                disabled={
                  supplierRowHaveErrors ||
                  prices.length == 0 ||
                  stock.length == 0
                }
                onClick={(e) => {
                  formik.handleSubmit(e);
                  setIsEditing(false);
                }}
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </Button>
              <Button
                size="sm"
                color="red"
                className="rounded w-[32px] h-[32px] px-2 mx-1"
                onClick={onSupplierRemove}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col text-light">
                <Typography variant="paragraph">Nombre proveedor</Typography>
                <Typography variant="small" className="opacity-70 mt-1">
                  {formik.values.supplier}
                </Typography>
              </div>
              <div className="flex flex-col text-light">
                <Typography variant="paragraph">N° parte proveedor</Typography>
                <Typography variant="small" className="opacity-70 mt-1">
                  {formik.values.supplierPartNo}
                </Typography>
              </div>
              <div className="flex flex-col text-light">
                <Typography variant="paragraph">Link producto</Typography>
                <a href="formik.values.productUrl" className="hover:underline">
                  <Typography variant="small" className="opacity-70 mt-1">
                    {formik.values.productUrl}
                  </Typography>
                </a>
              </div>
              <div className="flex flex-col">
                <Typography variant="paragraph" className="text-light">
                  Precios por cantidad
                </Typography>
                {prices?.map((price, index) => {
                  return (
                    <div key={price.id} className="flex justify-between">
                      <div className="mr-1">
                        <Typography variant="small" className="text-light">
                          {price.quantity}+
                        </Typography>
                      </div>
                      <div className="ml-1">
                        <Typography
                          variant="small"
                          className="text-light opacity-70"
                        >
                          ${price.price}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <Typography variant="paragraph" className="text-light">
                  Stock
                </Typography>
                {stock?.map((stock, index) => {
                  return (
                    <div key={stock.id} className="flex justify-between">
                      <div className="mr-1">
                        <Typography variant="small" className="text-light">
                          {stock.country}
                        </Typography>
                      </div>
                      <div className="ml-1">
                        <Typography
                          variant="small"
                          className="text-light opacity-70"
                        >
                          {stock.stockNumber} unidades
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <Typography variant="paragraph" className="text-light">
                  Datos adicionales
                </Typography>
                {extraData?.map((data, index) => {
                  return (
                    <div key={data.id} className="flex justify-between">
                      <div className="mr-1">
                        <Typography variant="small" className="text-light">
                          {data.extraDataName}
                        </Typography>
                      </div>
                      <div className="ml-1">
                        <Typography
                          variant="small"
                          className="text-light opacity-70"
                        >
                          {data.extraDataValue}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="my-auto ml-3 flex justify-between">
              <Button
                size="sm"
                color="orange"
                className="rounded w-[32px] h-[32px] px-2 mx-1"
                onClick={() => {
                  setIsEditing(true);
                }}
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function PricesRow({
  price,
  quantity,
  onPriceRowRemove,
  onUpdatePrice,
  onValidationChange,
}) {
  const [isPriceHovered, setIsPriceHovered] = useState(false);
  const [isQuantityHovered, setIsQuantityHovered] = useState(false);
  const [inputsEditedCounter, setInputsEditedCounter] = useState(0);
  const [rowHasErrors, setRowHasErrors] = useState(true);
  const [counter, setCounter] = useState(0);

  const supplierValidationSchema = Yup.object().shape({
    quantity: Yup.number()
      .typeError("La cantidad debe ser un número")
      .required("La cantidad es obligatoria")
      .positive("La cantidad debe ser un número positivo")
      .integer("La cantidad debe ser un número entero"),
    price: Yup.number()
      .typeError("El precio debe ser un número")
      .required("El precio es obligatorio")
      .positive("El precio debe ser un número positivo"),
  });

  const priceRowFormik = useFormik({
    initialValues: {
      quantity: quantity,
      price: price,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: supplierValidationSchema,
    onSubmit: () => {
      onUpdatePrice(priceRowFormik.values);
    },
  });

  //si estado rowHasErrors cambia, ejecuta la funcion del componente padre para transmitir la informacion
  useEffect(() => {
    onValidationChange(rowHasErrors);
  }, [rowHasErrors]);

  //si el estado counter cambia, comprueba si hay errores en los campos
  useEffect(() => {
    setRowHasErrors(
      priceRowFormik.errors.price || priceRowFormik.errors.quantity
        ? true
        : false
    );
  }, [counter]);

  useEffect(() => {
    priceRowFormik.handleSubmit();
    setCounter(counter + 1);
  }, [inputsEditedCounter]);

  const handlePriceInputChange = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9.,]/g, "");
    priceRowFormik.setFieldValue("price", validatedValue);
    setInputsEditedCounter(inputsEditedCounter + 1);
  };

  const handleQuantityInputChange = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, "");
    priceRowFormik.setFieldValue("quantity", validatedValue);
    setInputsEditedCounter(inputsEditedCounter + 1);
  };

  return (
    <div className="flex my-2">
      <input
        type="text"
        name="quantity"
        placeholder="Cantidad"
        label="Cantidad"
        value={priceRowFormik.values.quantity}
        onChange={(e) => {
          handleQuantityInputChange(e);
          setInputsEditedCounter(inputsEditedCounter + 1);
        }}
        onMouseEnter={() => setIsQuantityHovered(true)}
        onMouseLeave={() => setIsQuantityHovered(false)}
        className={`mr-1 rounded-md px-1 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          priceRowFormik.errors.quantity
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      />
      {priceRowFormik.errors.quantity && isQuantityHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {priceRowFormik.errors.quantity}
        </Alert>
      )}
      <input
        type="text"
        name="price"
        placeholder="Precio"
        label="Precio"
        value={priceRowFormik.values.price}
        onChange={(e) => {
          handlePriceInputChange(e);
          setInputsEditedCounter(inputsEditedCounter + 1);
        }}
        onMouseEnter={() => setIsPriceHovered(true)}
        onMouseLeave={() => setIsPriceHovered(false)}
        className={`rounded-md px-1 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          priceRowFormik.errors.price
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      />
      {priceRowFormik.errors.price && isPriceHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {priceRowFormik.errors.price}
        </Alert>
      )}
      <Button
        size="sm"
        className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 my-auto ml-1"
        onClick={() => {
          onPriceRowRemove();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 mr-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}

function StockRow({
  country,
  stockNumber,
  onStockRowRemove,
  onUpdateStock,
  onValidationChange,
}) {
  const [isStockNumberHovered, setIsStockNumberHovered] = useState(false);
  const [isCountrySelectHovered, setIsCountrySelectHovered] = useState(false);
  const [inputsEditedCounter, setInputsEditedCounter] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [rowHasErrors, setRowHasErrors] = useState(true);
  const [counter, setCounter] = useState(0);

  const stockRowValidationSchema = Yup.object().shape({
    stockNumber: Yup.number()
      .typeError("La cantidad debe ser un número")
      .required("La cantidad de stock es obligatoria")
      .positive("La cantidad debe ser un número positivo")
      .integer("La cantidad debe ser un número entero"),
    country: Yup.string().required("El país es obligatorio"),
  });

  const stockRowFormik = useFormik({
    initialValues: {
      country: country,
      stockNumber: stockNumber,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: stockRowValidationSchema,
    onSubmit: () => {
      onUpdateStock(stockRowFormik.values);
    },
  });

  useEffect(() => {
    onValidationChange(rowHasErrors);
  }, [rowHasErrors]);

  useEffect(() => {
    setRowHasErrors(
      stockRowFormik.errors.country || stockRowFormik.errors.stockNumber
        ? true
        : false
    );
  }, [counter]);

  useEffect(() => {
    stockRowFormik.handleSubmit();
    setCounter(counter + 1);
  }, [inputsEditedCounter]);

  const handleStockNumberInputChange = (e) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, "");
    stockRowFormik.setFieldValue("stockNumber", validatedValue);
    setInputsEditedCounter(inputsEditedCounter + 1);
  };

  return (
    <div className="flex my-2">
      <select
        name="country"
        label="Seleccionar país"
        defaultValue={selectedOption}
        value={stockRowFormik.values.country}
        onMouseEnter={() => setIsCountrySelectHovered(true)}
        onMouseLeave={() => setIsCountrySelectHovered(false)}
        className={`mr-1 rounded-md px-2 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          stockRowFormik.errors.country
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
        onChange={(e) => {
          stockRowFormik.handleChange(e);
          setSelectedOption(e.target.value);
          setInputsEditedCounter(inputsEditedCounter + 1);
        }}
      >
        <option value="" disabled hidden className="text-light opacity-70">
          País
        </option>
        <option value={"us"} className=" text-light">
          Estados Unidos
        </option>
        <option value={"uk"} className=" text-light ">
          Reino Unido
        </option>
        <option value={"cl"} className=" text-light ">
          Chile
        </option>
      </select>
      {stockRowFormik.errors.country && isCountrySelectHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {stockRowFormik.errors.country}
        </Alert>
      )}
      <input
        type="text"
        name="stockNumber"
        placeholder="Stock"
        label="Stock"
        value={stockRowFormik.values.stockNumber}
        onChange={(e) => {
          handleStockNumberInputChange(e);
        }}
        onMouseEnter={() => setIsStockNumberHovered(true)}
        onMouseLeave={() => setIsStockNumberHovered(false)}
        className={`rounded-md px-2 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          stockRowFormik.errors.stockNumber
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      ></input>
      {stockRowFormik.errors.stockNumber && isStockNumberHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {stockRowFormik.errors.stockNumber}
        </Alert>
      )}
      <Button
        size="sm"
        className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 my-auto ml-1"
        onClick={() => {
          onStockRowRemove();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 mr-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}

function ExtraDataRow({
  extraDataName,
  extraDataValue,
  onExtraDataRowRemove,
  onUpdateExtraData,
  onValidationChange,
}) {
  const [isExtraDataValueHovered, setIsExtraDataValueHovered] = useState(false);
  const [isExtraDataNameHovered, setIsExtraDataNameHovered] = useState(false);
  const [inputsEditedCounter, setInputsEditedCounter] = useState(0);
  const [rowHasErrors, setRowHasErrors] = useState(true);
  const [counter, setCounter] = useState(0);

  const extraDataRowValidationSchema = Yup.object().shape({
    extraDataValue: Yup.string().required("El valor es obligatorio"),
    extraDataName: Yup.string().required("El nombre es obligatorio"),
  });

  const extraDataRowFormik = useFormik({
    initialValues: {
      extraDataName: extraDataName,
      extraDataValue: extraDataValue,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: extraDataRowValidationSchema,
    onSubmit: () => {
      onUpdateExtraData(extraDataRowFormik.values);
    },
  });

  useEffect(() => {
    onValidationChange(rowHasErrors);
  }, [rowHasErrors]);

  useEffect(() => {
    setRowHasErrors(
      extraDataRowFormik.errors.extraDataName ||
        extraDataRowFormik.errors.extraDataValue
        ? true
        : false
    );
  }, [counter]);

  useEffect(() => {
    extraDataRowFormik.handleSubmit();
    setCounter(counter + 1);
  }, [inputsEditedCounter]);

  return (
    <div className="flex my-2">
      <input
        type="text"
        name="extraDataName"
        placeholder="Nombre dato"
        label="NombreExtraData"
        value={extraDataRowFormik.values.extraDataName}
        onChange={(e) => {
          extraDataRowFormik.handleChange(e);
          setInputsEditedCounter(inputsEditedCounter + 1);
        }}
        onMouseEnter={() => setIsExtraDataNameHovered(true)}
        onMouseLeave={() => setIsExtraDataNameHovered(false)}
        className={`mr-1 rounded-md px-2 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          extraDataRowFormik.errors.extraDataName
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      />
      {extraDataRowFormik.errors.extraDataName && isExtraDataNameHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {extraDataRowFormik.errors.extraDataName}
        </Alert>
      )}
      <input
        type="text"
        name="extraDataValue"
        placeholder="Valor dato"
        label="ValorExtraData"
        value={extraDataRowFormik.values.extraDataValue}
        onChange={(e) => {
          extraDataRowFormik.handleChange(e);
          setInputsEditedCounter(inputsEditedCounter + 1);
        }}
        onMouseEnter={() => setIsExtraDataValueHovered(true)}
        onMouseLeave={() => setIsExtraDataValueHovered(false)}
        className={`rounded-md px-2 w-1/2 text-light bg-dark2 font-sans text-[14px] shadow-md border-2 ${
          extraDataRowFormik.errors.extraDataValue
            ? " border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      />
      {extraDataRowFormik.errors.extraDataValue && isExtraDataValueHovered && (
        <Alert className="absolute mt-[40px] bg-red-500 max-w-xs z-50">
          {extraDataRowFormik.errors.extraDataValue}
        </Alert>
      )}
      <Button
        size="sm"
        className="rounded bg-three shadow-none hover:bg-threeHover w-[32px] h-[32px] px-2 my-auto ml-1"
        onClick={() => {
          onExtraDataRowRemove();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 mr-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}
