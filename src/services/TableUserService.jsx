import axios from "axios";

export const userRegister = async (formValues) => {
  try {
    const response = await axios.post("/api/createUser", formValues);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get("/api/fetchUsers");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
