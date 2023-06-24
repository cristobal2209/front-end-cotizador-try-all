import DataTable from "react-data-table-component";
import React, { useState, Fragment, useEffect } from "react";
import UserDialog from "./UserDialog";
import UserActionMenu from "./UserActionMenu";
import { Button, Spinner } from "@material-tailwind/react";
import {
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function TableUser() {
  const [isLoading, setIsLoading] = useState(true); //permite saber si algo esta cargando
  const [tableRender, setTableRender] = useState(1); //permite renderizar nuevamente la tabla con cada cambio
  const [openUserDialog, setOpenUserDialog] = useState(false); //permite controlar la apertura del dialog
  const [editData, setEditData] = useState({}); //permite setear la data a editar
  const [action, setAction] = useState(); //permite controlar el menu de acciones de la tabla
  const [userData, setUserData] = useState([]); //permite guardar los datos de todos los datos

  useEffect(() => {
    getUsersCollection();
  }, []);

  const getUsersCollection = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "prueba-usuarios"));
    const newUserData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserData(newUserData);
    setTableRender((prevTableRender) => prevTableRender + 1); //se renderiza nuevamente la tabla
    setIsLoading(false);
  };

  const handleAddUser = async (userObject) => {
    await addDoc(collection(db, "prueba-usuarios"), userObject);
    getUsersCollection();
  };

  const handleEditUser = async (newUserData) => {
    const userObj = doc(db, "prueba-usuarios", newUserData.id);
    await updateDoc(userObj, {
      username: newUserData.username,
      privileges: newUserData.privileges,
    });
    getUsersCollection();
  };

  const handleDeleteUser = async (userData) => {
    await deleteDoc(doc(db, "prueba-usuarios", userData.id));
    getUsersCollection();
  };

  //para add y edit se ocupa esta unica funcion, debido a que comparten el mismo dialog.
  //se pueden agregar mas funciones si el action menu necesita.
  const handleSubmitData = (userObj) => {
    if (action === "edit") {
      handleEditUser(userObj);
    } else {
      if (action === "add") {
        handleAddUser(userObj);
      }
    }
  };

  const handleOpenUserDialog = () => setOpenUserDialog(true);
  const handleCloseUserDialog = () => setOpenUserDialog(false);

  const handleAddUserDialog = () => {
    setEditData({}); // se setean los datos vacios
    setAction("add");
    handleOpenUserDialog(); //se abre el dialog vacio
  };

  const handleUserEditDialog = (userData) => {
    setEditData(userData); //se setean los datos a editar
    setAction("edit");
    handleOpenUserDialog(); //se abre el dialog con los datos a editar
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.privileges,
      sortable: true,
    },
    {
      name: "Accion",
      cell: (userData) => (
        <UserActionMenu
          userData={userData}
          handleUserEditDialog={handleUserEditDialog}
          handleDeleteUser={handleDeleteUser}
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
            onClick={handleAddUserDialog}
          >
            Agregar usuario
          </Button>
        </div>
        {openUserDialog && (
          <UserDialog
            editData={editData}
            open={openUserDialog}
            onClose={handleCloseUserDialog}
            handleSubmitData={handleSubmitData}
          />
        )}
        {isLoading ? (
          <Spinner className="mx-auto mt-20 h-12 w-12" />
        ) : (
          <DataTable
            key={tableRender}
            title="Panel de control de usuarios"
            columns={columns}
            data={userData}
            selectableRows
            pagination
            highlightOnHover
          />
        )}
      </div>
    </section>
  );
}
