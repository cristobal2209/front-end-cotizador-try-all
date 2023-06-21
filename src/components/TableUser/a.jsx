import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";
import "./custom.scss";
import ListDialog from "./listDialog";

const jsonArr = [
  {
    id: 1,
    firstname: "John",
    lastname: "aaron",
    username: "Joa",
    email: "sample1@gmail.com",
  },
  {
    id: 2,
    firstname: "Michale",
    lastname: "finch",
    username: "Mick",
    email: "sample2@gmail.com",
  },
  {
    id: 3,
    firstname: "Cooper",
    lastname: "check",
    username: "coop",
    email: "sample3@gmail.com",
  },
  {
    id: 4,
    firstname: "Sachin",
    lastname: "techdulkar",
    username: "Sha",
    email: "sample4@gmail.com",
  },
  {
    id: 5,
    firstname: "Michale",
    lastname: "jordan",
    username: "jor",
    email: "sample5@gmail.com",
  },
];

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [newArr, setNewArr] = useState(jsonArr);
  const [editData, setEditData] = useState({});
  const [btnName, setBtnName] = useState("Add");
  // const [display, setDisplay] = useState(true);
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Selector",
      cell: (param) => addDropDown(param),
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Firstname",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  const handleClickOpen = () => {
    setBtnName("Add");
    setEditData({});
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleEdit = (data) => {
    console.log(data);

    setBtnName("Edit");
    setOpen(true);
    setEditData(data);
  };

  const addDropDown = (param) => {
    return (
      <>
        <Button variant="outlined" onClick={() => handleEdit(param)}>
          Edit
        </Button>
      </>
    );
  };
  const submitData = (newObj) => {
    var arr = newArr;
    if (btnName === "Edit") {
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
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        List count : {newArr.length}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add user
      </Button>
      <ListDialog
        buttonName={btnName}
        submitData={submitData}
        open={open}
        onClose={handleClose}
        editData={editData}
      />

      <Paper>
        <DataTable
          title="Customer Data"
          columns={columns}
          data={newArr}
          sortIcon={<SortIcon />}
          // pagination={true}
        />
      </Paper>
    </div>
  );
}
