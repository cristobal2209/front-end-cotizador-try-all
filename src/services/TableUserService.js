import axios from "axios";

export const createUser = async (formValues) => {
  formValues.displayName = formValues.firstname + " " + formValues.lastname;
  delete formValues.firstname;
  delete formValues.lastname;

  try {
    const response = await axios.post("/api/createUser", formValues);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.code === "auth/email-already-exists") {
        throw new Error("El correo ya está siendo ocupado por otra cuenta.");
      }
    } else {
      throw new Error("No se ha podido crear un usuario.");
    }
  }
};

export const changeUserStatus = async (isDisabled, UID) => {
  const dataToSend = { status: { disabled: isDisabled }, uid: UID };

  try {
    const response = await axios.patch("/api/changeUserStatus", dataToSend);
    return response.data;
  } catch (error) {
    throw new Error("No se pudo cambiar los privilegios.");
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get("/api/getUsers");
    return response.data;
  } catch (error) {
    throw new Error("No se pudo recuperar los datos de usuarios.");
  }
};
