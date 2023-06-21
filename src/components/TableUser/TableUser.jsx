import DataTable from "react-data-table-component";
import React, { useState, Fragment, useEffect } from "react";
import UserDialog from "./UserDialog";
import { Button } from "@material-tailwind/react";

const data = [
  {
    id: 1,
    username: "Juanito Perez",
    privileges: "0",
  },
  {
    id: 2,
    username: "Admin 1",
    privileges: "1",
  },
];

export default function TableUser() {
  const [tableRender, setTableRender] = useState(1);
  const [newArr, setNewArr] = useState(data);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [action, setAction] = useState();

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
      cell: (param) => ActionMenu(param),
      allowOverflow: true,
      ignoreRowClick: true,
    },
  ];

  const handleOpenUserDialog = () => setOpenUserDialog(true);
  const handleCloseUserDialog = () => setOpenUserDialog(false);

  const handleAddUserDialog = () => {
    setEditData({}); // se setean los datos vacios
    setAction("add");
    handleOpenUserDialog(); //se abre el dialog vacio
  };

  const handleUserEditDialog = (param) => {
    setAction("edit");
    handleOpenUserDialog(); //se abre el dialog con los datos a editar
    setEditData(param); //se setean los datos a editar
  };

  const submitData = (newObj) => {
    var arr = newArr;
    if (action === "edit") {
      const index = newArr.findIndex((object) => {
        return object.id === newObj.id;
      });

      if (index !== -1) {
        arr[index] = newObj;
      }
      setNewArr(arr);
    } else {
      let getNewIndex = arr.length + 1;
      newObj.id = getNewIndex;
      arr.push(newObj);
      setNewArr(arr);
    }
    setTableRender((prevTableRender) => prevTableRender + 1);
    console.log(newArr);
    // Lógica para enviar los datos del formulario
    // Puedes hacer una llamada a una API aquí para enviar los datos del formulario
  };

  const handleDeleteAction = () => {};

  // inicio action menu
  const ActionMenu = (param) => {
    const [isOpenActionMenu, setOpenActionMenu] = useState(false);

    const handleMouseEnter = () => {
      setOpenActionMenu(true);
    };

    const handleMouseLeave = () => {
      setOpenActionMenu(false);
    };

    return (
      <Fragment>
        <button
          className="z-8 absolute rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-secondary focus:outline-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          ...
        </button>
        {isOpenActionMenu && (
          <div className="z-9 absolute rounded-md border border-gray-300 bg-white shadow-lg">
            <button
              className="relative px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white "
              onClick={() => handleUserEditDialog(param)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Editar
            </button>
            <button
              className="relative px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={() => handleDeleteAction()}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Eliminar
            </button>
          </div>
        )}
      </Fragment>
    );
  };

  // fin action menu

  return (
    <section className="h-screen bg-white px-10">
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
          submitData={submitData}
        />
      )}
      <DataTable
        key={tableRender}
        title="Panel de control de usuarios"
        columns={columns}
        data={newArr}
        selectableRows
        pagination
        highlightOnHover
      />
    </section>
  );
}
