import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import ArticleActionMenu from "./ArticleActionMenu";
import ArticleDetailDialog from "./ArticleDetailDialog";
import ArticleSuppliersDialog from "./ArticleSuppliersDialog";

import { Button, Spinner } from "@material-tailwind/react";
import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function TableArticle() {
  const [isLoading, setIsLoading] = useState(true); //permite saber si algo esta cargando
  const [tableRender, setTableRender] = useState(1); //permite renderizar nuevamente la tabla con cada cambio
  const [openArticleDialog, setOpenArticleDialog] = useState(false); //permite controlar la apertura del dialog
  const [editData, setEditData] = useState({}); //permite setear la data a editar
  const [action, setAction] = useState(); //permite controlar el menu de acciones de la tabla
  const [articleData, setArticleData] = useState([]); //permite guardar los datos de todos los articulos

  useEffect(() => {
    getArticlesCollection();
  }, []);

  const getArticlesCollection = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "prueba-articulos")); //recupera desde la coleccion "prueba-articulos"
    const newArticleData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setArticleData(newArticleData);
    setTableRender((prevTableRender) => prevTableRender + 1); //se renderiza nuevamente la tabla
    setIsLoading(false);
  };

  const addArticle = async (articleObject) => {
    await addDoc(collection(db, "prueba-articulos"), articleObject);
    getArticlesCollection();
  };

  const editArticle = async (newArticleData) => {
    const articleObject = doc(db, "prueba-articulos", newArticleData.id);
    await updateDoc(articleObject, {
      articleName: newArticleData.articleName,
      brand: newArticleData.brand,
      category: newArticleData.category,
      details: newArticleData.details,
    });
    getArticlesCollection();
  };

  //viene del action menu
  const deleteArticle = async (articleData) => {
    await deleteDoc(doc(db, "prueba-articulos", articleData.id));
    getArticlesCollection();
  };

  //para add y edit se ocupa esta unica funcion, debido a que comparten el mismo dialog.
  const handleSubmitData = (articleObject) => {
    if (action === "edit") {
      editArticle(articleObject);
    } else {
      if (action === "add") {
        addArticle(articleObject);
      }
    }
  };

  const handleOpenArticleDialog = () => setOpenArticleDialog(true);
  const handleCloseArticleDialog = () => setOpenArticleDialog(false);

  const handleAddArticleDialog = () => {
    setEditData({}); // se setean los datos vacios
    setAction("add");
    handleOpenArticleDialog(); //se abre el dialog vacio
  };

  //viene del action menu
  const handleArticleEditDialog = (articleData) => {
    setEditData(articleData); //se setean los datos a editar
    setAction("edit");
    handleOpenArticleDialog(); //se abre el dialog con los datos a editar
  };

  const columns = [
    {
      name: "Nombre articulo",
      selector: (row) => row.articleName,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Proveedores",
      cell: (articleData) => (
        <ArticleSuppliersDialog articleData={articleData} />
      ),
    },
    {
      name: "Acción",
      cell: (articleData) => (
        <ArticleActionMenu
          articleData={articleData}
          handleArticleEditDialog={handleArticleEditDialog}
          deleteArticle={deleteArticle}
        />
      ),
      allowOverflow: true,
      ignoreRowClick: true,
    },
  ];

  return (
    <section className="h-screen bg-white px-10">
      <div className="mx-auto max-w-7xl">
        <div className="py-10">
          <Button
            className="bg-secondary hover:bg-secondaryHover"
            onClick={handleAddArticleDialog}
          >
            Agregar artículo
          </Button>
        </div>
        {openArticleDialog && (
          <ArticleDetailDialog
            editData={editData}
            open={openArticleDialog}
            close={handleCloseArticleDialog}
            handleSubmitData={handleSubmitData}
          />
        )}
        {isLoading ? (
          <Spinner className="mx-auto mt-20 h-12 w-12" />
        ) : (
          <DataTable
            key={tableRender}
            title="Panel de control de artículos"
            columns={columns}
            data={articleData}
            pagination
            highlightOnHover
          />
        )}
      </div>
    </section>
  );
}
