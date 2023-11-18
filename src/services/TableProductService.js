import { db } from "../firebaseConfig";
import axios from "axios";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

export const countProducts = async (category) => {
  try {
    // const response = await axios.get("/api/countProducts", category);
    // return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNextProductsCollection = async (docRef) => {
  try {
    let data = [];
    const productsCollection = collection(db, "products");
    const queryOptions = docRef
      ? query(productsCollection, startAfter(docRef), limit(10))
      : query(productsCollection, limit(10));

    const documentSnapshots = await getDocs(queryOptions);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const firstVisible = documentSnapshots.docs[documentSnapshots.docs[0]];

    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return { data, firstVisible, lastVisible };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error);
  }
};
