import { useEffect, useState, Fragment } from "react";

import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { db } from "../../firebaseConfig";

const initialValues = {
  id: "",
  name: "",
  price: "",
  link: "",
};

const RenderSingleArticleSupplier = ({ supplier }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(supplier);
  }, [supplier]);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleButtonClick = () => {
    setReadOnly(!readOnly);
  };
  return (
    <>
      <Input
        variant="standard"
        label="Nombre"
        name="id"
        value={formData.id}
        readOnly={readOnly}
        onChange={handleChange}
        containerProps={{ className: "px-2 my-2" }}
      />
      <Input
        variant="standard"
        label="Precio"
        name="precio"
        value={formData.precio}
        readOnly={readOnly}
        onChange={handleChange}
        containerProps={{ className: "px-2 my-2" }}
      />
      <Input
        variant="standard"
        label="Link"
        name="link"
        value={formData.link}
        readOnly={readOnly}
        onChange={handleChange}
        containerProps={{ className: "px-2 my-2" }}
      />
      {readOnly ? (
        <button className="my-3 bg-secondary px-3 text-white" onClick={handleButtonClick}>
          Editar
        </button>
      ) : (
        <button className="my-3 bg-primary px-3 text-white" onClick={handleButtonClick}>
          Aceptar
        </button>
      )}
    </>
  );
};

export default function ArticleSuppliersDialog({ articleData }) {
  const [supplierData, setSupplierData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getSuppliersCollection();
  }, []);

  const getSuppliersCollection = async () => {
    const querySnapshot = await getDocs(
      collection(db, "prueba-articulos", articleData.id, "suppliers")
    ); //recupera desde la coleccion "prueba-articulos, y segun el documento, recupera su coleccion de suppliers"
    const newSupplierData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSupplierData(newSupplierData);
    // setTableRender((prevTableRender) => prevTableRender + 1);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const renderArticleSuppliers = supplierData.map((supplier) => (
    <div className="flex flex-row" key={supplier.id}>
      <RenderSingleArticleSupplier supplier={supplier} />
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
          <Dialog open={open} handler={handleOpen} size={"lg"}>
            <DialogHeader>
              Proveedores de {articleData.articleName}
            </DialogHeader>
            <DialogBody divider>
              <div className="flex flex-col">{renderArticleSuppliers}</div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="outlined" color="red" onClick={handleOpen}>
                Cerrar
              </Button>
              <Button variant="gradient" color="green" onClick={handleOpen}>
                Guardar
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
      )}
    </>
  );
}
