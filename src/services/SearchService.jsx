import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import axios from "axios";
export const searchInput = async () => {

    try {
      const response = await axios.post("/api/searchQuery", 'hola mundo');
      return response.data;
    } catch (error) {
      throw new Error("No se pudo cambiar los privilegios.");
    }
  };