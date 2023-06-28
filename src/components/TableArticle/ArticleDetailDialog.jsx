import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const initialValues = {
  brand: "",
  category: "",
  details: "",
  articleName: "",
};

export default function ArticleDetailDialog({
  editData,
  open,
  close,
  handleSubmitData,
}) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleCancel = () => {
    close();
  };

  //mientras se edita el input, va actualizando el el valor del dato
  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitData(formData);
    close();
  };

  return (
    <>
      <Dialog open={open}>
        {JSON.stringify(editData) === JSON.stringify({}) ? (
          <DialogHeader>Crear un articulo</DialogHeader>
        ) : (
          <DialogHeader>Editar un articulo</DialogHeader>
        )}
        <DialogBody divider>
          <form>
            <div className="flex flex-col">
              <div>
                <label>
                  Nombre del articulo:
                  <input
                    type="text"
                    name="articleName"
                    value={formData.articleName}
                    onChange={handleChange}
                    className="m-2 border px-2"
                  />
                </label>
              </div>
              <div>
                <label>
                  Marca:
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="m-2 border px-2"
                  />
                </label>
              </div>
              <div>
                <label>
                  Categoría:
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="m-2 border px-2"
                  />
                </label>
              </div>
              <div>
                <label>
                  Detalles:
                  <input
                    type="text"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="m-2 border px-2"
                  />
                </label>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-2"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            {JSON.stringify(editData) === JSON.stringify({}) ? (
              <span>Crear</span>
            ) : (
              <span>Actualizar</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
