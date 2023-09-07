import axios from "axios";
import { db } from "../firebaseConfig";
import { collection } from "firebase/firestore";

export const addNewUserData = async (userData) => {
  const newUserData = [];

  userData.map((data, index) => {});
};

export const userRegister = async (formValues) => {
  await axios
    .post("/api/createUser", formValues)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
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
