import axios from "axios";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const getUserDataToMerge = async (UUID) => {
  const data = await getDoc(doc(db, "userData", UUID));
  return data;
};

export const addNewUserData = async (userData) => {
  const newUserData = userData.map(async (data) => {
    const dataToMerge = await getUserDataToMerge(data.uid);
    const parsedDataToMerge = dataToMerge.data();
    return {
      uid: data.uid,
      disabled: data.disabled,
      displayName: data.displayName,
      email: data.email,
      ...parsedDataToMerge,
    };
  });
  const dataToReturn = await Promise.all(newUserData); //espera a que todas las promes se terminen
  return dataToReturn;
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
