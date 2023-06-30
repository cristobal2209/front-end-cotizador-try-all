import { useEffect, useState, Fragment } from "react";

import {
  doc,
  deleteDoc,
  collection,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { db } from "../../firebaseConfig";

const initialValues = {
  id: "",
  price: "",
  link: "",
  country: "",
};

const RenderNewSupplier = ({
  handleCreateSupplier,
  handleOpenCreateSupplier,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckButton = () => {
    handleCreateSupplier(formData);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <Input
          variant="outlined"
          label="Nombre"
          name="id"
          onChange={handleChange}
          containerProps={{
            className: `m-2`,
          }}
        />
        <Input
          variant="outlined"
          label="Precio"
          name="price"
          onChange={handleChange}
          containerProps={{
            className: `m-2`,
          }}
        />
        <Input
          variant="outlined"
          label="Pais"
          name="country"
          onChange={handleChange}
          containerProps={{
            className: `m-2`,
          }}
        />
        <Input
          variant="outlined"
          label="Link"
          name="link"
          onChange={handleChange}
          containerProps={{
            className: `m-2`,
          }}
        />
        <button
          className="my-3 ml-2 rounded-md bg-quaternary p-2 text-white"
          onClick={handleCheckButton}
        >
          <CheckIcon strokeWidth={2} className="h-5 w-5" />
        </button>
        <button
          className="my-3 ml-2 rounded-md bg-red-700 p-2 text-white"
          onClick={handleOpenCreateSupplier}
        >
          <XMarkIcon strokeWidth={2} className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

const RenderSingleArticleSupplier = ({
  supplier,
  handleSupplierUpdate,
  handleDeleteSupplier,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(supplier);
  }, [supplier]);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckButton = () => {
    handleSupplierUpdate(formData);
    handleButtonClick();
  };

  const handleButtonClick = () => {
    setReadOnly(!readOnly);
  };

  const handleDelete = () => {
    handleDeleteSupplier(supplier.id);
  };

  return (
    <>
      <Input
        variant="standard"
        label="Nombre"
        name="id"
        value={formData.id}
        labelProps={{
          className: "hidden",
        }}
        disabled={readOnly}
        onChange={handleChange}
        containerProps={{
          className: `px-2 py-2 ${readOnly ? "" : "bg-white"}`,
        }}
      />
      <Input
        variant="standard"
        label="Precio"
        name="price"
        value={formData.price}
        labelProps={{
          className: "hidden",
        }}
        disabled={readOnly}
        onChange={handleChange}
        containerProps={{
          className: `px-2 py-2 ${readOnly ? "" : "bg-white"}`,
        }}
      />
      <Input
        variant="standard"
        label="Pais"
        name="country"
        value={formData.country}
        labelProps={{
          className: "hidden",
        }}
        disabled={readOnly}
        onChange={handleChange}
        containerProps={{
          className: `px-2 py-2 ${readOnly ? "" : "bg-white"}`,
        }}
      />
      <Input
        variant="standard"
        label="Link"
        name="link"
        value={formData.link}
        labelProps={{
          className: "hidden",
        }}
        disabled={readOnly}
        onChange={handleChange}
        containerProps={{
          className: `px-2 py-2 ${readOnly ? "" : "bg-white"}`,
        }}
      />

      {readOnly ? (
        <div className="flex flex-row">
          <button
            className="my-3 ml-2 rounded-md bg-secondary p-2 text-white"
            onClick={handleButtonClick}
          >
            <PencilIcon strokeWidth={2} className="h-5 w-5" />
          </button>
          <button
            className="my-3 ml-2 rounded-md bg-red-700 p-2 text-white"
            onClick={handleDelete}
          >
            <TrashIcon strokeWidth={2} className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex flex-row">
          <button
            className="my-3 ml-2 rounded-md bg-quaternary p-2 text-white"
            onClick={handleCheckButton}
          >
            <CheckIcon strokeWidth={2} className="h-5 w-5" />
          </button>
          <button
            className="my-3 ml-2 rounded-md bg-red-500 p-2 text-white"
            onClick={handleButtonClick}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default function ArticleSuppliersDialog({ articleData }) {
  const [supplierRender, SetSupplierRender] = useState(1);
  const [supplierCollection, setSupplierCollection] = useState([]);
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getSuppliersCollection();
  }, []);

  const getSuppliersCollection = async () => {
    //recupera desde la coleccion "prueba-articulos, y segun el articulo, recupera su coleccion de proveedores"
    const querySnapshot = await getDocs(
      collection(db, "prueba-articulos", articleData.id, "suppliers")
    );

    const supplierCollection = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSupplierCollection(supplierCollection);
    SetSupplierRender((prevTableRender) => prevTableRender + 1);
  };

  const handleCreateSupplier = async (newSupplier) => {
    await setDoc(
      doc(db, "prueba-articulos", articleData.id, "suppliers", newSupplier.id),
      newSupplier
    );
    handleOpenCreateSupplier();
    getSuppliersCollection();
  };

  const handleSupplierUpdate = async (newSupplierData) => {
    const supplierData = doc(
      db,
      "prueba-articulos",
      articleData.id,
      "suppliers",
      newSupplierData.id
    );
    await updateDoc(supplierData, {
      id: newSupplierData.id,
      price: newSupplierData.price,
      country: newSupplierData.country,
      link: newSupplierData.link,
    });
    getSuppliersCollection();
  };

  const handleDeleteSupplier = async (supplierId) => {
    await deleteDoc(
      doc(db, "prueba-articulos", articleData.id, "suppliers", supplierId)
    );
    getSuppliersCollection();
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenCreateSupplier = () => {
    setOpenCreateSupplier(!openCreateSupplier);
  };

  //supplierCollection es un arreglo de objetos
  const renderArticleSuppliers = supplierCollection.map((supplier) => (
    <div className="flex flex-row items-center" key={supplier.id}>
      <RenderSingleArticleSupplier
        key={supplierRender}
        supplier={supplier}
        handleSupplierUpdate={handleSupplierUpdate}
        handleDeleteSupplier={handleDeleteSupplier}
      />
    </div>
  ));

  return (
    <>
      <button
        className="rounded-md bg-secondary p-3 text-white hover:bg-secondaryHover"
        onClick={handleOpen}
      >
        Ver
      </button>
      {open && (
        <Fragment>
          <Dialog open={open} handler={handleOpen} size={"xl"}>
            <DialogHeader>
              Proveedores de {articleData.articleName}
            </DialogHeader>
            <DialogBody divider className="bg-[#ECEFF1]">
              <div className="flex flex-col">
                <div className="flex flex-row px-2">
                  <div className="grow">Nombre proveedor</div>
                  <div className="grow">Precio</div>
                  <div className="grow">Pais</div>
                  <div className="grow">Link</div>
                </div>
                {renderArticleSuppliers}
                {openCreateSupplier && (
                  <RenderNewSupplier
                    handleCreateSupplier={handleCreateSupplier}
                    handleOpenCreateSupplier={handleOpenCreateSupplier}
                  />
                )}
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                variant="filled"
                color="blue"
                onClick={handleOpenCreateSupplier}
              >
                Agregar
              </Button>
              <Button variant="filled" color="red" onClick={handleOpen}>
                Cerrar
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
      )}
    </>
  );
}
