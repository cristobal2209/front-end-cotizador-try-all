import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createUserData = async (UUID, userData) => {
  await setDoc(doc(db, "userData", UUID), userData);
};
