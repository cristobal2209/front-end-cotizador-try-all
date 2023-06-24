import DataTable from "react-data-table-component";
import React, { useState, Fragment, useEffect } from "react";
import ArticleActionMenu from "./ArticleActionMenu";
import ArticleDialog from "./ArticleDialog";

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

  const handleAddArticle = async (articleObject) => {
    await addDoc(collection(db, "prueba-articulos"), articleObject);
    getArticlesCollection();
  };

  const handleEditArticle = async (newArticleData) => {
    const articleObject = doc(db, "prueba-articulos", newArticleData.id);
    await updateDoc(articleObject, {
      articleName: newArticleData.articleName,
      supplier: newArticleData.supplier,
      brand: newArticleData.brand,
      category: newArticleData.category,
      details: newArticleData.details,
      link: newArticleData.link,
      price: newArticleData.price,
    });
    getArticlesCollection();
  };

  const handleDeleteArticle = async (articleData) => {
    await deleteDoc(doc(db, "prueba-articulos", articleData.id));
    getArticlesCollection();
  };

  //para add y edit se ocupa esta unica funcion, debido a que comparten el mismo dialog.
  //se pueden agregar mas funciones si el action menu necesita.
  const handleSubmitData = (articleObject) => {
    if (action === "edit") {
      handleEditArticle(articleObject);
    } else {
      if (action === "add") {
        handleAddArticle(articleObject);
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
      name: "Proveedor",
      selector: (row) => row.supplier,
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
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Acción",
      cell: (articleData) => (
        <ArticleActionMenu
          articleData={articleData}
          handleArticleEditDialog={handleArticleEditDialog}
          handleDeleteArticle={handleDeleteArticle}
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
          <ArticleDialog
            editData={editData}
            open={openArticleDialog}
            onClose={handleCloseArticleDialog}
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
