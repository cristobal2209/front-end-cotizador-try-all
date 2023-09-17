import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createQuote = async (UUID, QuoteData) => {
  await addDoc(collection(db, "usersQuotes", UUID, "quotes"), QuoteData);
};
