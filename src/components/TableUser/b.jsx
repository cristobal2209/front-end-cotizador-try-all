import * as React from "react";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  count: 0,
  email: "",
  username: "",
  firstname: "",
  lastname: "",
};

export default function ListDialog(props) {
  const { open } = props;
  const [updateData, setUpdateData] = useState(initialValues);

  const handleClose = () => {
    props.onClose(false);
  };

  useEffect(() => {
    setUpdateData(props.editData);
  }, [props.editData]);

  const submitForm = (values) => {
    props.submitData(values);
    props.onClose(false);
  };

  return (
    <Dialog
      // style={{ content: EXAMPLE_ALERT_STYLE }}
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Add user detail</DialogTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <Formik
            initialValues={updateData}
            // validate={validate}
            validationSchema={UserDetailSchema}
            onSubmit={submitForm}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty,
              } = formik;
              return (
                <div className="container">
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <TextField
                        label="Username"
                        variant="outlined"
                        type="text"
                        name="username"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.username && touched.username
                            ? "input-error"
                            : null
                        }
                      />
                      {errors.username && touched.username && (
                        <span className="error">{errors.username}</span>
                      )}
                    </div>

                    <div className="form-row">
                      <TextField
                        label="First Name"
                        variant="outlined"
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.firstname && touched.firstname
                            ? "input-error"
                            : null
                        }
                      />
                      {errors.firstname && touched.firstname && (
                        <span className="error">{errors.firstname}</span>
                      )}
                    </div>

                    <div className="form-row">
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.lastname && touched.lastname
                            ? "input-error"
                            : null
                        }
                      />
                      {errors.lastname && touched.lastname && (
                        <span className="error">{errors.lastname}</span>
                      )}
                    </div>

                    <div className="form-row">
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email ? "input-error" : null
                        }
                      />
                      {errors.email && touched.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)}
                      variant="outlined"
                    >
                      {props.buttonName}
                    </button>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 10px 10px 0",
          }}
        >
          <div></div>
        </div>
      </div>
    </Dialog>
  );
}
