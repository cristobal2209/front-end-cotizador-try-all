import axios from "axios";
// const getUserDataToMerge = async (UUID) => {
//   const data = await getDoc(doc(db, "userData", UUID));
//   return data;
// };

// export const addNewUserData = async (userData) => {
//   const newUserData = userData.map(async (data) => {
//     const dataToMerge = await getUserDataToMerge(data.uid);
//     const parsedDataToMerge = dataToMerge.data();
//     return {
//       uid: data.uid,
//       disabled: data.disabled,
//       displayName: data.displayName,
//       email: data.email,
//       ...parsedDataToMerge,
//     };
//   });
//   const dataToReturn = await Promise.all(newUserData); //espera a que todas las promes se terminen
//   return dataToReturn;
// };

export const createUser = async (formValues) => {
  formValues.displayName = formValues.firstname + " " + formValues.lastname;
  delete formValues.firstname;
  delete formValues.lastname;

  try {
    const response = await axios.post("/api/createUser", formValues);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.code === "auth/email-already-exists") {
        throw new Error("El correo ya está siendo ocupado por otra cuenta.");
      }
    } else {
      throw new Error("Ha ocurrido un error, por favor intente nuevamente.");
    }
  }
};

export const changeUserStatus = (isDisabled, UID) => {
  const dataToSend = { status: { disabled: isDisabled }, uid: UID };

  axios
    .patch("/api/changeUserStatus", dataToSend)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      throw new Error("Error al cambiar privilegios");
    });
};

export const fetchUserData = async () => {
  // await axios
  //   .get("/api/fetchUsers")
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     throw new Error(error);
  //   });
  try {
    const response = await axios.get("/api/fetchUsers");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
